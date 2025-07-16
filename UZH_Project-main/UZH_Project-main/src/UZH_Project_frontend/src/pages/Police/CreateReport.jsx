import React from 'react'

const CreateReport = () => {
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-orange-600">Create Police Report</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="title">Title</label>
          <input type="text" id="title" name="title" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" placeholder="Enter report title" />
        </div>
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="description">Description</label>
          <textarea id="description" name="description" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" rows="4" placeholder="Describe the incident"></textarea>
        </div>
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="date">Date</label>
          <input type="date" id="date" name="date" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
        </div>
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="location">Location</label>
          <input type="text" id="location" name="location" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" placeholder="Enter location" />
        </div>
        <button type="submit" className="w-full bg-orange-500 text-white font-semibold py-2 rounded hover:bg-orange-600 transition-colors">Submit Report</button>
      </form>
    </div>
  )
}

export default CreateReport