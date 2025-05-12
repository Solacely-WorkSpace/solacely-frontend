"use client"
import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
import CreateMaintenanceRequest from './Sections/CreateMaintenanceRequest';
import MaintenanceRequestDetails from "./Sections/MaintenanceRequestDetails"
import Image from 'next/image';
import {Clipboard} from "@/assets/images"


function MaintenancePage() {
  const [location, setLocation] = useState('Lagos');
  const [date, setDate] = useState('Past 30 Days');
  const [status, setStatus] = useState('Active');
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateRequestOpen, setIsCreateRequestOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hasMaintenanceRequests, setHasMaintenanceRequests] = useState(true)
  
  
  // Detect mobile screens
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const handleViewClick = (request) => {
    setSelectedRequest(request);
    setIsSidebarOpen(true);
  };
  
  
  // Sample maintenance requests data
  const maintenanceRequests = [
    {
      id: '234569',
      dateCreated: 'Jan 29, 2022',
      time: '08:00 PM',
      requestType: 'Cleaning Services',
      description: 'Enter a short description of what you are requesting for maintenance for',
      apartment: 'Home in Coral Gables',
      address: '55 Gbenga Kila Street',
      status: 'Pending'
    },
    {
      id: '234569',
      dateCreated: 'Jan 29, 2022',
      time: '08:00 PM',
      requestType: 'Cleaning Services',
      description: 'Enter a short description of what you are requesting for maintenance for',
      apartment: 'Home in Coral Gables',
      address: '55 Gbenga Kila Street',
      status: 'Pending'
    }
  ];

  return (
    <main className="md:p-6 w-screen md:w-auto">
      {/* Page Title */}
      <div className="md:block mb-8">
        <h1 className="text-xl font-medium md:hidden block">Maintenance</h1>
      </div>
      
      <div className="flex flex-col w-full">

        {!hasMaintenanceRequests && (
          <div className="flex mt-16 flex-col items-center justify-center p-5 rounded-md w-full mx-auto">
            <div className="relative w-40 h-40 mb-5">
              <Image src={Clipboard} alt="Clipboard" />
            </div>
            <p className="text-center text-gray-500 text-sm mb-5">
              You have not field any maintenance request yet on this account. Create a <br className="hidden md:block" />
              new request on any of your apartments here.
            </p>
            <button 
              onClick={() => setIsCreateRequestOpen(true)}
              className="bg-primary text-white py-2 px-6 rounded-md text-base font-medium hover:bg-purple-800 focus:outline-none focus:ring-2">
                Create Maintenance Request
              </button>
          </div>
        )}
        {hasMaintenanceRequests && (
          <div>
            
          

        {/* Header and Search Section */}
        {isMobile ? (
          /* Mobile View */
          <div className="space-y-4 mb-4">
            <button 
              onClick={() => setIsCreateRequestOpen(true)}
              className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-4 rounded-md"
            >
              <div className="w-5 h-5 rounded flex items-center justify-center">
                <Image src="/icons/Plus.svg" alt="Plus" width={24} height={24} />
              </div>
              <span className="text-sm font-medium">Create New Request</span>
            </button>
            
            <div className="flex gap-4">
              {/* Search Container */}
              <div className="flex justify-between items-center mb-6">
                <div className="relative w-64 h-12">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 text-lg" />
                  <input
                    type="text"
                    placeholder="Search for Maintenance Request"
                    className="pl-10 pr-1 py-3 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Filter Container */}
              <div className="border border-gray-300 rounded-md h-12">
                <button className="px-3 py-3">
                  <Image src="/icons/UserDashboard/Filter.svg" className="w-6 h-6" alt="Filter" width={18} height={18} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Desktop View */
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-64">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-lg" />
              <input
                type="text"
                placeholder="Search for Maintenance Request"
                className="pl-10 pr-1 py-2 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <button 
              onClick={() => setIsCreateRequestOpen(true)}
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md"
            >
              <Image src="/icons/Plus.svg" alt="Plus" width={24} height={24} />
              <span>Create Maintenance Request</span>
            </button>
          </div>
        )}

        {/* Filters Section - Only show on desktop */}
        {!isMobile && (
          <div className="flex gap-4 mb-6">
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-500 mb-1">Location</label>
              <div className="relative">
                <select 
                  className="text-xs w-[150px] appearance-none text-gray-400 font-medium border border-gray-300 rounded-lg py-2 px-2 pr-8 focus:outline-none focus:ring-1 focus:ring-primary"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="Lagos">Lagos</option>
                  <option value="Abuja">Abuja</option>
                  <option value="Port Harcourt">Port Harcourt</option>
                </select>
                <IoIosArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-500 mb-1">Date</label>
              <div className="relative">
                <select 
                  className="text-xs w-[150px] appearance-none text-gray-400 font-medium border border-gray-300 rounded-lg py-2 px-2 pr-8 focus:outline-none focus:ring-1 focus:ring-primary"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                >
                  <option value="Past 30 Days">Past 30 Days</option>
                  <option value="Past 60 Days">Past 60 Days</option>
                  <option value="Past 90 Days">Past 90 Days</option>
                </select>
                <IoIosArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-500 mb-1">Status</label>
              <div className="relative">
                <select 
                  className="text-xs w-[150px] appearance-none text-gray-400 font-medium border border-gray-300 rounded-lg py-2 px-2 pr-8 focus:outline-none focus:ring-1 focus:ring-primary"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
                <IoIosArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
        )}

        {/* Maintenance Requests Table */}
        <div className="relative w-full">
          <div className="overflow-x-auto w-full">
            <div className="inline-block min-w-full py-2 align-middle sm:px-0 px-4">
              <table className="w-full divide-y divide-gray-200 whitespace-nowrap">
                <thead className="bg-purple-50">
                  <tr>
                    <th scope="col" className="w-10 p-4 text-left">
                      <input type="checkbox" className="rounded" />
                    </th>
                    <th scope="col" className="p-4 text-left text-sm font-bold text-black tracking-wider">Request ID</th>
                    <th scope="col" className="p-4 text-left text-sm font-bold text-black tracking-wider">Date Created</th>
                    <th scope="col" className="p-4 text-left text-sm font-bold text-black tracking-wider">Maintenance request</th>
                    <th scope="col" className="p-4 text-left text-sm font-bold text-black tracking-wider">Apartment</th>
                    <th scope="col" className="p-4 text-left text-sm font-bold text-black tracking-wider">Status</th>
                    <th scope="col" className="p-4 text-left text-sm font-bold text-black tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                {maintenanceRequests.map((request, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-4 whitespace-nowrap">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className="text-sm text-gray-700">{request.id}</span>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 font-semibold">{request.dateCreated}</div>
                      <div className="text-xs text-gray-500">at {request.time}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-gray-600 font-semibold">{request.requestType}</div>
                      <div className="text-xs text-gray-500 truncate max-w-xs">{request.description}</div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="text-sm text-black font-semibold">{request.apartment}</div>
                      <div className="text-xs text-gray-500">{request.address}</div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-3 rounded-lg text-sm font-medium ${request.status === 'Pending' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => handleViewClick(request)} 
                        className="inline-flex items-center px-3 py-2 border border-primary text-primary text-sm font-medium rounded-md hover:bg-primary hover:text-white transition-colors">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-between items-center px-4 py-3 bg-white">
          <div className="text-xs text-gray-500">
            Showing 1 to 6 of 6 results
          </div>
          {!isMobile && (
            <div className="flex gap-2">
                <button 
                  className="text-sm px-3 py-1 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </button>
                <button 
                  className="text-sm px-3 py-1 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
        </div>
        )}
      </div>
      
      {/* Maintenance Request Sidebar */}
      <CreateMaintenanceRequest 
        isOpen={isCreateRequestOpen} 
        onClose={() => setIsCreateRequestOpen(false)} 
      />

      {/* Maintenance Request Details Sidebar */}
      <MaintenanceRequestDetails 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        requestData={selectedRequest}
      />
    </main>
  );
}

export default MaintenancePage;