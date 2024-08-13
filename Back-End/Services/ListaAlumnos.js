const Alumnos = require("../models/Alumnos");

const ListaAlm = async (IdGrado) => {
  // Sacar info seguimiento
  let ListAlumnos = await Alumnos.findOne({ "grado": IdGrado });

  return {
    ListAlumnos
  };
}