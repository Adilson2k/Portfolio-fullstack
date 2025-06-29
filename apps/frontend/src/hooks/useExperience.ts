
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { experienceService } from '../services/api';
import { Experience } from '../types/api';
import { useToast } from '@/hooks/use-toast';

export const useExperiences = () => {
  return useQuery({
    queryKey: ['experiences'],
    queryFn: () => experienceService.getExperiences(),
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
};

export const useCreateExperience = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (experience: Omit<Experience, 'id'>) => experienceService.createExperience(experience),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
      toast({
        title: "Experiência adicionada!",
        description: "A experiência foi criada com sucesso.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao criar experiência",
        description: error.message || "Erro inesperado",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateExperience = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Experience> }) =>
      experienceService.updateExperience(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
      toast({
        title: "Experiência atualizada!",
        description: "As alterações foram salvas com sucesso.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao atualizar experiência",
        description: error.message || "Erro inesperado",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteExperience = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => experienceService.deleteExperience(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
      toast({
        title: "Experiência excluída!",
        description: "A experiência foi removida com sucesso.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao excluir experiência",
        description: error.message || "Erro inesperado",
        variant: "destructive",
      });
    },
  });
};
