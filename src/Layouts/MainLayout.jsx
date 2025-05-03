import React from 'react'
import NavbarComponent from '../component/Navbar/NavbarComponent'
import Footer from '../component/Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <>
    <NavbarComponent/>
    <div className="container">
    <Outlet/>
    </div>
    <Footer/>   
    </>
  )
}
