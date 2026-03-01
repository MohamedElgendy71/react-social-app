import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import NavBar from '../Navbar/Navbar'

export default function () {
  return (
    <div>
    <NavBar/>
    <div className='bg-slate-200 pt-5 min-h-screen '>
 
    <Outlet/>

    </div>
    </div>
  )
}
