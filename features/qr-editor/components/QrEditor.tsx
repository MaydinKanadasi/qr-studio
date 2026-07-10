'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQrCode } from '../hooks/useQrCode';
import { Button } from '@/components/ui/button';
import { encodeQrContent } from '@/lib/qr/encoders';
import type { QrType } from '@/types/qr';
import { QrTypeForm, qrTypeLabels, defaultContentByType } from './QrTypeForm';
import { saveQrCode, updateQrCode, incrementDownloadCount } from '@/lib/qr/queries';

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

function getSolidColor(colorOrGradient?: {
  color?: string;
  gradient?: { colorStops: { color: string }[] };
}): string {
  return colorOrGradient?.color ?? '#000000';
}

function getGradientColors(colorOrGradient?: {
  gradient?: { colorStops: { color: string }[] };
}): [string, string] {
  const stops = colorOrGradient?.gradient?.colorStops;
  return [stops?.[0]?.color ?? '#000000', stops?.[1]?.color ?? '#ffffff'];
}

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

  const fgHasGradient = Boolean(options.dotsOptions?.gradient);
  const bgHasGradient = Boolean(options.backgroundOptions?.gradient);
  const [fgColor1, fgColor2] = getGradientColors(options.dotsOptions);
  const [bgColor1, bgColor2] = getGradientColors(options.backgroundOptions);

  function toggleFgGradient(enabled: boolean) {
    if (enabled) {
      const base = getSolidColor(options.dotsOptions);
      updateOption({
        dotsOptions: {
          ...options.dotsOptions,
          gradient: {
            type: 'linear',
            rotation: 0,
            colorStops: [
              { offset: 0, color: base },
              { offset: 1, color: '#000000' },
            ],
          },
        },
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { gradient: _gradient, ...rest } = options.dotsOptions ?? {};
      updateOption({ dotsOptions: { ...rest, color: fgColor1 } });
    }
  }

  function toggleBgGradient(enabled: boolean) {
    if (enabled) {
      const base = getSolidColor(options.backgroundOptions);
      updateOption({
        backgroundOptions: {
          ...options.backgroundOptions,
          gradient: {
            type: 'linear',
            rotation: 0,
            colorStops: [
              { offset: 0, color: base },
              { offset: 1, color: '#ffffff' },
            ],
          },
        },
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { gradient: _gradient, ...rest } = options.backgroundOptions ?? {};
      updateOption({ backgroundOptions: { ...rest, color: bgColor1 } });
    }
  }

  function setFgGradientStop(index: 0 | 1, color: string) {
    const stops = options.dotsOptions?.gradient?.colorStops ?? [];
    const newStops = [...stops];
    newStops[index] = { offset: index, color };
    updateOption({
      dotsOptions: {
        ...options.dotsOptions,
        gradient: {
          ...options.dotsOptions?.gradient,
          type: options.dotsOptions?.gradient?.type ?? 'linear',
          rotation: options.dotsOptions?.gradient?.rotation ?? 0,
          colorStops: newStops,
        },
      },
    });
  }

  function setBgGradientStop(index: 0 | 1, color: string) {
    const stops = options.backgroundOptions?.gradient?.colorStops ?? [];
    const newStops = [...stops];
    newStops[index] = { offset: index, color };
    updateOption({
      backgroundOptions: {
        ...options.backgroundOptions,
        gradient: {
          ...options.backgroundOptions?.gradient,
          type: options.backgroundOptions?.gradient?.type ?? 'linear',
          rotation: options.backgroundOptions?.gradient?.rotation ?? 0,
          colorStops: newStops,
        },
      },
    });
  }

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

  async function handleDownload(extension: 'png' | 'svg') {
    await download(extension);
    if (isEditing && initialQr) {
      await incrementDownloadCount(initialQr.id);
    }
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
          {/* Ön Plan Rengi */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Ön Plan Rengi</label>
              <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={fgHasGradient}
                  onChange={(e) => toggleFgGradient(e.target.checked)}
                />
                Gradient
              </label>
            </div>
            {fgHasGradient ? (
              <div className="flex gap-2">
                <input
                  type="color"
                  value={fgColor1}
                  onChange={(e) => setFgGradientStop(0, e.target.value)}
                  className="flex-1 h-10 border border-border rounded-md cursor-pointer"
                />
                <input
                  type="color"
                  value={fgColor2}
                  onChange={(e) => setFgGradientStop(1, e.target.value)}
                  className="flex-1 h-10 border border-border rounded-md cursor-pointer"
                />
              </div>
            ) : (
              <input
                type="color"
                value={getSolidColor(options.dotsOptions)}
                onChange={(e) =>
                  updateOption({
                    dotsOptions: { ...options.dotsOptions, color: e.target.value },
                  })
                }
                className="w-full h-10 border border-border rounded-md cursor-pointer"
              />
            )}
          </div>

          {/* Arka Plan Rengi */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Arka Plan Rengi</label>
              <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={bgHasGradient}
                  onChange={(e) => toggleBgGradient(e.target.checked)}
                />
                Gradient
              </label>
            </div>
            {bgHasGradient ? (
              <div className="flex gap-2">
                <input
                  type="color"
                  value={bgColor1}
                  onChange={(e) => setBgGradientStop(0, e.target.value)}
                  className="flex-1 h-10 border border-border rounded-md cursor-pointer"
                />
                <input
                  type="color"
                  value={bgColor2}
                  onChange={(e) => setBgGradientStop(1, e.target.value)}
                  className="flex-1 h-10 border border-border rounded-md cursor-pointer"
                />
              </div>
            ) : (
              <input
                type="color"
                value={getSolidColor(options.backgroundOptions)}
                onChange={(e) =>
                  updateOption({
                    backgroundOptions: { ...options.backgroundOptions, color: e.target.value },
                  })
                }
                className="w-full h-10 border border-border rounded-md cursor-pointer"
              />
            )}
            {(fgHasGradient || bgHasGradient) && (
              <p className="text-xs text-muted-foreground">
                Gradient kullanırken ön plan ve arka plan renkleri arasında yeterli kontrast
                olduğundan emin ol, aksi halde QR kod okunamayabilir.
              </p>
            )}
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
          <Button onClick={() => handleDownload('png')} variant="outline" className="flex-1">
            PNG İndir
          </Button>
          <Button onClick={() => handleDownload('svg')} variant="outline" className="flex-1">
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
