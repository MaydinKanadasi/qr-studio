'use client';

import { useQrCode } from '../hooks/useQrCode';
import { Button } from '@/components/ui/button';

export function QrEditor() {
  const { containerRef, options, updateOption, setLogo, setLogoSize, download } = useQrCode();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto p-6">
      {/* Sol: Kontroller */}
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <label htmlFor="url" className="text-sm font-medium">
            URL
          </label>
          <input
            id="url"
            type="text"
            value={options.data}
            onChange={(e) => updateOption({ data: e.target.value })}
            placeholder="https://example.com"
            className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
          />
        </div>

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
          <p className="text-xs text-muted-foreground">Logo eklediysen yüksek seviye önerilir.</p>
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

        <div className="flex gap-3">
          <Button onClick={() => download('png')} className="flex-1">
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
