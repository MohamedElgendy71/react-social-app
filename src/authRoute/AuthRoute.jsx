import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContextProvider'
import { Navigate } from 'react-router-dom'

export default function AuthRoute({children}) {

  let {token} =  useContext(AuthContext)
  

  if(token){
    return <Navigate to={"/"}/>
  }

  return (

    <>
    
    {children}
    
    

    </>
  )
  
}
