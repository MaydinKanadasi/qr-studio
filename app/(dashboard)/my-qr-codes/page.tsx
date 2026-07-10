import Link from 'next/link';
import { getQrCodes } from '@/lib/qr/queries';
import { QrCodesTable } from '@/features/qr-editor/components/QrCodesTable';

export default async function MyQrCodesPage() {
  const { data: qrCodes, error } = await getQrCodes();

  return (
    <div className="max-w-4xl mx-auto pt-8 px-6 pb-16">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">QR Kodlarım</h1>
          <p className="text-muted-foreground text-sm mt-1">Kaydettiğin tüm QR kodları burada.</p>
        </div>
        <Link
          href="/create"
          className="text-sm bg-foreground text-background px-4 py-2 rounded-md hover:opacity-90"
        >
          Yeni QR Kod
        </Link>
      </div>

      {error && <p className="text-destructive text-sm">Hata: {error}</p>}

      {!error && qrCodes.length === 0 && (
        <div className="text-center py-16 border border-dashed border-border rounded-xl">
          <p className="text-muted-foreground">Henüz kaydedilmiş QR kodun yok.</p>
          <Link href="/create" className="text-sm underline mt-2 inline-block">
            İlk QR kodunu oluştur
          </Link>
        </div>
      )}

      {!error && qrCodes.length > 0 && <QrCodesTable qrCodes={qrCodes} />}
    </div>
  );
}
