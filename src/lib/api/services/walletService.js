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

  // transfer TRC earnings to rent savings
  async trcTransfer(amount) {
    return this.post('/wallets/1/trc-transfer/', { amount });
  }
}

export default new WalletService();