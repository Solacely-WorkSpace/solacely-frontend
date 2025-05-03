"use client";
import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <section className="aboutpage-container px-4 w-full">
      <div className="w-full bg-white p-6 rounded-lg">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold  sm:text-4xl text-gray-900">
            Subscribe to our Newsletter<br />
            to get <span className="text-complementary font-semibold">Updated</span>
          </h2><br />
          
          <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
            Get our latest update on your inbox. With lots of unique 
            blocks, you can easily build a page without coding. Build your 
            next consultancy website within few minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row max-w-md mx-auto">
            <div className="flex flex-grow sm:border-r-0 rounded-l mb-3 sm:mb-0 text-sm">
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full px-6 py-5 border rounded-[10px] sm:rounded-r-none border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button 
              onClick={handleSubmit} 
              className="px-6 py-5 bg-complementary text-white font-medium uppercase text-sm rounded-[10px] sm:rounded-l-none hover:bg-teal-600 transition-colors tracking-[0.3em]"
            >
              SUBSCRIBE
            </button>
          </div>
          
          <div className="flex items-center justify-center mt-6 mb-15 text-gray-400 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p className='text-gray-400 text-sm '>We don't spam at all, our promise!</p>
          </div>
        </div>
      </div>
    </section>
  );
}