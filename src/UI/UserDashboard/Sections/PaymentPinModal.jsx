import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';


const PaymentSuccessModal = dynamic(() => import('./PaymentSuccessModal'), { ssr: false });

const PaymentPinModal = ({ isOpen, onClose, onBiometrics, onForgot }) => {
  const pinRefs = [useRef(), useRef(), useRef(), useRef()];
  const [pin, setPin] = useState(['', '', '', '']);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (pin.every(d => d.length === 1)) {
      // Simulate payment processing delay
      setTimeout(() => setShowSuccess(true), 300);
    }
  }, [pin]);

  if (!isOpen && !showSuccess) return null;

  if (showSuccess) {
    return (
      <PaymentSuccessModal
        isOpen={showSuccess}
        onDashboard={onClose}
        onReceipt={() => {}}
      />
    );
  }

  const handleChange = (idx, val) => {
    if (/^\d?$/.test(val)) {
      const newPin = [...pin];
      newPin[idx] = val;
      setPin(newPin);
      if (val && idx < 3) {
        pinRefs[idx + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !pin[idx] && idx > 0) {
      pinRefs[idx - 1].current.focus();
    }
  };

  return (
    <div className="fixed inset-0 bg-[#1F296333] flex items-center justify-center z-50 transition-opacity duration-300" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-4 flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-6 mt-2 text-center">Enter Payment Pin</h2>
        <div className="flex gap-6 mb-3">
          {pin.map((digit, idx) => (
            <input
              key={idx}
              ref={pinRefs[idx]}
              type="password"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(idx, e.target.value)}
              onKeyDown={e => handleKeyDown(idx, e)}
              className="w-12 h-14 rounded-lg border-2 border-gray-200 bg-emerald-50 text-2xl text-center focus:outline-none focus:ring-2 focus:ring-emerald-200 transition"
              autoFocus={idx === 0}
            />
          ))}
        </div>
        <div className="w-full flex justify-end mb-6">
          <button type="button" className="text-xs text-black hover:underline" onClick={onForgot}>Forgot password?</button>
        </div>
        <button
          className="w-fit bg-complementary hover:bg-emerald-500 text-white font-semibold rounded-lg px-8 py-3 mb-6 transition text-base"
          onClick={onBiometrics}
        >
          Use Biometrics
        </button>
        <div className="w-full bg-emerald-50 rounded-lg flex items-center gap-2 p-3 mt-2">
          <span className="text-emerald-500 text-xl">
            <Image src="/icons/UserDashboard/lock.svg" width={20} height={20} alt="info icon" className='md:w-6 w-10 h-6 md:h-5' />
          </span>
          <span className="text-xs text-emerald-900">Your rent will be paid into escrow until the lease is confirmed.</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentPinModal;
