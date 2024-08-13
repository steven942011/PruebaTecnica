// se importa el modelo
const Alumnos = require("../models/Alumnos");
const ListaAlumnos = require("../Services/ListaAlumnos");
//Importar dependencias
const bcrypt = require("bcrypt");
const jwt = require("../Services/jwt");

const pruebaAlumno = (req, res) => {
  return res.status(200).json({ message: "Mi api esta funcionando" });
};

//Registro de Alumnos

const registrar = (req, res) => {
  let params = req.body;

  // Comprobar que llegan bien  los datos (+validacion)
  if (
    !params.name ||
    !params.email ||
    !params.password ||
    !params.fechaNacimiento
  ) {
    return res.status(400).json({
      status: "Not Found",
      message: "El servidor no pudo encontrar el contenido solicitado.",
    });
  }

  let Alumno_Save = new Alumnos(params);

  // control de alumnos duplicados
  Alumnos.find({
    $or: [{ email: Alumno_Save.email.toLowerCase() }],
  })
    .then(async (alumno) => {
      if (alumno && alumno.length >= 1) {
        return res
          .status(200)
          .send({ status: "success", message: "El Alumno ya existe" });
      }

      //Cifrar la contraseña
      const pwd = await bcrypt.hash(Alumno_Save.password, 10);

      Alumno_Save.password = pwd;

      //guardar alumno  en bd
      Alumno_Save.save()
        .then((alumnoStored) => {
          if (!alumnoStored)
            return res
              .status(500)
              .send({ status: "error", message: "Error al guardar" });
          if (alumnoStored) {
            // añadido
            alumnoStored.toObject();
            delete alumnoStored.password;

            //devovler el resultado
            return res.status(200).json({
              status: "success",
              message: "Se registro un nuevo Alumno",
              alumno: alumnoStored,
            });
          }
        })
        .catch((error) => {
          if (error)
            return res
              .status(500)
              .send({ status: "error", message: "Error al guardar" });
          console.log(error);
        });
    })
    .catch((error) => {
      if (error)
        return res
          .status(500)
          .json({ status: "error", message: "Error al validar Alumno" });

      console.log(error);
    });
};

const BuscarAlumno = async (req, res) => {
  // Recibir el parametro  del id del alumno por la url
  const id = req.params.id;
  //consulta para sacar los datos del alumno
  await Alumnos.findById(id)
    .select({ password: 0, role: 0 })
    .then(async (alumno) => {
      if (!alumno) {
        return res.status(404).send({
          status: "error",
          message: "El alumno no existe o hay un error",
        });
      }

      //devolver el resultado
      return res.status(200).send({
        status: "success",
        message: "Consulta exitosa...",
        alumno: alumno,
      });
    })
    .catch((error = {}));
};

const login = (req, res) => {
  //recoger parametros del body
  let params = req.body;

  if (!params.email || !params.password) {
    return res
      .status(404)
      .send({ status: "error", message: "faltan datos..." });
  }

  // buscar en la BD si existe
  Alumnos.findOne({ email: params.email })
    // .select({ "password": 0 })
    .then((alumno) => {
      if (!alumno)
        return res
          .status(404)
          .send({ status: "error", message: "No existe el usuario" });

      //comprobar contraseña
      const pwd = bcrypt.compareSync(
        params.password.toString(),
        alumno.password.toString()
      );

      if (!pwd) {
        return res
          .status(404)
          .send({ status: "error", message: "Contraseña incorrecta..." });
      }

      //conseguir token
      const token = jwt.createToken(alumno);

      //datos alumno
      return res.status(200).send({
        status: "success",
        menssage: "Sesion iniciada...",
        alumno: {
          id: alumno.id,
          name: alumno.name,
        },
        token,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const ListarPorGrado = async (req, res) => {
  try {
    const nombre = req.query.idGrado;

    //console.log(nombre);

    let alumnos;
    if (nombre) {
      const regex = new RegExp(nombre, "i"); // 'i' hace que la búsqueda sea insensible a mayúsculas/minúsculas
      alumnos = await Alumnos.find({ grado: regex });
    } else {
      usuarios = await Alumnos.find(); // Devuelve todos los alumnos si no hay nombre en la consulta
    }

    res.json(alumnos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  pruebaAlumno,
  registrar,
  BuscarAlumno,
  login,
  ListarPorGrado,
};
