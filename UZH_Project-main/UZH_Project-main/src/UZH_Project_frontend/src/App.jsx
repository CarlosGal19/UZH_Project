import React from 'react'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import PublicLayout from './Layouts/PublicLayout'
import PoliceLayout from './Layouts/PoliceLayout.jsx'
import CivilianLayout from './Layouts/CivilianLayout.jsx'
import Notfound from './pages/Notfound.jsx'
import Homepage from './pages/Homepage.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import PoliceDashboard from './pages/Police/PoliceDashboard.jsx'
import CreateReport from './pages/Police/CreateReport.jsx'
import Dashboard from './pages/Civilian/Dashboard.jsx'
import CivilianViewReport from './pages/Civilian/CivilianViewReport.Jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* If no credentials */}
      <Route path='/' element={<PublicLayout />}>
        <Route index element={<Homepage />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Route>

      {/* For Police */}
      <Route path='/police' element={<PoliceLayout />}>
        <Route index element={<PoliceDashboard />} />
        <Route path='new' element={<CreateReport />} />
      </Route>

      {/* For Civilian */}
      <Route path='/civilian' element={<CivilianLayout />}>
        <Route index element={<Dashboard />} />
        <Route path='reports/:id' element={<CivilianViewReport />} />
      </Route>

      <Route path='*' element={<Notfound />} />
    </>
  )
)

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App