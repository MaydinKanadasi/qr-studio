import { QrEditor } from '@/features/qr-editor/components/QrEditor';

export default function CreateQrPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto pt-8 px-6">
        <h1 className="text-2xl font-bold">QR Kod Oluştur</h1>
        <p className="text-muted-foreground text-sm mt-1">
          URL&apos;ini gir, tasarımını özelleştir, indir.
        </p>
      </div>
      <QrEditor />
    </div>
  );
}
