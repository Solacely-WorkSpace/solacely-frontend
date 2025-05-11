"use client"
import Image from 'next/image'
import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'

export default function AccountInformation({ onBack }) {
  const [legalName, setLegalName] = useState('Johanna Stevens')
  const [gender, setGender] = useState('Female')    
  const [dob, setDob] = useState('January 24, 1983')
  const [email, setEmail] = useState('j.mcdowell@gmail.com')
  const [phone, setPhone] = useState('+995 590 558 124')
  const [address, setAddress] = useState('Not provided')

  return (
    <div className="w-full max-w-full overflow-x-hidden px-4 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8 w-full">
          <button 
            onClick={onBack} 
            className="bg-gray-100 p-2 rounded-md"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-base font-semibold text-gray-800">Account Information</h1>
            <p className="text-gray-500 text-xs">Profile photo, name & language</p>
          </div>
        </div>

      <div className="flex flex-col md:flex-row md:gap-5 w-full relative">
      {/* Fields */}
        <div className="w-full md:flex-1">
          {/* Legal Name */}
          <div className="mb-4 w-full border-b border-gray-200 md:border md:border-gray-200 md:rounded-lg md:p-4 md:w-100">
            <label className="text-sm text-gray-500">Legal name</label>
            <div className="flex justify-between items-center mt-1">
              <span className="font-medium text-sm">{legalName}</span>
              <button className="text-red-600 px-3 py-2 text-xs">
                <div className="flex gap-2">
                  <Image src="/icons/UserDashboard/save.svg" className="w-3 h-3" alt="Save" width={24} height={24} />
                  Save
                </div>
              </button>
            </div>
          </div>

          {/* Gender */}
          <div className="mb-4 w-full border-b border-gray-200 md:w-100">
            <label className="text-sm text-gray-500">Gender</label>
            <div className="flex justify-between items-center mt-1">
                <span className="font-medium text-sm">{gender}</span>
                <button className="text-gray-500 text-sm">
                  <div className="flex gap-2 text-sm text-gray-500">
                    <Image src="/icons/edit.svg" className="w-3 h-3" alt="Edit" width={24} height={24} />
                    Edit
                  </div>
                </button>
            </div>
          </div>

          {/* Date of birth */}
          <div className="mb-4 w-full border-b border-gray-200 md:w-100">
            <label className="text-sm text-gray-500">Date of birth</label>
            <div className="flex justify-between items-center mt-1">
              <span className="font-medium text-sm">{dob}</span>
              <button className="text-gray-500 text-sm">
                <div className="flex gap-2 text-sm text-gray-500">
                  <Image src="/icons/edit.svg" className="w-3 h-3" alt="Edit" width={24} height={24} />
                  Edit
                </div>
              </button>
            </div>
          </div>

          {/* Email */}
          <div className="mb-4 w-full border-b border-gray-200 md:w-100">
            <label className="text-sm text-gray-500">Email address</label>
            <div className="flex justify-between items-center mt-1">
              <span className="font-medium text-sm">{email}</span>
              <button className="text-gray-500 text-sm">
                <div className="flex gap-2 text-sm text-gray-500">
                  <Image src="/icons/edit.svg" className="w-3 h-3" alt="Edit" width={24} height={24} />
                  Edit
                </div>
              </button>
            </div>
          </div>

          {/* Phone */}
          <div className="mb-4 w-full border-b border-gray-200 md:w-100">
            <label className="text-sm text-gray-500">Phone number</label>
            <div className="flex justify-between items-center mt-1">
              <span className="font-medium text-sm">{phone}</span>
              <button className="text-gray-500 text-sm">
                <div className="flex gap-2 text-sm text-gray-500">
                  <Image src="/icons/edit.svg" className="w-3 h-3" alt="Edit" width={24} height={24} />
                  Edit
                </div>
              </button>
            </div>
          </div>

          {/* Whatsapp */}
          <div className="mb-4 w-full border-b border-gray-200 md:w-100">
            <label className="text-sm text-gray-500">Whatsapp number</label>
            <div className="flex justify-between items-center mt-1">
              <span className="font-medium text-sm">{phone}</span>
              <button className="text-gray-500 text-sm">
                <div className="flex gap-2 text-sm text-gray-500">
                  <Image src="/icons/edit.svg" className="w-3 h-3" alt="Edit" width={24} height={24} />
                  Edit
                </div>
              </button>
            </div>
          </div>

          {/* Address */}
          <div className="mb-4 w-full border-b border-gray-200 md:w-100">
            <label className="text-sm text-gray-500">Address</label>
            <div className="flex justify-between items-center mt-1">
              <span className="font-medium text-sm">{address}</span>
              <button className="text-gray-500 text-sm">
                <div className="flex gap-2 text-sm text-gray-500">
                  <p className="text-black bg-gray-200 px-2 py-1 rounded-full w-4 h-4 flex items-center justify-center">+</p>
                  Add
                </div>
              </button>
            </div>
          </div>

          {/* Update and Cancel Buttons */}
          <div className="flex space-x-4 mt-8">
            <button className="bg-complementary text-white px-6 py-2 rounded-md flex-1 md:flex-initial">
              Update Settings
            </button>
            <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md flex-1 md:flex-initial">
              Cancel
            </button>
          </div>
          {/* Deactivate Button */}
          <div className="mt-8 md:hidden">
            <button className="border border-gray-300 font-bold px-4 py-2 rounded-md text-gray-400 flex items-center gap-2">
              <Image src="/icons/trash.svg" alt="Deactivate Account" className='w-6 h-4' width={24} height={24} />
              Deactivate Account
            </button>
          </div>
        </div>
        {/* Right Section (Info Card) */}
        <div className="hidden md:block md:w-80">
          <div>
            <div className="bg-white p-6 w-80 rounded-lg shadow-sm lg:absolute lg:right-6">
              <div className="mb-4 p-3 bg-gray-200 rounded-lg w-10 h-10">
                <Image src="/icons/UserDashboard/user.svg" alt="Account information" className='w-6 h-4' width={24} height={24} />
              </div>
              <h3 className="font-medium text-base mb-1">General information</h3>
              <p className="text-xs text-gray-400">
                Everybody that has ever been to a meeting, can recall the all familiar passing of the business cards.
              </p>
            </div>

            {/* Deactivate Button */}
            <div className="lg:absolute lg:bottom-0 lg:right-6 mt-6">
              <button className="border border-gray-300 font-bold px-4 py-2 rounded-md text-gray-400 flex items-center gap-2">
                <Image src="/icons/trash.svg" alt="Deactivate Account" className='w-6 h-4' width={24} height={24} />
                Deactivate Account
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}