'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { apiKeyService, ApiScopeDto, apiScopesService } from '@/services/clientside';
import { toast } from 'sonner';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function ApiKeyForm() {
  const { slug } = useParams();
  const isEditing = !!slug;

  const router = useRouter();
  
  const [name, setName] = useState('');
  const [availableScopes, setAvailableScopes] = useState<ApiScopeDto[]>([]);
  const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchScopes = async () => {
      try {
        const scopes = await apiScopesService.getAll();
        setAvailableScopes(scopes);

        if (isEditing) {
          const existingScopes = await apiKeyService.getById(Number(slug));
          setName(existingScopes.name)
          setSelectedScopes(existingScopes.scopes.map(x => x.name));
        }
      } catch {
        toast.error('Erro ao carregar escopos.');
      }
    };

    fetchScopes();
  }, []);

  const toggleScope = (scope: string) => {
    setSelectedScopes((prev) =>
      prev.includes(scope)
        ? prev.filter((s) => s !== scope)
        : [...prev, scope]
    );
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      if (!name.trim()) {
        toast.error('O nome da chave é obrigatório.');
        return;
      }

      if (!selectedScopes.length) {
        toast.error('Selecione pelo menos um escopo.');
        return;
      }

      if (!isEditing) {
        const generationResult = await apiKeyService.generateApiKey({
          name,
          scopes: selectedScopes,
        });
  
        setGeneratedKey(generationResult.key);
        toast.success('API Key gerada com sucesso!');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button 
        variant="outline" 
        onClick={() => router.push('/admin/apikeys')}
        className="mb-6"
      >
        <ArrowLeft size={16} className="mr-2" />
        Voltar para a lista
      </Button>
    <div className="space-y-6">
      <div >
        <Label htmlFor="keyName">Nome da API Key</Label>
        <Input
          className='mt-2'
          id="keyName"
          placeholder="ex: minha api pessoal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          readOnly={isEditing}
        />
      </div>

      <div>
        <Label>Escopos de Acesso</Label>
        <div className="mt-3 space-y-2">
          {availableScopes.map((scope) => (
            <label key={scope.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedScopes.includes(scope.name)}
                onChange={() => toggleScope(scope.name)}
                disabled={isEditing}
              />
              <span style={{ userSelect: 'none' }}>{scope.name}</span>
            </label>
          ))}
        </div>
      </div>

      <Dialog open={!!generatedKey}>
        <DialogContent 
          className="[&>button]:hidden w-full max-w-md sm:max-w-lg mx-auto overflow-y-auto p-6 sm:p-8">
          <DialogHeader className="relative">
            <DialogTitle>Nova API Key gerada com sucesso</DialogTitle>
          </DialogHeader>
          <div className="space-y-8 text-sm">
            <div className="space-y-2 text-sm">
              <p>
                <strong>Nova API Key:</strong>
              </p>
              <p className='break-all'>
                {generatedKey}
              </p>
            </div>
            <p className="text-black text-muted-foreground mt-4">
              Copie e salve agora. Esta chave <strong>não será exibida novamente</strong>.
            </p>
          </div>
          <DialogFooter className="pt-4">
            <Button
              onClick={() => {
                setGeneratedKey(null);
                router.push('/admin/apikeys');
              }}
            >
              Entendido
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {!isEditing && (
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Gerando...' : 'Gerar Nova API Key'}
        </Button>
      )}
    </div>
    </div>
  );
}
