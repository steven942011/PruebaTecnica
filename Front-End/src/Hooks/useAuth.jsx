import React, { useContext } from 'react'
import AuthContext from '../Components/Context/AuthProvider'

export const useAuth = () => {
  return useContext(AuthContext);
}
export default useAuth;