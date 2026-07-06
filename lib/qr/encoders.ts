import type {
  QrType,
  UrlContent,
  TextContent,
  EmailContent,
  PhoneContent,
  SmsContent,
  WifiContent,
  WhatsappContent,
  VCardContent,
  EventContent,
  SocialContent,
} from '@/types/qr';

// WiFi/vCard alanlarında özel karakterleri escape etmek için
function escapeField(value: string): string {
  return value.replace(/([\\;,:"])/g, '\\$1');
}

export function encodeUrl(content: UrlContent): string {
  return content.url;
}

export function encodeText(content: TextContent): string {
  return content.text;
}

export function encodeEmail(content: EmailContent): string {
  const params = new URLSearchParams();
  if (content.subject) params.set('subject', content.subject);
  if (content.body) params.set('body', content.body);
  const query = params.toString();
  return `mailto:${content.email}${query ? `?${query}` : ''}`;
}

export function encodePhone(content: PhoneContent): string {
  return `tel:${content.phone}`;
}

export function encodeSms(content: SmsContent): string {
  return `smsto:${content.phone}:${content.message ?? ''}`;
}

export function encodeWifi(content: WifiContent): string {
  const { ssid, password, encryption } = content;
  return `WIFI:S:${escapeField(ssid)};T:${encryption};P:${password ? escapeField(password) : ''};;`;
}

export function encodeWhatsapp(content: WhatsappContent): string {
  const phone = content.phone.replace(/[^0-9]/g, '');
  const text = content.message ? `?text=${encodeURIComponent(content.message)}` : '';
  return `https://wa.me/${phone}${text}`;
}

export function encodeVCard(content: VCardContent): string {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${escapeField(content.lastName ?? '')};${escapeField(content.firstName)}`,
    `FN:${escapeField(`${content.firstName} ${content.lastName ?? ''}`.trim())}`,
  ];
  if (content.phone) lines.push(`TEL:${escapeField(content.phone)}`);
  if (content.email) lines.push(`EMAIL:${escapeField(content.email)}`);
  if (content.company) lines.push(`ORG:${escapeField(content.company)}`);
  lines.push('END:VCARD');
  return lines.join('\n');
}

// ICS tarih formatı: YYYYMMDDTHHMMSSZ
function toIcsDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

export function encodeEvent(content: EventContent): string {
  const lines = [
    'BEGIN:VEVENT',
    `SUMMARY:${escapeField(content.title)}`,
    `DTSTART:${toIcsDate(content.start)}`,
    `DTEND:${toIcsDate(content.end)}`,
  ];
  if (content.location) lines.push(`LOCATION:${escapeField(content.location)}`);
  lines.push('END:VEVENT');
  return lines.join('\n');
}

export function encodeSocial(content: SocialContent): string {
  return content.url;
}

type QrContentMap = {
  url: UrlContent;
  text: TextContent;
  email: EmailContent;
  phone: PhoneContent;
  sms: SmsContent;
  wifi: WifiContent;
  whatsapp: WhatsappContent;
  vcard: VCardContent;
  event: EventContent;
  social: SocialContent;
};

export function encodeQrContent<T extends QrType>(type: T, content: QrContentMap[T]): string {
  switch (type) {
    case 'url':
      return encodeUrl(content as UrlContent);
    case 'text':
      return encodeText(content as TextContent);
    case 'email':
      return encodeEmail(content as EmailContent);
    case 'phone':
      return encodePhone(content as PhoneContent);
    case 'sms':
      return encodeSms(content as SmsContent);
    case 'wifi':
      return encodeWifi(content as WifiContent);
    case 'whatsapp':
      return encodeWhatsapp(content as WhatsappContent);
    case 'vcard':
      return encodeVCard(content as VCardContent);
    case 'event':
      return encodeEvent(content as EventContent);
    case 'social':
      return encodeSocial(content as SocialContent);
    default:
      return '';
  }
}
