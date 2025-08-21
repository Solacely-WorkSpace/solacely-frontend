
import React from "react";
import { useRouter } from "next/navigation";

export default function LoginPromptModal({ open, onClose }) {
  const router = useRouter();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F296333] bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
        <h2 className="text-lg font-semibold mb-4">Login Required</h2>
        <p className="mb-6">You need to log in to view apartments.</p>
        <div className="flex flex-col gap-3">
          <button
            className="btn-primary w-full"
            onClick={() => router.push('/sign-in')}
          >
            Login
          </button>
          <button
            className="border border-gray-300 w-full py-2 rounded-lg text-gray-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
