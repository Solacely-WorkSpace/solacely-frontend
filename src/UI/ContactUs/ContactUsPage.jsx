"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Map } from '@/assets/images'

function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="aboutpage-container mt-16 w-full px-4"> 
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="w-full flex flex-col gap-8">
          <div className='mt-10'>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h1>
            <p className="text-gray-600 leading-relaxed text-sm">
              We are an industry-leading company that values honesty, integrity, and<br className='hidden md:block' />
              efficiency. Building quality products and caring.
            </p>
          </div>

          {/* Contact Form */}
          <div className="md:absolute right-20 top-26 w-full md:w-[350px] lg:w-[400px] bg-white p-6 md:p-8 rounded-lg shadow-lg shadow-xl-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-gray-700 mb-2">
                  NAME*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-2 rounded-md border text-xs border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-2">
                  EMAIL*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  required
                  className="w-full px-4 py-2 rounded-md border text-xs border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-semibold text-gray-700 mb-2">
                  SUBJECT*
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. I want to know about your service"
                  required
                  className="w-full px-4 py-2 rounded-md text-xs  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-gray-700 mb-2">
                  MESSAGE*
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message or inquiry"
                  required
                  rows={4}
                  className="w-full px-4 py-2 text-xs rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition resize-vertical"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 px-4 rounded-md tex-sm font-semibold"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Map */}
          <div className="w-full flex justify-center items-center pb-8 md:pt-12 pt-8">
            <Image
              src={Map}
              alt='map'
              className='w-full h-[500px] mb-8 mx-auto md:mx-0 md:mb-0 rounded-lg'
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUsPage