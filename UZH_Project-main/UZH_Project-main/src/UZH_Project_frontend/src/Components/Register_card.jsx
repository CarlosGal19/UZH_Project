import React from 'react'

import { useNavigate } from 'react-router-dom'

const Register_card = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-orange-500 p-6 rounded shadow-md text-center">
      <h2 className="text-2xl font-bold text-white mb-4">Don't have an account?</h2>
      <p className="text-white mb-6">Create a new account</p>
      <button
        onClick={() => navigate('/register')}
        className="bg-white hover:bg-gray-100 text-orange-500 font-semibold py-2 px-4 rounded"
      >
        Register
      </button>
    </div>
  )
}

export default Register_card
