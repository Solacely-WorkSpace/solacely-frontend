import React from 'react';
import Image from 'next/image'
import { Congratulations } from '@/assets/images'


export default function SaveSuccessModal({ open, onClose, amount = 'N20,000' }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.15)' }}>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xs flex flex-col items-center">
        <div>
            <Image
                src={Congratulations}
                alt='logo'
                className='w-50 h-60 mb-8 mx-auto md:mx-0 md:mb-0'
            />  
            </div> 
        <h2 className="text-2xl font-bold mb-2 text-center">Congratulations</h2>
        <p className="text-gray-700 text-center mb-2">You just saved {amount} towards your rent</p>
        <span className="text-2xl mb-4">🎉</span>
        <button
          onClick={onClose}
          className="bg-primary text-white px-6 py-2 rounded-md font-semibold mt-2"
        >
          Back to Wallet
        </button>
      </div>
    </div>
  );
}
