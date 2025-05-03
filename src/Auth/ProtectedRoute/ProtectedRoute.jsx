import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { authContext } from '../../Contexts/AuthContext/AuthContextProvider'


export default function ProtectedRoute({children}) {  
  const {isLogedIn} = useContext(authContext) 
  return  isLogedIn ? children : <Navigate to={"/login"}/>
   
 
}
