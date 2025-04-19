// 'use client';

// import { useLoadingStore } from '@/stores/useLoadingStore';
// import { apiService } from '@/services/clientside';
// import FullScreenLoader from '@/components/FullScreenLoader';

// export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
//   const isLoading = useLoadingStore((s) => s.isLoading);
//   const setLoading = useLoadingStore((s) => s.setLoading);

//   // Set callback SINCRONAMENTE
//   apiService.setLoadingCallback(setLoading);

//   console.log('((((((((((((((((((((((((((((((((((((((((((((((((((((isLoading:', isLoading);

//   return (
//     <>
//       {isLoading && <FullScreenLoader />}
//       {children}
//     </>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { useLoadingStore } from '@/stores/useLoadingStore';
import { apiService } from '@/services/clientside';
import FullScreenLoader from '@/components/FullScreenLoader';
import { toast, Toaster } from 'sonner';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const isLoading = useLoadingStore((s) => s.isLoading);
  const setLoading = useLoadingStore((s) => s.setLoading);
  const [forceLoading, setForceLoading] = useState(true);

  useEffect(() => {
    apiService.setLoadingCallback(setLoading);

    // Remover forçadamente após alguns milissegundos
    const timer = setTimeout(() => setForceLoading(false), 50); // ou 100ms
    return () => clearTimeout(timer);
  }, [setLoading]);

  useEffect(() => {
    apiService.setToastHandler((msg) => toast.error(msg));
  }, []);

  const shouldShowLoader = isLoading || forceLoading;

  return (
    <>
      {shouldShowLoader && <FullScreenLoader />}
      {children}
      <Toaster richColors duration={4000} />
    </>
  );
}
