// components/ApiKeyRevokeButton.tsx
'use client';

import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { apiKeyService } from '@/services/clientside';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function ApiKeyRevokeButton({ id }: { id: number }) {
    const router = useRouter();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={async () => {
        await apiKeyService.removeApiKey(id);
        toast.success("Chave de Acesso foi apagada com sucesso.");
        router.refresh();
      }}
    >
      <Trash2 size={16} />
    </Button>
  );
}
