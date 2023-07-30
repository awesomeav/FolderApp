import { useQuery } from '@tanstack/react-query';
import apiService from '../utils/apiService';

export const loginAccount = async (payload: Record<string, any>) => {
  const { data } = await apiService.post('auth/login', payload);
  return data;
};

export const signUp = async (payload: Record<string, any>) => {
  const { data } = await apiService.post('auth/signup', payload);
  return data;
};
