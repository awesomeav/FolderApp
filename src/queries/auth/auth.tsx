import { useQuery } from '@tanstack/react-query';
import apiService from '../../utils/apiService';

export const loginAccount = async (payload: Record<string, any>) => {
  console.log('data :');

  const { data } = await apiService.post('auth/login', payload);
  console.log('data :', data);

  return data;
};
export const signUp = async (payload: Record<string, any>) => {
  const { data } = await apiService.post('auth/signup', payload);
  return data;
};

// export const resendEmail = async (payload: Record<string, any>) => {
//   const { data } = await apiService.post('auth/resend-email', payload);
//   return data;
// };
// export const reset = async (payload: Record<string, any>) => {
//   const { data } = await apiService.post('auth/reset-password', payload);
//   return data;
// };

// export const oauthSignup = async (payload: Record<string, any>) => {
//   const { data } = await apiService.post('auth/oauth-signup', payload);
//   return data;
// };

// export const changeUserPassword = async (payload: Record<string, any>) => {
//   const { data } = await apiService.post('users/activate-user', payload);
//   return data;
// };

// export const verifyInvite = async (payload: Record<string, any>) => {
//   const { data } = await apiService.post('auth/verify-invite', payload);

//   return data;
// };
