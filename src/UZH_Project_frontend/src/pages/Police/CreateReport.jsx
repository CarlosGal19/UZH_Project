import { useState } from 'react';
import { UZH_Project_backend } from '../../../../declarations/UZH_Project_backend';

const initialReport = {
  complainant: {
    firstName: '',
    lastName: '',
    middleName: '',
    street: '',
    number: '',
    neighborhood: '',
    municipality: '',
    state: '',
    phone: '',
    email: ''
  },
  accused: {
    firstName: '',
    lastName: '',
    middleName: '',
    street: '',
    number: '',
    neighborhood: '',
    municipality: '',
    state: '',
    phone: ''
  },
  state: '',
  municipality: '',
  affectedLegalInterest: '',
  crimeType: '',
  subtype: '',
  time: '',
  description: ''
};

const CreateReport = () => {
  const [report, setReport] = useState(initialReport);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');

    if (keys.length === 1) {
      setReport({ ...report, [name]: value });
    } else {
      const [section, field] = keys;
      setReport({
        ...report,
        [section]: {
          ...report[section],
          [field]: value
        }
      });
    }
  };

  const toOpt = (value) => {
    const trimmed = value.trim();
    return trimmed === '' ? [] : [trimmed];
  };

  const normalizeAccused = (accused) => {
    const isEmpty = Object.values(accused).every(val => val.trim() === '');
    if (isEmpty) return [];

    const transformed = {};
    for (const key in accused) {
      transformed[key] = toOpt(accused[key]);
    }
    return [transformed];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const transformedReport = {
        ...report,
        accused: normalizeAccused(report.accused)
      };
      const result = await UZH_Project_backend.addNft(transformedReport);
      console.log(result);
      alert("Reporte enviado correctamente!");

      // Reiniciar formulario
      setReport(initialReport);
    } catch (error) {
      console.error("Error al enviar reporte:", error);
    }
  };

  const renderInput = (label, name, type = "text", value) => (
    <div>
      <label className="block text-gray-700 mb-1" htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        className="input"
      />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-orange-600">Create Police Report</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Complainant Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {renderInput("First Name", "complainant.firstName", "text", report.complainant.firstName)}
          {renderInput("Last Name", "complainant.lastName", "text", report.complainant.lastName)}
          {renderInput("Middle Name", "complainant.middleName", "text", report.complainant.middleName)}
          {renderInput("Street", "complainant.street", "text", report.complainant.street)}
          {renderInput("Number", "complainant.number", "text", report.complainant.number)}
          {renderInput("Neighborhood", "complainant.neighborhood", "text", report.complainant.neighborhood)}
          {renderInput("Municipality", "complainant.municipality", "text", report.complainant.municipality)}
          {renderInput("State", "complainant.state", "text", report.complainant.state)}
          {renderInput("Phone", "complainant.phone", "text", report.complainant.phone)}
          {renderInput("Email", "complainant.email", "email", report.complainant.email)}
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">Accused Information (Optional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {renderInput("First Name", "accused.firstName", "text", report.accused.firstName)}
          {renderInput("Last Name", "accused.lastName", "text", report.accused.lastName)}
          {renderInput("Middle Name", "accused.middleName", "text", report.accused.middleName)}
          {renderInput("Street", "accused.street", "text", report.accused.street)}
          {renderInput("Number", "accused.number", "text", report.accused.number)}
          {renderInput("Neighborhood", "accused.neighborhood", "text", report.accused.neighborhood)}
          {renderInput("Municipality", "accused.municipality", "text", report.accused.municipality)}
          {renderInput("State", "accused.state", "text", report.accused.state)}
          {renderInput("Phone", "accused.phone", "text", report.accused.phone)}
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">Report Details</h3>
        <div className="space-y-4">
          {renderInput("State", "state", "text", report.state)}
          {renderInput("Municipality", "municipality", "text", report.municipality)}
          {renderInput("Affected Legal Interest", "affectedLegalInterest", "text", report.affectedLegalInterest)}
          {renderInput("Crime Type", "crimeType", "text", report.crimeType)}
          {renderInput("Subtype", "subtype", "text", report.subtype)}
          {renderInput("Time", "time", "time", report.time)}

          <div>
            <label className="block text-gray-700 mb-1" htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={report.description}
              onChange={handleChange}
              placeholder="Describe the incident"
              rows="4"
              className="input w-full"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white font-semibold py-2 rounded hover:bg-orange-600 transition-colors mt-6"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default CreateReport;
