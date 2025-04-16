'use client';

import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { userService } from '@/services/clientside/userService';

interface Props {
  id: number;
  posts: number;
}

const DeleteUserButton = ({ id, posts }: Props) => {
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    if (posts > 0) {
      toast({
        title: 'Não é possível excluir',
        description: 'Este usuário possui posts vinculados e não pode ser excluído',
        variant: 'destructive',
      });
      return;
    }

    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await userService.deleteUser(id);
        toast({
          title: 'Usuário excluído com sucesso',
        });
        router.refresh();
      } catch (error: any) {
        toast({
          title: "Erro ao excluir usuário",
          description: error.message || "Erro inesperado",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleDelete}>
      <Trash2 size={16} />
    </Button>
  );
};

export default DeleteUserButton;
