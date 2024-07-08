import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { pool } from '../server.js'

// Registro de usuarios
const registerUser = async (req, res) => {
  const { email, password, rol, lenguage } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *',
      [email, hashedPassword, rol, lenguage]
    )
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Login de usuario
const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) return res.status(400).json({ message: 'email o password invalidos' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'email o password invalidos' });

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get User
const getUser = async (req, res) => {
  const email = req.user.email;

  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { registerUser, loginUser, getUser }