// src/services/leads.service.ts
import api from './api';
import { Lead } from '../types/lead.types';

export const getLeads = async (): Promise<Lead[]> => {
  const response = await api.get('/leads');
  return response.data;
};

export const createLead = async (lead: Partial<Lead>): Promise<Lead> => {
  const response = await api.post('/leads', lead);
  return response.data;
};
