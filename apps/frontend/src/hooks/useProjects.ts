
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService } from '../services/api';
import { Project, CreateProjectData } from '../types/api';
import { useToast } from '@/hooks/use-toast';

export const useProjects = (page = 1, limit = 10, category = 'all') => {
  return useQuery({
    queryKey: ['projects', page, limit, category],
    queryFn: () => projectService.getProjects(page, limit, category === 'all' ? undefined : category),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => projectService.getProject(id),
    enabled: !!id,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (projectData: CreateProjectData) => projectService.createProject(projectData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: "Projeto criado!",
        description: "O projeto foi criado com sucesso.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao criar projeto",
        description: error.message || "Erro inesperado",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateProjectData> }) =>
      projectService.updateProject(id, data),
    onSuccess: (project: Project) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project', project.id] });
      toast({
        title: "Projeto atualizado!",
        description: "As alterações foram salvas com sucesso.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao atualizar projeto",
        description: error.message || "Erro inesperado",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => projectService.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: "Projeto excluído!",
        description: "O projeto foi removido com sucesso.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao excluir projeto",
        description: error.message || "Erro inesperado",
        variant: "destructive",
      });
    },
  });
};

export const useUploadProjectImage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ projectId, image }: { projectId: string; image: File }) =>
      projectService.uploadProjectImage(projectId, image),
    onSuccess: (imageUrl: string, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: "Imagem enviada!",
        description: "A imagem do projeto foi atualizada.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao enviar imagem",
        description: error.message || "Erro inesperado",
        variant: "destructive",
      });
    },
  });
};
