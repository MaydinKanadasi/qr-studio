'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { deleteQrCode } from '@/lib/qr/queries';

export function DeleteQrButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm('Bu QR kodu silmek istediğine emin misin?')) return;
    setLoading(true);
    await deleteQrCode(id);
    setLoading(false);
    router.refresh();
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleDelete} disabled={loading}>
      {loading ? 'Siliniyor...' : 'Sil'}
    </Button>
  );
}
