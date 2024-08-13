import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "../../Hooks/useForm";
import { Global } from "../Helpers/Global";
import { NavLink } from "react-router-dom";

export const Login = () => {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not_sended");
  const [message, setMessage] = useState("");

  //Contexto para autenticacion
  const { setAuth } = useAuth();

  const loginUser = async (e) => {
    e.preventDefault();
    let userToLogin = form;

    console.log(userToLogin);

    const request = await fetch(Global.url + "/login", {
      method: "POST",
      cache: "no-cache",
      body: JSON.stringify(userToLogin),
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await request.json();
    console.log(data);
    if (data.status == "success") {
      //persistir los datos en el navegador
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.alumno));

      setSaved("saved");

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      setSaved("error");
    }
  };

  //  console.log(form);
  return (
    <>
      <div>
        <form className="container" onSubmit={loginUser}>
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input
              className="form-control"
              type="email"
              name="email"
              onChange={changed}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña: </label>
            <input
              className="form-control"
              type="password"
              name="password"
              onChange={changed}
              required
            />
          </div>
          <input
            type="submit"
            value="Indentificate"
            className="btn btn-success"
          />
          &nbsp;
          <NavLink to="/registro" className="btn btn-primary">
            Registrate
          </NavLink>
        </form>
      </div>
    </>
  );
};
