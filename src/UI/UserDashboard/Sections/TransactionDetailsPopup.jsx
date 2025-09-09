"use client"

function TransactionDetailsPopup({ isOpen, onClose, transaction }) {
  if (!isOpen || !transaction) return null;

  const formatCurrency = (amount) => `₦${parseFloat(amount).toLocaleString()}`
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-600'
      case 'successful': return 'bg-green-100 text-green-600'
      default: return 'bg-red-100 text-red-600'
    }
  }

  const getTypeLabel = (type) => {
    switch (type) {
      case 'rent_payment': return 'Rent Payment'
      case 'trc_transfer': return 'TRC Transfer'
      case 'credit': return 'Credit'
      case 'debit': return 'Debit'
      default: return type
    }
  }

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

        {/* Transaction ID and Date */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-sm text-gray-500 mb-1">Transaction ID</p>
              <p className="text-lg font-semibold text-black">{transaction.transaction_id}</p>
            </div>
            <p className="text-sm text-gray-400">{formatDate(transaction.created_at)}</p>
          </div>
          <hr className="border-gray-200" />
        </div>

        {/* Amount and Status */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-black">{formatCurrency(transaction.amount)}</h3>
          <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(transaction.status)}`}>
            {transaction.status === 'pending' ? 'Pending' :
             transaction.status === 'successful' ? 'Success' : 'Failed'}
          </span>
        </div>

        {/* Details Box */}
        <div className="border border-gray-200 rounded-lg p-4 space-y-4">
          {/* Description */}
          <div>
            <p className="text-sm font-medium text-black mb-1">Description</p>
            <p className="text-sm text-gray-600">{transaction.description}</p>
            <div className="border-b border-dotted border-gray-300 mt-2"></div>
          </div>

          {/* Type */}
          <div>
            <p className="text-sm font-medium text-black mb-1">Type</p>
            <p className="text-sm text-gray-600">{getTypeLabel(transaction.type)}</p>
            <div className="border-b border-dotted border-gray-300 mt-2"></div>
          </div>

          {/* Source */}
          <div>
            <p className="text-sm font-medium text-black mb-1">Source</p>
            <p className="text-sm text-gray-600 capitalize">{transaction.source}</p>
            {transaction.reason && (
              <>
                <div className="border-b border-dotted border-gray-300 mt-2"></div>
                <div className="mt-2">
                  <p className="text-sm font-medium text-black mb-1">Reason</p>
                  <p className="text-sm text-gray-600">{transaction.reason}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionDetailsPopup;
