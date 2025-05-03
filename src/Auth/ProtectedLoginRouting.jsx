import React, { useContext } from 'react'
import { authContext } from '../Contexts/AuthContext/AuthContextProvider'
import { Navigate } from 'react-router-dom'

export default function ProtectedLoginRouting({children}) {
    const {isLogedIn} = useContext(authContext)
  return  isLogedIn ? <Navigate to={"/"}/> : children    ;
 
}
