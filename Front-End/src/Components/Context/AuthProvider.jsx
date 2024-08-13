import React, { createContext, useEffect, useState } from "react";
import { Global } from "../Helpers/Global";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    authUser();
  }, []);

  const authUser = async () => {
    // sacar datos usuario identificado del localstorage
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    //comprobar si tengo el token y el user
    if (!token || !user) {
      setLoading(false);
      return false;
    }

    //Transformar los datos a un objeto de javascript

    const userObj = JSON.parse(user);
    const userId = userObj.id;

    const request = await fetch(Global.url + "/consulta-alumno/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application-json",
        authentication: token,
      },
    });

    const data = await request.json();

    console.log(data.alumno);

    //setear el estado de auth
    setAuth(data.alumno);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
