'use client';

import type { QrType } from '@/types/qr';
import { WifiForm } from './forms/WifiForm';
import { VCardForm } from './forms/VCardForm';
import {
  TextForm,
  EmailForm,
  PhoneForm,
  SmsForm,
  WhatsappForm,
  EventForm,
  SocialForm,
} from './forms/SimpleForms';

export const qrTypeLabels: Record<QrType, string> = {
  url: 'URL',
  text: 'Metin',
  email: 'E-posta',
  phone: 'Telefon',
  sms: 'SMS',
  wifi: 'WiFi',
  whatsapp: 'WhatsApp',
  vcard: 'Kişi Kartı',
  event: 'Etkinlik',
  social: 'Sosyal Medya',
};

export const defaultContentByType: Record<QrType, Record<string, unknown>> = {
  url: { url: 'https://qrstudio.app' },
  text: { text: '' },
  email: { email: '', subject: '', body: '' },
  phone: { phone: '' },
  sms: { phone: '', message: '' },
  wifi: { ssid: '', password: '', encryption: 'WPA' },
  whatsapp: { phone: '', message: '' },
  vcard: { firstName: '', lastName: '', phone: '', email: '', company: '' },
  event: { title: '', start: '', end: '', location: '' },
  social: { platform: 'instagram', url: '' },
};

interface QrTypeFormProps {
  type: QrType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (content: any) => void;
}

export function QrTypeForm({ type, content, onChange }: QrTypeFormProps) {
  switch (type) {
    case 'url':
      return (
        <div className="space-y-2">
          <label htmlFor="url" className="text-sm font-medium">
            URL
          </label>
          <input
            id="url"
            type="text"
            value={content.url}
            onChange={(e) => onChange({ url: e.target.value })}
            placeholder="https://example.com"
            className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
          />
        </div>
      );
    case 'text':
      return <TextForm value={content} onChange={onChange} />;
    case 'email':
      return <EmailForm value={content} onChange={onChange} />;
    case 'phone':
      return <PhoneForm value={content} onChange={onChange} />;
    case 'sms':
      return <SmsForm value={content} onChange={onChange} />;
    case 'wifi':
      return <WifiForm value={content} onChange={onChange} />;
    case 'whatsapp':
      return <WhatsappForm value={content} onChange={onChange} />;
    case 'vcard':
      return <VCardForm value={content} onChange={onChange} />;
    case 'event':
      return <EventForm value={content} onChange={onChange} />;
    case 'social':
      return <SocialForm value={content} onChange={onChange} />;
    default:
      return null;
  }
}
