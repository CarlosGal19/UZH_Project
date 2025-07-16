import React from 'react'
import { useNavigate } from 'react-router-dom'



const Log_in_card = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded shadow-md text-center">
      <h2 className="text-2xl font-bold text-orange-500 mb-4">Have an account?</h2>
      <p className="text-orange-500 mb-6">Proceed to log in</p>
      <button
        onClick={() => navigate('/login')}
        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
      >
        Log In
      </button>
    </div>
  )
}

export default Log_in_card