import React from 'react';
import Image from 'next/image';

function TRCActivityHistory({ onBack }) {
  // Example data
  const activities = [
    { title: 'Survey completed', trc: '+25 TRC', date: 'May 10, 2025', status: 'Success' },
    { title: 'Redeemed to escrow', trc: '-100 TRC', date: 'May 10, 2025', status: 'Success' },
    { title: 'Referral verified', trc: '+50 TRC', date: 'May 10, 2025', status: 'Success' },
    { title: 'Financial literacy', trc: '+500 TRC', date: 'May 10, 2025', status: 'Success' },
    { title: 'Referral verified', trc: '+50 TRC', date: 'May 10, 2025', status: 'Success' },
  ];
  return (
    <div className="md:w-full w-screen mx-auto px-2 md:px-6 py-8">
      <button className="text-gray-500 text-sm mb-8 font-medium" onClick={onBack}>&lt; Go back</button>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">TRC Activity History</h2>
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <input type="text" placeholder="Search" className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-64" />
        <button className="border border-gray-300 rounded-lg px-4 py-2 flex items-center gap-2 w-full md:w-auto">
          Filter by <span className="ml-2">&#9654;</span>
        </button>
        <button className="bg-complementary text-white px-4 py-3 rounded-lg ml-auto w-full md:w-auto">Download Statement</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl">
          <thead className="bg-purple-50">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-900">Title</th>
              <th className="text-left px-4 py-3 font-medium text-gray-900">TRC</th>
              <th className="text-left px-4 py-3 font-medium text-gray-900">Date</th>
              <th className="text-left px-4 py-3 font-medium text-gray-900">Status</th>
              <th className="text-left px-4 py-3 font-medium text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((act, idx) => (
              <tr key={idx} className="border-b border-gray-200">
                <td className="px-4 py-4 whitespace-nowrap text-gray-700">{act.title}</td>
                <td className="px-4 py-4 whitespace-nowrap text-gray-700">{act.trc}</td>
                <td className="px-4 py-4 whitespace-nowrap text-gray-700">{act.date}</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="bg-green-50 text-green-500 px-4 py-3 rounded-lg text-sm font-medium">{act.status}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <button className="border border-primary text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary hover:text-white">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TRCActivityHistory;
