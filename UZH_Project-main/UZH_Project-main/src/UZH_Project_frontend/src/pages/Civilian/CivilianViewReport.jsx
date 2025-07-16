import React from 'react'

// Description: This component is a placeholder for viewing a civilian report based on the report ID.
// It will be updated to fetch and display report details dynamically once the backend is integrated.
// Step 1: Uncomment the next line to import useParams from react-router-dom when ready
// import { useParams } from 'react-router-dom';



const CivilianViewReport = () => {
  // Step 2: Uncomment the next line to get the report id from the URL when dynamic routing is set up
  // const { id } = useParams();

  // Step 3: Replace this hardcoded report with logic to fetch the report by id from backend or state
  // Example:
  // const report = reports.find(r => r.id === Number(id));
  // Or fetch from API:
  // useEffect(() => {
  //   fetch(`/api/reports/${id}`)
  //     .then(res => res.json())
  //     .then(data => setReport(data));
  // }, [id]);

  // Hardcoded report details for demonstration
  const report = {
    id: 1,
    title: 'Lost Wallet',
    date: '2025-07-10',
    status: 'Pending',
    location: 'Main Street',
    description: 'Lost my wallet near the bus stop on Main Street. Black leather, contains ID and credit cards.',
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-orange-600">Report Details</h2>
      <div className="space-y-4">
        <div>
          <span className="font-semibold text-gray-700">Title:</span> {report.title}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Date:</span> {report.date}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Status:</span> <span className="text-orange-500 font-medium">{report.status}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Location:</span> {report.location}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Description:</span>
          <p className="mt-1 text-gray-600">{report.description}</p>
        </div>
      </div>
    </div>
  );
}

export default CivilianViewReport