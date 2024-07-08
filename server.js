import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import pkg from 'pg'
const { Pool } = pkg
import { authRoutes } from './routes/auth.js'

// Variales de entorno
dotenv.config();

//const { Pool } = pg; // Extrae Pool del objeto pg
const app = express()
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Database coneccion 
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Routes
app.use('/auth', authRoutes)

app.listen(port, () => {
    console.log(`Servidor encendido en puerto ${port}`);
  });

export { app, pool };