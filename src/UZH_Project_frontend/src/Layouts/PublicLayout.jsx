import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar.jsx'
import Footer from '../Components/Footer.jsx'

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
    <main className="flex-grow bg-slate-50">
      <Outlet />
    </main>
      <Footer />
    </div>
  )
}

export default PublicLayout