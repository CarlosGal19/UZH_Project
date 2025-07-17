import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UZH_Project_nft } from '../../../../declarations/UZH_Project_nft';

const CivilianViewReport = () => {
  const params = useParams();
  const reportId = params.id;
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getReport() {
      try {
        setLoading(true);
        const response = await UZH_Project_nft.getReportDetails(Number(reportId));
        console.log('Report Data:', response);

        // Asumiendo que response es un array y tomamos el primer elemento
        if (response && response.length > 0) {
          setReport(response[0]);
        } else {
          setError('Report not found');
        }
      } catch (error) {
        console.log(error);
        setError('Error loading report');
      } finally {
        setLoading(false);
      }
    }

    if (reportId) {
      getReport();
    }
  }, [reportId]);

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending':
      case 'pendiente':
        return 'text-yellow-600';
      case 'completed':
      case 'completado':
        return 'text-green-600';
      case 'in progress':
      case 'en progreso':
        return 'text-blue-600';
      default:
        return 'text-orange-500';
    }
  };

  if (loading) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
          <span className="ml-2">Loading report...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <div className="text-red-600 text-center">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <div className="text-gray-600 text-center">
          <h2 className="text-xl font-bold mb-2">Report not found</h2>
          <p>Could not find report with ID: {reportId}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-orange-600">Report Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Información General */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">General Information</h3>

          <div>
            <span className="font-semibold text-gray-700">Report ID:</span>
            <span className="ml-2">{reportId}</span>
          </div>

          <div>
            <span className="font-semibold text-gray-700">Status:</span>
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Rejected
            </span>
          </div>

          <div>
            <span className="font-semibold text-gray-700">Crime Type:</span>
            <span className="ml-2 capitalize">{report.crimeType}</span>
          </div>

          <div>
            <span className="font-semibold text-gray-700">Subtype:</span>
            <span className="ml-2 capitalize">{report.subtype}</span>
          </div>

          <div>
            <span className="font-semibold text-gray-700">Time:</span>
            <span className="ml-2">{report.time}</span>
          </div>

          <div>
            <span className="font-semibold text-gray-700">Affected Legal Interest:</span>
            <span className="ml-2">{report.affectedLegalInterest}</span>
          </div>

          <div>
            <span className="font-semibold text-gray-700">Location:</span>
            <div className="mt-1 text-gray-600">
              <p>State: {report.state}</p>
              <p>Municipality: {report.municipality}</p>
            </div>
          </div>
        </div>

        {/* Información del Denunciante */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Complainant</h3>

          <div>
            <span className="font-semibold text-gray-700">Name:</span>
            <span className="ml-2">
              {report.complainant.firstName} {report.complainant.middleName} {report.complainant.lastName}
            </span>
          </div>

          <div>
            <span className="font-semibold text-gray-700">Email:</span>
            <span className="ml-2">{report.complainant.email}</span>
          </div>

          <div>
            <span className="font-semibold text-gray-700">Phone:</span>
            <span className="ml-2">{report.complainant.phone}</span>
          </div>

          <div>
            <span className="font-semibold text-gray-700">Address:</span>
            <div className="mt-1 text-gray-600">
              <p>{report.complainant.street} #{report.complainant.number}</p>
              <p>{report.complainant.neighborhood}</p>
              <p>{report.complainant.municipality}, {report.complainant.state}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Descripción */}
      <div className="mt-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Description</h3>
        <div className="bg-gray-50 p-4 rounded">
          <p className="text-gray-700">{report.description}</p>
        </div>
      </div>

      {/* Información de Acusados */}
      {report.accused && report.accused.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Accused</h3>
          {report.accused.map((accused, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded">
              <h4 className="font-semibold text-gray-700 mb-2">Accused #{index + 1}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="font-medium text-gray-600">Name:</span>
                  <span className="ml-2">
                    {accused.firstName?.[0]} {accused.middleName?.[0]} {accused.lastName?.[0]}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Phone:</span>
                  <span className="ml-2">{accused.phone?.[0]}</span>
                </div>
                <div className="md:col-span-2">
                  <span className="font-medium text-gray-600">Address:</span>
                  <div className="mt-1 text-gray-600">
                    <p>{accused.street?.[0]} #{accused.number?.[0]}</p>
                    <p>{accused.neighborhood?.[0]}</p>
                    <p>{accused.municipality?.[0]}, {accused.state?.[0]}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CivilianViewReport
