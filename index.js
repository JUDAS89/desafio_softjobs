import { app, pool } from './server.js'; // Importa la configuración de Express y el pool de la base de datos

// Define el puerto en el que se ejecutará el servidor
const port = process.env.PORT || 3000;

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor encendido en puerto ${port}`);
});