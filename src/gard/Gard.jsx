import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContextProvider'
import { Navigate } from 'react-router-dom'

export default function Gard({children}) {

  let {token} = useContext(AuthContext)

  if(!token){
    return <Navigate to={"/Login"}/>
  }

  return (
    <>


    {children}
    
    
    </>
  )
}
