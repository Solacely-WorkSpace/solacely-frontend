import BaseApiService from '../baseService';

class WalletService extends BaseApiService {
  constructor() {
    super('/wallet');
  }

  // wallet stats
  async getStats() {
    return this.get('/stats/');
  }

  // list of all wallet transactions
  async getTransactions(params = {}) {
    return this.get('/transactions/', params);
  }

  // transfer TRC earnings to rent savings
  async trcTransfer(amount) {
    return this.post('/wallets/<int:wallet_id>/trc-transfer/', { amount });
  }

  // get TRC summary for current user
  async getTrcSummary() {
    return this.get('/trc-summary/');
  }
}

export default new WalletService();