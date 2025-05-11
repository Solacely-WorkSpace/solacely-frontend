"use client"
import Image from 'next/image'
import { useState } from 'react';
import { ChevronLeft } from 'lucide-react'

function Notification({onBack}) {
  // State for notification toggles
  const [notificationSettings, setNotificationSettings] = useState({
    messages: {
      email: true,
      mobile: false,
      browser: false
    },
    promotions: {
      email: true,
      mobile: false,
      browser: false
    },
    reminders: {
      email: true,
      mobile: false,
      browser: false
    }
  });

  // Toggle handler
  const handleToggle = (category, channel) => {
    setNotificationSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [channel]: !prev[category][channel]
      }
    }));
  };

  // Toggle component
  const ToggleSwitch = ({ isOn, onToggle }) => {
    return (
      <button
        type="button"
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full ${isOn ? 'bg-complementary' : 'bg-gray-300'}`}
      >
        <span
          className={`${isOn ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </button>
    );
  };

  // Notification option row
  const NotificationOption = ({ label, category, channel, value }) => {
    return (
      <div className="flex items-center justify-between py-4 md:gap-50 border-b border-gray-100">
        <div className="text-gray-900 font-medium">{label}</div>
        <ToggleSwitch 
          isOn={value} 
          onToggle={() => handleToggle(category, channel)} 
        />
      </div>
    );
  };

  // Section component
  const NotificationSection = ({ title, category }) => {
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <div className="bg-white rounded-lg py-4">
          <div className="mb-2">
            <p className="text-sm text-gray-500">Email</p>
            <NotificationOption 
              label="Recevice notifications via email" 
              category={category} 
              channel="email" 
              value={notificationSettings[category].email} 
            />
          </div>
          
          <div className="mb-2">
            <p className="text-sm text-gray-500">Mobile phone</p>
            <NotificationOption 
              label="Recevice notifications via mobile phone" 
              category={category} 
              channel="mobile" 
              value={notificationSettings[category].mobile} 
            />
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Browser notifications</p>
            <NotificationOption 
              label="Recevice notifications from your browser" 
              category={category} 
              channel="browser" 
              value={notificationSettings[category].browser} 
            />
          </div>
        </div>
      </div>
    );
  };

  // Handle submit
  const handleSubmit = () => {
    // Here you would send the updated settings to your API
    console.log('Saving notification settings:', notificationSettings);
    // Add API call here
  };

  return (
    <div className="md:p-6">
      <div className="max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <button 
            onClick={onBack} 
            className="bg-gray-100 p-2 rounded-md"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-gray-800">Notifications</h1>
            <p className="text-sm text-gray-500">Set your email notifications</p>
          </div>
        </div>

        <div className="md:flex flex-col-2">
          {/* Main content */}
          <div className="">
            <NotificationSection title="Messages" category="messages" />
            <NotificationSection title="Promotions" category="promotions" />
            <NotificationSection title="Reminders" category="reminders" />

            {/* Action buttons */}
            <div className="flex gap-4 mt-8">
              <button 
                onClick={handleSubmit}
                className="px-6 py-3 bg-complementary text-white rounded-lg"
              >
                Update Settings
              </button>
              <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                Cancel
              </button>
            </div>
          </div>

          {/* Info sidebar - only shown on larger screens */}
          <div className="hidden md:block md:w-80 absolute right-10">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="mb-4 p-3 bg-gray-200 rounded-lg w-10 h-10">
                <Image src="/icons/UserDashboard/notification.svg" className='w-5 h-5' alt="Notifications" width={24} height={24} />
              </div>
              <h3 className="text-base font-medium mb-2">Updates and alerts</h3>
              <p className="text-gray-400 text-sm">
                Advertising is telling the world how great you are, while publicity is having others tell the world how great you are.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;