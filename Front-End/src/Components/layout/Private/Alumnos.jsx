import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { NavLink } from "react-router-dom";
import { Global } from "../../Helpers/Global";

export const Alumnos = () => {
  const [nombre, setNombre] = useState("");
  const [alumnos, setalumnos] = useState([]);

  const buscaralumnos = async () => {
    try {
      const response = await fetch(
        Global.url + `/consultar-alumno?idGrado=${nombre}`
      );
      if (!response.ok) {
        throw new Error("Error al obtener los alumnos");
      }
      const data = await response.json();
      setalumnos(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    setNombre(event.target.value);
  };

  const handleSearchClick = () => {
    buscaralumnos();
  };

  return (
    <div className="container">
      <h1 className="h2">Buscar alumnos</h1>
      <input
        className="form-control"
        type="text"
        value={nombre}
        onChange={handleInputChange}
        placeholder="Introduce un nombre"
      />
      <br />
      <button onClick={handleSearchClick}>Buscar</button> &nbsp;&nbsp;{" "}
      <NavLink to="/buscar-alumno/logout" className="btn btn-primary">
        Cerrar sesion
      </NavLink>
      <br />
      <br />
      <hr />
      <ul className="card">
        {alumnos.map((alumno, index) => (
          <li key={index}>{alumno.name}</li>
        ))}
      </ul>
    </div>
  );
};
