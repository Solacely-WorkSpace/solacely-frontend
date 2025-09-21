import BaseApiService from '../baseService';

const baseService = new BaseApiService('');

export const googleAuth = async (id_token) => {
  return baseService.post('/auth/google/', { id_token });
};