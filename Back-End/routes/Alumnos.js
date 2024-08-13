const express = require("express");

const router = express.Router();
const AlumnoController = require("../controller/Alumnos");
const middlewareAuthentication = require("../middlewares/auth");

//Definiendo las rutas

router.get(
  "/pruebaAlumno",
  middlewareAuthentication.auth,
  AlumnoController.pruebaAlumno
);
router.post(
  "/crear-alumno",
  AlumnoController.registrar
);
router.get(
  "/consulta-alumno/:id?",
  middlewareAuthentication.auth,
  AlumnoController.BuscarAlumno
);
router.post("/login/", AlumnoController.login);
router.get("/consultar-alumno/:idGrado?", AlumnoController.ListarPorGrado);
module.exports = router;
