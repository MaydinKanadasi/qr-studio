'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { qrTypeLabels } from './QrTypeForm';
import { DeleteQrButton } from './DeleteQrButton';
import { FavoriteButton } from './FavoriteButton';
import type { QrType } from '@/types/qr';
import type { QrCodeRecord } from '@/lib/qr/queries';

const typeOptions = Object.keys(qrTypeLabels) as QrType[];

export function QrCodesTable({ qrCodes }: { qrCodes: QrCodeRecord[] }) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<QrType | 'all'>('all');
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const filtered = useMemo(() => {
    return qrCodes.filter((qr) => {
      const matchesSearch = qr.name.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === 'all' || qr.type === typeFilter;
      const matchesFavorite = !favoritesOnly || qr.is_favorite;
      return matchesSearch && matchesType && matchesFavorite;
    });
  }, [qrCodes, search, typeFilter, favoritesOnly]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="İsme göre ara..."
          aria-label="QR kod adına göre ara"
          className="flex-1 border border-border rounded-md px-3 py-2 text-sm bg-background"
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as QrType | 'all')}
          aria-label="Tipe göre filtrele"
          className="border border-border rounded-md px-3 py-2 text-sm bg-background"
        >
          <option value="all">Tüm Tipler</option>
          {typeOptions.map((type) => (
            <option key={type} value={type}>
              {qrTypeLabels[type]}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm px-3 py-2 border border-border rounded-md cursor-pointer whitespace-nowrap">
          <input
            type="checkbox"
            checked={favoritesOnly}
            onChange={(e) => setFavoritesOnly(e.target.checked)}
          />
          Sadece Favoriler
        </label>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-xl">
          <p className="text-muted-foreground">Filtreye uyan QR kod bulunamadı.</p>
        </div>
      ) : (
        <div className="border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/30">
              <tr>
                <th className="w-10 px-4 py-3"></th>
                <th className="text-left px-4 py-3 font-medium">İsim</th>
                <th className="text-left px-4 py-3 font-medium">Tip</th>
                <th className="text-left px-4 py-3 font-medium">İndirme</th>
                <th className="text-left px-4 py-3 font-medium">Oluşturulma</th>
                <th className="text-right px-4 py-3 font-medium">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((qr) => (
                <tr key={qr.id}>
                  <td className="px-4 py-3">
                    <FavoriteButton id={qr.id} isFavorite={qr.is_favorite} />
                  </td>
                  <td className="px-4 py-3">{qr.name}</td>
                  <td className="px-4 py-3">{qrTypeLabels[qr.type as QrType] ?? qr.type}</td>
                  <td className="px-4 py-3 text-muted-foreground">{qr.download_count}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(qr.created_at).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/create/${qr.id}`}
                        className="text-sm px-2 py-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                      >
                        Düzenle
                      </Link>
                      <DeleteQrButton id={qr.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
