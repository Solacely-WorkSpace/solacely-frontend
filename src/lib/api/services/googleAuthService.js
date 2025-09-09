import { baseService } from '../baseService';

export const googleAuth = async (id_token) => {
  return baseService.post('/auth/google/', { id_token });
};