import BaseApiService from '../baseService';

class EmailService extends BaseApiService {
  constructor() {
    super('/email');
  }

  // Send agreement documents via email
  async sendAgreementDocuments(emailData) {
    return this.post('/send-agreement/', emailData);
  }
}

export default new EmailService();