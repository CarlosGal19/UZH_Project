import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  // Hardcoded report for demonstration
  const [reports] = useState([
    {
      id: 1,
      title: 'Lost Wallet',
      date: '2025-07-10',
      status: 'Pending',
      location: 'Main Street',
    },
    // Add more reports here if needed
  ]);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-orange-600">Civilian Dashboard</h2>
      {reports.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <span className="text-4xl mb-4">😕</span>
          <p className="text-lg text-gray-600 font-semibold">You have no reports.</p>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold mb-4">Your Reports</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded">
              <thead>
                <tr className="bg-orange-100">
                  <th className="py-2 px-4 border-b text-left">Title</th>   
                  <th className="py-2 px-4 border-b text-left">Date</th>
                  <th className="py-2 px-4 border-b text-left">Status</th>
                  <th className="py-2 px-4 border-b text-left">Location</th>
                  <th className="py-2 px-4 border-b text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-orange-50">
                    <td className="py-2 px-4 border-b">{report.title}</td>
                    <td className="py-2 px-4 border-b">{report.date}</td>
                    <td className="py-2 px-4 border-b">{report.status}</td>
                    <td className="py-2 px-4 border-b">{report.location}</td>
                    <td className="py-2 px-4 border-b">
                      <button className="text-orange-500 hover:underline"
                      onClick={() => navigate(`/civilian/reports/${report.id}`)}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;