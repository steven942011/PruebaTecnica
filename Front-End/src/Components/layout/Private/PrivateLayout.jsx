import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../../Hooks/useAuth'

export const PrivateLayout = () => {

  const { auth,loading } = useAuth();
  if (loading) {
    return <h1>Cargando...</h1>
  } else {
    return (
      <>
    


        {/** Layout */}
        <section className='layout__content'>
          {auth._id ?
            <Outlet />

            :
            <Navigate to="/login" />
          }

        </section>
      
      </>

    );
  }

}
