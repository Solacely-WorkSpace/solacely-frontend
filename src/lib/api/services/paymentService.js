import BaseApiService from '../baseService';

class PaymentService extends BaseApiService {
  constructor() {
    super('/payments');
  }

  // Get user's payment history
  async getPaymentHistory(filters = {}) {
    return this.get('', filters);
  }

  // Get single payment details
  async getPayment(id) {
    return this.get(`/${id}`);
  }

  // Initialize payment
  async initializePayment(paymentData) {
    return this.post('/initialize', paymentData);
  }

  // Verify payment
  async verifyPayment(paymentReference) {
    return this.get(`/verify/${paymentReference}`);
  }

  // Process rent payment
  async processRentPayment(rentData) {
    return this.post('/rent', rentData);
  }

  // Get payment methods
  async getPaymentMethods() {
    return this.get('/methods');
  }

  // Add payment method
  async addPaymentMethod(methodData) {
    return this.post('/methods', methodData);
  }

  // Update payment method
  async updatePaymentMethod(methodId, updateData) {
    return this.put(`/methods/${methodId}`, updateData);
  }

  // Delete payment method
  async deletePaymentMethod(methodId) {
    return this.delete(`/methods/${methodId}`);
  }

  // Get upcoming payments
  async getUpcomingPayments() {
    return this.get('/upcoming');
  }

  // Set up automatic payments
  async setupAutomaticPayments(autoPayData) {
    return this.post('/auto-pay', autoPayData);
  }

  // Cancel automatic payments
  async cancelAutomaticPayments(autoPayId) {
    return this.delete(`/auto-pay/${autoPayId}`);
  }

  // Get payment invoices
  async getInvoices(filters = {}) {
    return this.get('/invoices', filters);
  }

  // Download invoice
  async downloadInvoice(invoiceId) {
    return this.get(`/invoices/${invoiceId}/download`);
  }

  // Request refund
  async requestRefund(paymentId, refundData) {
    return this.post(`/${paymentId}/refund`, refundData);
  }

  // Get wallet balance
  async getWalletBalance() {
    return this.get('/wallet/balance');
  }

  // Add money to wallet
  async addToWallet(amount) {
    return this.post('/wallet/add', { amount });
  }

  // Get payment statistics
  async getPaymentStats(period = 'month') {
    return this.get('/stats', { period });
  }
}

export default new PaymentService();
