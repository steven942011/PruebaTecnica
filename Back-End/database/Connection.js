//mongodb+srv://miltongmpriv:TCJkfsDCkMw7vx9K@cluster0.lvriz.mongodb.net/ Conexion Mongo Atlas
const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://miltongmpriv:TCJkfsDCkMw7vx9K@cluster0.lvriz.mongodb.net/Alumnos"
    );
    console.log("Conectado correctamente a db: RegistroAlumnos");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connection;
