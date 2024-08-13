import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

export const PublicLayout = () => {
  const { auth } = useAuth();
  return (
    <>
      <h1>Prueba técnica de Java Script</h1>

      <section className="container">
        {!auth._id ? <Outlet /> : <Navigate to="/buscar-alumno" />}
      </section>
    </>
  );
};
