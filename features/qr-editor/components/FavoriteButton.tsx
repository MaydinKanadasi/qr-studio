'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star } from 'lucide-react';
import { toggleFavorite } from '@/lib/qr/queries';

export function FavoriteButton({ id, isFavorite }: { id: string; isFavorite: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [favorite, setFavorite] = useState(isFavorite);

  async function handleToggle() {
    setLoading(true);
    const newValue = !favorite;
    setFavorite(newValue);
    await toggleFavorite(id, newValue);
    setLoading(false);
    router.refresh();
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      aria-label={favorite ? 'Favorilerden çıkar' : 'Favorilere ekle'}
      className="p-1.5 rounded-md hover:bg-muted transition-colors"
    >
      <Star
        className={`w-4 h-4 ${favorite ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
      />
    </button>
  );
}
