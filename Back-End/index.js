//Importar dependencias
const connection = require("./database/Connection");
const express = require("express");
const cors = require("cors");

//Importando Modelo Alumnos

// crear servidor node
const app = express();
const port = 4700;

// conexion a bddd
connection();

//configurar cors
app.use(cors());

// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// convertir los datos del body a objeto js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
const AlumnoRoutes = require("./routes/Alumnos");

app.use("/", AlumnoRoutes);

app.listen(port, () => {
  console.log("Servidor de node corriendo en el puerto", port);
});
