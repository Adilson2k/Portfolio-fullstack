import api from './api';
import { LoginPayload, RegisterPayload, AuthResponse } from '../types/auth.types';

export const login = async (data: LoginPayload): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

export const register = async (data: RegisterPayload): Promise<AuthResponse> => {
  const response = await api.post('/auth/register', data);
  return response.data;
};
