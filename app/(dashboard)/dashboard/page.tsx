import Link from 'next/link';
import { getUser } from '@/lib/supabase/auth';
import { getQrCodes, getDashboardStats } from '@/lib/qr/queries';
import { qrTypeLabels } from '@/features/qr-editor/components/QrTypeForm';
import { DeleteQrButton } from '@/features/qr-editor/components/DeleteQrButton';
import type { QrType } from '@/types/qr';

export default async function DashboardPage() {
  const user = await getUser();
  const { data: stats } = await getDashboardStats();
  const { data: qrCodes } = await getQrCodes();
  const recentQrCodes = qrCodes.slice(0, 5);

  return (
    <div className="max-w-5xl mx-auto pt-8 px-6 pb-16">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Hoş geldin, {user?.email}</p>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="border border-border rounded-xl p-6">
          <p className="text-sm text-muted-foreground">Toplam QR Kod</p>
          <p className="text-3xl font-bold mt-1">{stats.totalQrCodes}</p>
        </div>
        <div className="border border-border rounded-xl p-6">
          <p className="text-sm text-muted-foreground">Toplam İndirme</p>
          <p className="text-3xl font-bold mt-1">{stats.totalDownloads}</p>
        </div>
        <div className="border border-border rounded-xl p-6">
          <p className="text-sm text-muted-foreground">Favoriler</p>
          <p className="text-3xl font-bold mt-1">{stats.totalFavorites}</p>
        </div>
      </div>

      {/* Recent QR Codes */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Son QR Kodlar</h2>
        <Link href="/my-qr-codes" className="text-sm underline text-muted-foreground">
          Tümünü Gör
        </Link>
      </div>

      {recentQrCodes.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-xl">
          <p className="text-muted-foreground">Henüz kaydedilmiş QR kodun yok.</p>
          <Link href="/create" className="text-sm underline mt-2 inline-block">
            İlk QR kodunu oluştur
          </Link>
        </div>
      ) : (
        <div className="border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/30">
              <tr>
                <th className="text-left px-4 py-3 font-medium">İsim</th>
                <th className="text-left px-4 py-3 font-medium">Tip</th>
                <th className="text-left px-4 py-3 font-medium">Oluşturulma</th>
                <th className="text-left px-4 py-3 font-medium">Son Güncelleme</th>
                <th className="text-right px-4 py-3 font-medium">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentQrCodes.map((qr) => (
                <tr key={qr.id}>
                  <td className="px-4 py-3">{qr.name}</td>
                  <td className="px-4 py-3">{qrTypeLabels[qr.type as QrType] ?? qr.type}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(qr.created_at).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(qr.updated_at).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <DeleteQrButton id={qr.id} />
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
