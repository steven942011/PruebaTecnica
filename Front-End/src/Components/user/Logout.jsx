import React, { useEffect } from 'react'
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
  
  const {setAuth, setCounters}= useAuth();
  const navigate = useNavigate();

 useEffect(()=>{
  // vaciar el local storage 
  localStorage.clear();


  //setear  estados globales a vacio
   setAuth({});

 

  //Navigation (redireccion) al login
  navigate("/login");

 });



  
return (
  <h1>Cerrando sesion</h1>
)
}
