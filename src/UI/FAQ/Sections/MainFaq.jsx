"use client"

import React from 'react'

function MainFaq() {
  return (
    <div className="min-h-screen bg-white landingpage-container">
      {/* Header Section */}
      <div className="pt-30 pb-12 px-4 md:px-8 text-center">
        <p className="text-primary text-base font-semibold mb-4">Support</p>
        <h1 className="text-4xl md:text-5xl font-bold text-txt mb-6">FAQs</h1>
        <p className="text-[#515151] max-w-2xl mx-auto text-base leading-relaxed">
          Everything you need to know about the product and billing. Can't find the answer you're 
          looking for? Please{' '}
          <span className="text-primary underline cursor-pointer">chat to our friendly team.</span>
        </p>
      </div>

      {/* FAQ Sections */}
      <div className="px-4 md:px-8 lg:px-16 pb-16">
        <div className="mx-auto space-y-16">
          
          {/* General FAQs */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary">General</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-txt">What is Solacely?</h3>
                <p className="text-[#515151] text-sm leading-relaxed">
                  Solacely is a real estate platform powered by AI and built on blockchain technology, designed to provide a secure and efficient way to find and manage rentals.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-txt">How does Solacely work?</h3>
                <p className="text-[#515151] text-sm leading-relaxed">
                  Solacely uses AI-powered recommendations to help tenants find verified rentals, while landlords can list their properties and collect rents securely through the platform.
                </p>
              </div>
            </div>
          </div>

          {/* Tenant FAQs */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary">Tenant</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-txt">How do I find a rental on Solacely?</h3>
                <p className="text-[#515151] text-sm leading-relaxed">
                  Simply browse through our verified listings and use our AI-powered recommendations to find your perfect match.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-txt">Can I pay rent in installments?</h3>
                <p className="text-[#515151] text-sm leading-relaxed">
                  Yes, Solacely offers flexible rent payment options, allowing you to pay instalments.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-txt">How can I save for my next rent?</h3>
                <p className="text-[#515151] text-sm leading-relaxed">
                  Solacely offers a savings feature that allows you to set aside funds towards your next rent payment.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-txt">How do I manage my tenancy on Solacely?</h3>
                <p className="text-[#515151] text-sm leading-relaxed">
                  You can easily manage your tenancy through our platform, including making payments and communicating with our support and your landlord whenever necessary.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-txt">What is TRC (Tenant Reward Credit)?</h3>
                <p className="text-[#515151] text-sm leading-relaxed">
                  TRC is a feature that allows tenants to earn money by completing various tasks, such as microtasks, surveys, referrals, and freelance gigs. The earned funds can be used towards rent payments.
                </p>
              </div>
            </div>
          </div>

          {/* TRC FAQs */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary">TRC</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-txt">How do I earn TRC?</h3>
                <p className="text-[#515151] text-sm leading-relaxed">
                  You can earn TRC by completing tasks and activities on our platform, such as microtasks, surveys, referrals, and freelance gigs.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-txt">How can I use my TRC?</h3>
                <p className="text-[#515151] text-sm leading-relaxed">
                  TRC funds can only be used towards rent payments on Solacely.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-txt">Can I withdraw my TRC funds?</h3>
                <p className="text-[#515151] text-sm leading-relaxed">
                  No, TRC funds can only be used for rent payments and cannot be withdrawn.
                </p>
              </div>
            </div>
          </div>

          {/* Landlord FAQs */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary">Landlord</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-txt">How do I list my property on Solacely?</h3>
                <p className="text-[#515151] text-sm leading-relaxed">
                  Simply create an account, and follow our easy listing process to showcase your property to potential tenants.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-txt">How do I collect rent through Solacely?</h3>
                <p className="text-[#515151] text-sm leading-relaxed">
                  Our secure payment system ensures that you receive rent payments promptly, with funds held in escrow until the tenant confirms satisfaction with the property.
                </p>
              </div>
            </div>
          </div>

          {/* Payment and Security FAQs */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary">Payment and Security</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-txt">Is my payment information secure?</h3>
                <p className="text-[#515151] text-sm leading-relaxed">
                  Yes, Solacely uses bank-grade security and blockchain technology to ensure secure transactions.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-txt">How does the escrow system work?</h3>
                <p className="text-[#515151] text-sm leading-relaxed">
                  Funds are held in escrow until the tenant confirms satisfaction with the property, ensuring that landlords receive payment only when tenants are satisfied.
                </p>
              </div>
            </div>
          </div>

          {/* Rewards and Ownership FAQs */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary">Rewards and Ownership</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-txt">How can I earn rewards on Solacely?</h3>
                <p className="text-[#515151] text-sm leading-relaxed">
                  You can earn rewards towards your next rent by using our platform and participating in our programs.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-txt">What is fractional property ownership?</h3>
                <p className="text-[#515151] text-sm leading-relaxed">
                  Solacely offers fractional property ownership options, allowing you to invest in properties from as low as $10.
                </p>
              </div>
            </div>
          </div>

          {/* Technical FAQs */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary">Technical</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-txt">What technology does Solacely use?</h3>
                <p className="text-[#515151] text-sm leading-relaxed">
                  Solacely is built on blockchain technology and utilizes AI-powered recommendations to enhance the rental experience.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-txt">Is Solacely available on mobile?</h3>
                <p className="text-[#515151] text-sm leading-relaxed">
                  While we don't specify mobile availability, you can likely access our platform through a web browser on your mobile device.
                </p>
              </div>
            </div>
          </div>

          {/* Support FAQs */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary">Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-txt">How do I contact Solacely support?</h3>
                <p className="text-[#515151] text-sm leading-relaxed">
                  You can reach out to our support team through our website or contact form, and we'll be happy to assist you.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-txt">What are Solacely's support hours?</h3>
                <p className="text-[#515151] text-sm leading-relaxed">
                  Our support hours may vary, but we're committed to providing timely assistance to our users.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Still have questions section */}
      <div className="bg-gray-50 py-16 px-4 md:px-16 rounded-2xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-semibold text-txt mb-4">Still have questions?</h2>
            <p className="text-[#515151]">
              Can't find the answer you're looking for? Please chat to our friendly team.
            </p>
          </div>
          <button className="bg-complementary text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors flex-shrink-0">
            Get in touch
          </button>
        </div>
      </div>
    </div>
  )
}

export default MainFaq
