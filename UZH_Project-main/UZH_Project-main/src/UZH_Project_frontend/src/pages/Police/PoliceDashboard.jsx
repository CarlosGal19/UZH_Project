import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const PoliceDashboard = () => {
  // Dummy data for table rows
  const [reports, setReports] = useState([
    { id: 1, crimeType: 'Theft', status: 'Pending' },
    { id: 2, crimeType: 'Burglary', status: 'Signed' },
    { id: 3, crimeType: 'Assault', status: 'Closed' }
  ])

  const handleStatusChange = (id, newStatus) => {
    setReports(reports.map(report => report.id === id ? { ...report, status: newStatus } : report))
  }

  return (
    <div className="p-6 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-orange-500">Police Dashboard</h1>
        <Link to="/police/new">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded">
            New Report
          </button>
        </Link>
      </div>
      <p className="mb-6 text-gray-700">
        Welcome to the Police Dashboard. Here you can manage reports and view statistics.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Crime Type</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            // Map through reports to create table rows 
            {reports.map(report => (
              <tr key={report.id} className="text-center border-t">
                <td className="py-2 px-4 border">{report.id}</td>
                <td className="py-2 px-4 border">{report.crimeType}</td>
                <td className="py-2 px-4 border">{report.status}</td>
                <td className="py-2 px-4 border">
                  <select
                    value={report.status}
                    onChange={(e) => handleStatusChange(report.id, e.target.value)}
                    className="bg-white text-orange-500 border border-orange-500 rounded p-1 focus:outline-none"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Signed">Signed</option>
                    <option value="Closed">Closed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PoliceDashboard