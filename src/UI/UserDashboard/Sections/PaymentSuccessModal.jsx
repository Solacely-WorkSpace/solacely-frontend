import React from 'react';
import Image from 'next/image';
import {Handshake} from '@/assets/images';
import Link from 'next/link';

const PaymentSuccessModal = ({ isOpen, onDashboard, onReceipt }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-[#1F296333] flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md mx-4 flex flex-col items-center">
        <div className="mb-6  w-full flex justify-center">
          <Image src={Handshake} width={200} height={120} alt="Escrow Success" />
        </div>
        <h2 className="text-xl font-bold text-center mb-2">₦500,000 has Been Securely Placed in Escrow</h2>
        <p className="text-gray-400 text-center mb-8">Landlord will be notified. Once confirmed, payment will be released.</p>
        <div className="flex gap-4 w-full">
          <button
            className="flex-1 py-3 rounded-lg bg-gray-100 text-gray-700 font-semibold text-base hover:bg-gray-200 transition"
            onClick={onReceipt}
          >
            View receipt
          </button>
          <Link href="/dashboard" className="flex-1 py-3 text-center rounded-lg bg-complementary text-white font-semibold text-base hover:bg-emerald-500 transition">
            <button >
                Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;
