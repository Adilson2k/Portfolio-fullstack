// src/services/projects.service.ts
import api from './api';
import { Project } from '../types/project.types';

export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get('/projects');
  return response.data;
};

export const createProject = async (project: Partial<Project>): Promise<Project> => {
  const response = await api.post('/projects', project);
  return response.data;
};
