import React from "react";
import { Login } from "../Components/user/Login";
import { Register } from "../Components/user/Register";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../Components/Context/AuthProvider";
import { Alumnos } from "../Components/layout/Private/Alumnos";
import { PublicLayout } from "../Components/layout/Public/PublicLayout";
import { PrivateLayout } from "../Components/layout/Private/PrivateLayout";
import { Logout } from "../Components/user/Logout";

export const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="registro" element={<Register />} />
          </Route>

          <Route path="/buscar-alumno" element={<PrivateLayout />}>
            <Route index element={<Alumnos />} />
            <Route path="buscar-alumno" element={<Alumnos />} />
            <Route path="logout" element={<Logout />} />
          </Route>
          <Route
            path="*"
            element={
              <>
                <p>
                  <h1>ERROR 404</h1>
                  <Link to="/">Volver al inicio</Link>
                </p>
              </>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
