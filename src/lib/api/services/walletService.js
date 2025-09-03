import BaseApiService from '../baseService';

class WalletService extends BaseApiService {
  constructor() {
    super('/wallet');
  }

  // wallet dashboard stats
  async getDashboardStats() {
    return this.get('/dashboard-stats/');
  }

  // list of all wallet transactions
  async getTransactions(params = {}) {
    return this.get('/transactions/', params);
  }
}

export default new WalletService();