
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contactService } from '../services/api';
import { CreateContactMessage } from '../types/api';
import { useToast } from '@/hooks/use-toast';

export const useMessages = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['messages', page, limit],
    queryFn: () => contactService.getMessages(page, limit),
    staleTime: 2 * 60 * 1000, // 2 minutos
  });
};

export const useSendMessage = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (message: CreateContactMessage) => contactService.sendMessage(message),
    onSuccess: () => {
      toast({
        title: "Mensagem enviada!",
        description: "Sua mensagem foi enviada com sucesso. Retornarei em breve!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao enviar mensagem",
        description: error.message || "Erro inesperado",
        variant: "destructive",
      });
    },
  });
};

export const useMarkMessageAsRead = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => contactService.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      toast({
        title: "Mensagem marcada como lida",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao marcar mensagem",
        description: error.message || "Erro inesperado",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => contactService.deleteMessage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      toast({
        title: "Mensagem excluída!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao excluir mensagem",
        description: error.message || "Erro inesperado",
        variant: "destructive",
      });
    },
  });
};
