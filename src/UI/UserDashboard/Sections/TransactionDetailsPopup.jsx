"use client"

function TransactionDetailsPopup({ isOpen, onClose, transaction }) {
  if (!isOpen || !transaction) return null;

  return (
    <div className="fixed inset-0 bg-[#1F296333] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-600">Transaction Details</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full border-2 border-purple-900 flex items-center justify-center text-purple-900 hover:bg-purple-50"
          >
            ✕
          </button>
        </div>

        {/* Account Section */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-sm text-gray-500 mb-1">Account</p>
              <p className="text-lg font-semibold text-black">Master Card</p>
            </div>
            <p className="text-sm text-gray-400">May 10,2025</p>
          </div>
          <hr className="border-gray-200" />
        </div>

        {/* Amount and Status */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-black">N100,000</h3>
          <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-lg text-sm font-medium">
            Pending
          </span>
        </div>

        {/* Details Box */}
        <div className="border border-gray-200 rounded-lg p-4 space-y-4">
          {/* Description */}
          <div>
            <p className="text-sm font-medium text-black mb-1">Description</p>
            <p className="text-sm text-gray-600">Pair with me, Block 10, Maitama, Gwarimpa Abuja</p>
            <div className="border-b border-dotted border-gray-300 mt-2"></div>
          </div>

          {/* Type */}
          <div>
            <p className="text-sm font-medium text-black mb-1">Type</p>
            <p className="text-sm text-gray-600">Rent Payment</p>
            <div className="border-b border-dotted border-gray-300 mt-2"></div>
          </div>

          {/* Location */}
          <div>
            <p className="text-sm font-medium text-black mb-1">Location</p>
            <p className="text-sm text-gray-600">Maitama, Gwarimpa Abuja</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionDetailsPopup;
