import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UZH_Project_backend } from '../../../../declarations/UZH_Project_backend'

const PoliceDashboard = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleStatusChange = async (tokenId, newStatus) => {
    try {
      // Update status in backend
      const result = await UZH_Project_backend.updateStatus(tokenId, newStatus);

      if (result.ok) {
        // Update local state
        setReports(reports.map(report =>
          report.tokenId === tokenId ? { ...report, status: newStatus } : report
        ))
      } else {
        console.error('Error updating status:', result.err);
        setError('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      setError('Failed to update status');
    }
  }

  useEffect(() => {
    async function getTokens() {
      try {
        setLoading(true)
        const result = await UZH_Project_backend.getAllTokens();
        console.log('Raw result:', result);

        // Transform the data to show only relevant information
        const transformedReports = result.map(nftData => ({
          tokenId: nftData.tokenId,
          crimeType: nftData.report.crimeType,
          subtype: nftData.report.subtype,
          municipality: nftData.report.municipality,
          state: nftData.report.state,
          status: nftData.status || 'Pending', // Default to 'Pending' if no status
          complainantName: `${nftData.report.complainant.firstName} ${nftData.report.complainant.lastName}`,
          createdAt: new Date(Number(nftData.createdAt) / 1000000).toLocaleDateString(), // Convert nanoseconds to date
          reportHash: nftData.reportHash
        }));

        setReports(transformedReports);
        setError(null);
      } catch (error) {
        console.error('Error fetching tokens:', error);
        setError('Failed to load reports');
      } finally {
        setLoading(false);
      }
    }

    getTokens();
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-white">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading reports...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">Error: {error}</div>
        </div>
      </div>
    );
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
              <th className="py-2 px-4 border">Token ID</th>
              <th className="py-2 px-4 border">Crime Type</th>
              <th className="py-2 px-4 border">Subtype</th>
              <th className="py-2 px-4 border">Location</th>
              <th className="py-2 px-4 border">Complainant</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-4 px-4 text-center text-gray-500">
                  No reports found
                </td>
              </tr>
            ) : (
              reports.map((report, index) => (
                <tr key={report.tokenId} className="text-center border-t hover:bg-gray-50">
                  <td className="py-2 px-4 border font-mono text-sm">{report.tokenId ? report.tokenId : index + 1}</td>
                  <td className="py-2 px-4 border">{report.crimeType}</td>
                  <td className="py-2 px-4 border">{report.subtype}</td>
                  <td className="py-2 px-4 border">
                    {report.municipality}, {report.state}
                  </td>
                  <td className="py-2 px-4 border">{report.complainantName}</td>
                  <td className="py-2 px-4 border">{report.createdAt}</td>
                  <td className="py-2 px-4 border">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      report.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      report.status === 'Signed' ? 'bg-blue-100 text-blue-800' :
                      report.status === 'Closed' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border">
                    <select
                      value={report.status}
                      onChange={(e) => handleStatusChange(report.tokenId, e.target.value)}
                      className="bg-white text-orange-500 border border-orange-500 rounded p-1 focus:outline-none focus:ring-2 focus:ring-orange-300"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Signed">Signed</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {reports.length > 0 && (
        <div className="mt-4 text-sm text-gray-600">
          Total reports: {reports.length}
        </div>
      )}
    </div>
  )
}

export default PoliceDashboard
