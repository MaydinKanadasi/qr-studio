'use client';

import { useQrCode } from '../hooks/useQrCode';
import { Button } from '@/components/ui/button';

export function QrEditor() {
  const { containerRef, options, updateOption, download } = useQrCode();

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
