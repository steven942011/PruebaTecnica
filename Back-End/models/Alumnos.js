const { Schema, model } = require("mongoose");

const AlumnoSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  fechaNacimiento: {
    type: Date,
  },
  nomPadre: String,
  nomMadre: String,
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
  },
  grado: String,
  seccion: String,
  fechaIngreso: {
    type: Date,
    default: Date.now,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Alumnos", AlumnoSchema, "alumnos");
