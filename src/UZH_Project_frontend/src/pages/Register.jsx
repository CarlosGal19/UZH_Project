import React, { useState } from 'react'

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    oasi: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Register form submitted', formData)
  }

  return (
    <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="firstName" className="block text-sm font-medium text-orange-300">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-orange-300 px-3 py-2 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="lastName" className="block text-sm font-medium text-orange-300">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-orange-300 px-3 py-2 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="address1" className="block text-sm font-medium text-orange-300 ">
              Address 1
            </label>
            <input
              type="text"
              name="address1"
              id="address1"
              required
              value={formData.address1}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-orange-300 px-3 py-2 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
          <div>
            <label htmlFor="address2" className="block text-sm font-medium text-orange-300">
              Address 2
            </label>
            <input
              type="text"
              name="address2"
              id="address2"
              value={formData.address2}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-orange-300 px-3 py-2 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
          <div>
            <label htmlFor="oasi" className="block text-sm font-medium text-orange-300">
              OASI Number
            </label>
            <input
              type="text"
              name="oasi"
              id="oasi"
              placeholder="756.xxxx.xxxx.xc"
              required
              value={formData.oasi}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-orange-300  px-3 py-2 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-orange-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-orange-300 px-3 py-2 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-orange-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-orange-200 px-3 py-2 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-orange-300">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-orange-300 px-3 py-2 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full mt-4 py-2 bg-yellow-500 hover:bg-orange-600 text-white font-semibold rounded"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register