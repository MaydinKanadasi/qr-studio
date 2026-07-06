export type QrType =
  'url' | 'text' | 'email' | 'phone' | 'sms' | 'wifi' | 'whatsapp' | 'vcard' | 'event' | 'social';

export interface UrlContent {
  url: string;
}

export interface TextContent {
  text: string;
}

export interface EmailContent {
  email: string;
  subject?: string;
  body?: string;
}

export interface PhoneContent {
  phone: string;
}

export interface SmsContent {
  phone: string;
  message?: string;
}

export interface WifiContent {
  ssid: string;
  password?: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
}

export interface WhatsappContent {
  phone: string;
  message?: string;
}

export interface VCardContent {
  firstName: string;
  lastName?: string;
  phone?: string;
  email?: string;
  company?: string;
}

export interface EventContent {
  title: string;
  start: string;
  end: string;
  location?: string;
}

export interface SocialContent {
  platform: string;
  url: string;
}

export type QrContent =
  | UrlContent
  | TextContent
  | EmailContent
  | PhoneContent
  | SmsContent
  | WifiContent
  | WhatsappContent
  | VCardContent
  | EventContent
  | SocialContent;
