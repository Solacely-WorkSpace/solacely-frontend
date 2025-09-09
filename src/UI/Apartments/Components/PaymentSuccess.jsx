"use client";
import Image from "next/image";


const PaymentSuccess = ({ onProceed }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-white md:rounded-3xl rounded-xl shadow-xl w-full max-w-md md:max-w-2xl overflow-hidden flex flex-col items-center justify-center min-h-[400px] py-8 px-4">
      <div className="text-center mb-3">
        <div className="text-base md:text-lg font-medium mb-4">Payment Successful</div>
        <Image
          src="/images/confirmation.png"
          alt="Success"
          width={100}
          height={100}
          className="mx-auto mb-6"
        />
        <div className="text-xl md:text-2xl font-bold mb-2">Congratulations</div>
        <div className="text-gray-700 text-sm md:text-lg">Your payment is successful</div>
      </div>
      <button
        className="mt-3 w-full max-w-md py-3 rounded-md bg-purple-800 text-white font-medium text-base hover:bg-purple-900 transition"
        onClick={onProceed}
      >
        Proceed to book
      </button>
    </div>
  </div>
);

export default PaymentSuccess;