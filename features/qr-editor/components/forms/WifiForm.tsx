'use client';

import type { WifiContent } from '@/types/qr';

interface WifiFormProps {
  value: WifiContent;
  onChange: (value: WifiContent) => void;
}

export function WifiForm({ value, onChange }: WifiFormProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <label htmlFor="ssid" className="text-sm font-medium">
          Ağ Adı (SSID)
        </label>
        <input
          id="ssid"
          type="text"
          value={value.ssid}
          onChange={(e) => onChange({ ...value, ssid: e.target.value })}
          placeholder="MyWifiNetwork"
          className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="wifiPassword" className="text-sm font-medium">
          Şifre
        </label>
        <input
          id="wifiPassword"
          type="text"
          value={value.password ?? ''}
          onChange={(e) => onChange({ ...value, password: e.target.value })}
          placeholder="Opsiyonel"
          className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="encryption" className="text-sm font-medium">
          Şifreleme Türü
        </label>
        <select
          id="encryption"
          value={value.encryption}
          onChange={(e) =>
            onChange({ ...value, encryption: e.target.value as WifiContent['encryption'] })
          }
          className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
        >
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">Şifresiz</option>
        </select>
      </div>
    </div>
  );
}
