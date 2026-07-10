import { notFound } from 'next/navigation';
import { getQrCodeById } from '@/lib/qr/queries';
import { QrEditor } from '@/features/qr-editor/components/QrEditor';

export default async function EditQrPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: qrCode, error } = await getQrCodeById(id);

  if (error || !qrCode) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto pt-8 px-6">
        <h1 className="text-2xl font-bold">QR Kodu Düzenle</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {qrCode.name} adlı QR kodunu düzenliyorsun.
        </p>
      </div>
      <QrEditor
        initialQr={{
          id: qrCode.id,
          name: qrCode.name,
          type: qrCode.type,
          content: qrCode.content,
          settingsJson: qrCode.settings_json,
        }}
      />
    </div>
  );
}
