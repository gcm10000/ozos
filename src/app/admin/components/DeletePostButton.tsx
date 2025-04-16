'use client';

import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { postService } from '@/services/clientside';

interface Props {
  id: number;
}

const DeletePostButton = ({ id }: Props) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este post?')) {
      try {
        await postService.deletePost(id);
        toast({ title: 'Post excluído com sucesso!' });
        router.refresh();
      } catch {
        toast({
          title: 'Erro ao excluir post',
          description: 'Tente novamente mais tarde.',
          variant: 'destructive'
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

export default DeletePostButton;
