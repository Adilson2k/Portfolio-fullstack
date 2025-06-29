
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { skillService } from '../services/api';
import { Skill } from '../types/api';
import { useToast } from '@/hooks/use-toast';

export const useSkills = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: () => skillService.getSkills(),
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
};

export const useCreateSkill = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (skill: Omit<Skill, 'id'>) => skillService.createSkill(skill),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      toast({
        title: "Skill adicionada!",
        description: "A habilidade foi criada com sucesso.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao criar skill",
        description: error.message || "Erro inesperado",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Skill> }) =>
      skillService.updateSkill(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      toast({
        title: "Skill atualizada!",
        description: "As alterações foram salvas com sucesso.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao atualizar skill",
        description: error.message || "Erro inesperado",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => skillService.deleteSkill(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      toast({
        title: "Skill excluída!",
        description: "A habilidade foi removida com sucesso.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao excluir skill",
        description: error.message || "Erro inesperado",
        variant: "destructive",
      });
    },
  });
};
