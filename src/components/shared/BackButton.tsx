'use client';

import { Button } from '@/components/ui/button';

export default function BackButton() {
  return (
    <Button
      className="w-full bg-ozos-blue hover:bg-blue-600"
      onClick={() => window.history.back()}
    >
      Voltar
    </Button>
  );
}
