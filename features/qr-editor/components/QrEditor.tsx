'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQrCode } from '../hooks/useQrCode';
import { Button } from '@/components/ui/button';
import { encodeQrContent } from '@/lib/qr/encoders';
import type { QrType } from '@/types/qr';
import { QrTypeForm, qrTypeLabels, defaultContentByType } from './QrTypeForm';
import { saveQrCode, updateQrCode } from '@/lib/qr/queries';

interface InitialQr {
  id: string;
  name: string;
  type: QrType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settingsJson: Record<string, any>;
}

const qrTypes = Object.keys(qrTypeLabels) as QrType[];

export function QrEditor({ initialQr }: { initialQr?: InitialQr }) {
  const router = useRouter();
  const isEditing = Boolean(initialQr);

  const [qrType, setQrType] = useState<QrType>(initialQr?.type ?? 'url');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [content, setContent] = useState<any>(initialQr?.content ?? defaultContentByType.url);
  const [qrName, setQrName] = useState(initialQr?.name ?? 'Adsız QR Kod');
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const initialEncoded = initialQr
    ? encodeQrContent(initialQr.type, initialQr.content) || ' '
    : 'https://qrstudio.app';

  const { containerRef, options, updateOption, setLogo, setLogoSize, download } = useQrCode(
    initialEncoded,
    initialQr?.settingsJson as Partial<Parameters<typeof useQrCode>[1]>
  );

  // Tip değiştiğinde ilgili varsayılan içeriği yükle
  function handleTypeChange(newType: QrType) {
    setQrType(newType);
    setContent(defaultContentByType[newType]);
  }

  // İçerik her değiştiğinde QR verisini yeniden encode et
  useEffect(() => {
    try {
      const encoded = encodeQrContent(qrType, content);
      updateOption({ data: encoded || ' ' });
    } catch {
      // encode sırasında hata olursa (örn. eksik alan) QR'ı güncelleme
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrType, content]);

  async function handleSave() {
    setSaving(true);
    setSaveMessage(null);

    const settingsJson = {
      dotsOptions: options.dotsOptions,
      backgroundOptions: options.backgroundOptions,
      cornersSquareOptions: options.cornersSquareOptions,
      margin: options.margin,
      qrOptions: options.qrOptions,
      imageOptions: options.imageOptions,
    };

    const result = isEditing
      ? await updateQrCode(initialQr!.id, {
          name: qrName || 'Adsız QR Kod',
          type: qrType,
          content,
          settingsJson,
        })
      : await saveQrCode({
          name: qrName || 'Adsız QR Kod',
          type: qrType,
          content,
          settingsJson,
        });

    setSaving(false);

    if (result.error) {
      setSaveMessage(`Hata: ${result.error}`);
      return;
    }

    setSaveMessage(isEditing ? 'Değişiklikler kaydedildi!' : 'QR kod kaydedildi!');
    if (isEditing) router.refresh();
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto p-6">
      {/* Sol: Kontroller */}
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <label htmlFor="qrName" className="text-sm font-medium">
            QR Kod Adı
          </label>
          <input
            id="qrName"
            type="text"
            value={qrName}
            onChange={(e) => setQrName(e.target.value)}
            placeholder="Adsız QR Kod"
            className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="qrType" className="text-sm font-medium">
            QR Kod Tipi
          </label>
          <select
            id="qrType"
            value={qrType}
            onChange={(e) => handleTypeChange(e.target.value as QrType)}
            className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
          >
            {qrTypes.map((type) => (
              <option key={type} value={type}>
                {qrTypeLabels[type]}
              </option>
            ))}
          </select>
        </div>

        <div className="border-t border-border pt-6">
          <QrTypeForm type={qrType} content={content} onChange={setContent} />
        </div>

        <div className="border-t border-border pt-6 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="fgColor" className="text-sm font-medium">
                Ön Plan Rengi
              </label>
              <input
                id="fgColor"
                type="color"
                value={options.dotsOptions?.color ?? '#000000'}
                onChange={(e) =>
                  updateOption({
                    dotsOptions: { ...options.dotsOptions, color: e.target.value },
                  })
                }
                className="w-full h-10 border border-border rounded-md cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="bgColor" className="text-sm font-medium">
                Arka Plan Rengi
              </label>
              <input
                id="bgColor"
                type="color"
                value={options.backgroundOptions?.color ?? '#ffffff'}
                onChange={(e) =>
                  updateOption({
                    backgroundOptions: { ...options.backgroundOptions, color: e.target.value },
                  })
                }
                className="w-full h-10 border border-border rounded-md cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="dotsType" className="text-sm font-medium">
              Nokta Stili
            </label>
            <select
              id="dotsType"
              value={options.dotsOptions?.type ?? 'rounded'}
              onChange={(e) =>
                updateOption({
                  dotsOptions: {
                    ...options.dotsOptions,
                    type: e.target.value as
                      'square' | 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'extra-rounded',
                  },
                })
              }
              className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
            >
              <option value="square">Kare</option>
              <option value="rounded">Yuvarlatılmış</option>
              <option value="dots">Nokta</option>
              <option value="classy">Klasik</option>
              <option value="classy-rounded">Klasik Yuvarlatılmış</option>
              <option value="extra-rounded">Ekstra Yuvarlatılmış</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="cornersType" className="text-sm font-medium">
              Köşe Stili
            </label>
            <select
              id="cornersType"
              value={options.cornersSquareOptions?.type ?? 'extra-rounded'}
              onChange={(e) =>
                updateOption({
                  cornersSquareOptions: {
                    ...options.cornersSquareOptions,
                    type: e.target.value as 'dot' | 'square' | 'extra-rounded',
                  },
                })
              }
              className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
            >
              <option value="square">Kare</option>
              <option value="dot">Nokta</option>
              <option value="extra-rounded">Ekstra Yuvarlatılmış</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="margin" className="text-sm font-medium">
              Kenar Boşluğu: {options.margin ?? 8}px
            </label>
            <input
              id="margin"
              type="range"
              min={0}
              max={40}
              step={2}
              value={options.margin ?? 8}
              onChange={(e) => updateOption({ margin: Number(e.target.value) })}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="errorCorrection" className="text-sm font-medium">
              Hata Düzeltme Seviyesi
            </label>
            <select
              id="errorCorrection"
              value={options.qrOptions?.errorCorrectionLevel ?? 'M'}
              onChange={(e) =>
                updateOption({
                  qrOptions: {
                    ...options.qrOptions,
                    errorCorrectionLevel: e.target.value as 'L' | 'M' | 'Q' | 'H',
                  },
                })
              }
              className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
            >
              <option value="L">Düşük (L) — %7</option>
              <option value="M">Orta (M) — %15</option>
              <option value="Q">Yüksek (Q) — %25</option>
              <option value="H">En Yüksek (H) — %30</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="logo" className="text-sm font-medium">
              Logo (PNG/SVG)
            </label>
            <input
              id="logo"
              type="file"
              accept="image/png,image/svg+xml"
              onChange={(e) => setLogo(e.target.files?.[0] ?? null)}
              className="w-full text-sm file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-foreground file:text-background file:text-sm"
            />
          </div>

          {options.image && (
            <div className="space-y-2">
              <label htmlFor="logoSize" className="text-sm font-medium">
                Logo Boyutu: {Math.round((options.imageOptions?.imageSize ?? 0.4) * 100)}%
              </label>
              <input
                id="logoSize"
                type="range"
                min={0.1}
                max={0.6}
                step={0.05}
                value={options.imageOptions?.imageSize ?? 0.4}
                onChange={(e) => setLogoSize(Number(e.target.value))}
                className="w-full"
              />
              <Button variant="ghost" size="sm" onClick={() => setLogo(null)}>
                Logoyu Kaldır
              </Button>
            </div>
          )}
        </div>

        {saveMessage && (
          <p
            className={`text-sm ${saveMessage.startsWith('Hata') ? 'text-destructive' : 'text-green-600'}`}
          >
            {saveMessage}
          </p>
        )}

        <div className="flex gap-3">
          <Button onClick={handleSave} disabled={saving} className="flex-1">
            {saving ? 'Kaydediliyor...' : isEditing ? 'Değişiklikleri Kaydet' : 'Kaydet'}
          </Button>
        </div>

        <div className="flex gap-3">
          <Button onClick={() => download('png')} variant="outline" className="flex-1">
            PNG İndir
          </Button>
          <Button onClick={() => download('svg')} variant="outline" className="flex-1">
            SVG İndir
          </Button>
        </div>
      </div>

      {/* Sağ: Canlı Önizleme */}
      <div className="flex items-center justify-center bg-muted/30 rounded-xl p-8 sticky top-8 h-fit">
        <div ref={containerRef} />
      </div>
    </div>
  );
}
