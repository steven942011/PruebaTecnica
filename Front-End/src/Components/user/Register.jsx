import React, { useState } from "react";
import { useForm } from "../../Hooks//useForm";
import { Global } from "../Helpers/Global";
import {  NavLink, useNavigate } from "react-router-dom";

export const Register = () => {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not_sended");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const saveUser = async (e) => {
    //evita que recargue la pantalla
    e.preventDefault();
    //Recoger datos del formulario
    let newUser = form;

    console.log(newUser);
    //guardar datos en el backend - envio de informacion a la api
    const request = await fetch(Global.url + "/crear-alumno", {
      method: "POST",
      cache: "no-cache",
      body: JSON.stringify(newUser),
      credentials: "same-origin",

      headers: {
        "content-type": "application/json",
      },
    });

    const data = await request.json();
    console.log(data);

    if (data.status == "success") {
      setSaved("saved");
      setMessage(data.message);

      setTimeout(()=>{
           //Navigation (redireccion) al login
              navigate("/login");
      },2000)

    } else {
      setMessage(data.message);
      setSaved("error");
    }
  };

  return (
    <>
      <header className="row">
        <h1 className="h1 text-center">Registro</h1>
      </header>

      <div className="container">
        <form className="form" onSubmit={saveUser}>
          <div className="form-group">
            <label htmlFor="name"> Nombre</label>
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={changed}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
            <input
              className="form-control"
              type="date"
              name="fechaNacimiento"
              onChange={changed}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nomPadre">Nombre de Padre</label>
            <input
              className="form-control"
              type="text"
              name="nomPadre"
              onChange={changed}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nomMadre">Nombre de Madre</label>
            <input
              className="form-control"
              type="text"
              name="nomMadre"
              onChange={changed}
            />
          </div>
          <div className="form-group">
            <label htmlFor="grado">Grado</label>
            <input
              className="form-control"
              type="text"
              name="grado"
              onChange={changed}
            />
          </div>
          <div className="form-group">
            <label htmlFor="seccion">Seccion</label>
            <input
              className="form-control"
              type="text"
              name="seccion"
              onChange={changed}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email"> Email </label>
            <input
              className="form-control"
              type="email"
              name="email"
              onChange={changed}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password"> Contraseña </label>
            <input
              className="form-control"
              type="password"
              name="password"
              onChange={changed}
            />
          </div>
          <NavLink to="/login" className="btn btn-primary">
            Login
          </NavLink>{" "}
          &nbsp;
          <input type="submit" value="Registrar" className="btn btn-success" />
        </form>
      </div>
    </>
  );
};
