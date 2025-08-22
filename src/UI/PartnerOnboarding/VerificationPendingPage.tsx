"use client";

import React from "react";
import Image from "next/image";
import AuthIllustration from "../Onboarding/components/AuthIllustration";

const VerificationPendingPage: React.FC = () => {
  return (
    <div className="flex w-full min-h-screen bg-white">
      {/* Left side illustration */}
      <div className="hidden md:block w-1/3 relative">
        <AuthIllustration />
      </div>

      {/* Right side content */}
      <div className="w-full md:w-2/3 flex flex-col items-center justify-center p-6 sm:p-8 md:p-12">
        <div className="text-center max-w-md">
          {/* Illustration */}
          <div className="relative w-48 h-48 mx-auto mb-8">
            <Image
              src="/images/congratulations.png" 
              alt="Clapping hands illustration"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>

          {/* Text content */}
          <p className="text-xl font-semibold text-gray-800 leading-relaxed">
            Welldone 🎉, your details have been sent to us to be
            reviewed shortly. You will receive an email from us when
            you have been verified.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationPendingPage;