"use client";
import { useState } from "react";
import PaymentModal from "./PaymentModal";
import PaymentSuccess from "./PaymentSuccess";

export default function PaymentFlow() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <>
      <button onClick={() => setShowPaymentModal(true)} className="px-6 py-3 bg-purple-800 text-white rounded-lg font-medium">Open Payment</button>
      {showPaymentModal && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onShowSuccess={() => {
            setShowPaymentModal(false);
            setShowSuccess(true);
          }}
        />
      )}
      {showSuccess && (
        <PaymentSuccess onProceed={() => setShowSuccess(false)} />
      )}
    </>
  );
}
