import React from 'react'
import { useNavigate } from 'react-router-dom'; // Add this import
import logo from "../assets/logo2.svg"

// When building credentials I assume there is going to be a role in the payload.
//If a role is involved simply change the pathname.includes with a check for the role. to display the correct navbar
//Or change the logic to use context or state management for better scalability. 
//Pick your poison.


const Navbar = () => {
  const navigate = useNavigate(); 
  const { pathname } = window.location
  const isPolice = pathname.includes('/police')
  const isCivilian = pathname.includes('/civilian')

  return (
    <nav className="bg-orange-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div onClick={() => navigate('/')} className="flex items-center cursor-pointer">
          <img src={logo} alt="logo" className="h-12 w-auto" />
        </div>
        <div className="flex space-x-6">
          {isPolice && (
            <>
              <button 
                onClick={() => navigate('/police')}
                className="text-orange-500 hover:text-orange-700 focus:text-orange-700 transition-colors">
                Dashboard
              </button>
              <button 
                onClick={() => navigate('/police/new')}
                className="text-orange-500 hover:text-orange-700 focus:text-orange-700 transition-colors">
                Create report
              </button>
            </>
          )}

          {isCivilian && (
            <>
              <button 
                onClick={() => navigate('/civilian')}
                className="text-orange-500 hover:text-orange-700 focus:text-orange-700 transition-colors">
                Dashboard
              </button>
            </>
          )}

          {!isPolice && !isCivilian && (
            <>
              <button 
                onClick={() => navigate('/')}
                className="text-orange-500 hover:text-orange-700 focus:text-orange-700 transition-colors">
                Home
              </button>
              <button 
                onClick={() => navigate('Login')}
                className="text-orange-500 hover:text-orange-700 focus:text-orange-700 transition-colors">
                Login
              </button>
              <button 
                onClick={() => navigate('Register')}
                className="text-orange-500 hover:text-orange-700 focus:text-orange-700 transition-colors">
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar