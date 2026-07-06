import { z } from 'zod';

export const urlSchema = z.object({
  url: z.string().url('Geçerli bir URL girin'),
});

export const textSchema = z.object({
  text: z.string().min(1, 'Metin boş olamaz'),
});

export const emailSchema = z.object({
  email: z.string().email('Geçerli bir e-posta girin'),
  subject: z.string().optional(),
  body: z.string().optional(),
});

export const phoneSchema = z.object({
  phone: z.string().regex(/^[+0-9\s()-]+$/, 'Geçerli bir telefon numarası girin'),
});

export const smsSchema = z.object({
  phone: z.string().regex(/^[+0-9\s()-]+$/, 'Geçerli bir telefon numarası girin'),
  message: z.string().optional(),
});

export const wifiSchema = z.object({
  ssid: z.string().min(1, 'Ağ adı (SSID) zorunlu'),
  password: z.string().optional(),
  encryption: z.enum(['WPA', 'WEP', 'nopass']),
});

export const whatsappSchema = z.object({
  phone: z.string().regex(/^[+0-9\s()-]+$/, 'Geçerli bir telefon numarası girin'),
  message: z.string().optional(),
});

export const vCardSchema = z.object({
  firstName: z.string().min(1, 'Ad zorunlu'),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Geçerli bir e-posta girin').optional().or(z.literal('')),
  company: z.string().optional(),
});

export const eventSchema = z.object({
  title: z.string().min(1, 'Başlık zorunlu'),
  start: z.string().min(1, 'Başlangıç tarihi zorunlu'),
  end: z.string().min(1, 'Bitiş tarihi zorunlu'),
  location: z.string().optional(),
});

export const socialSchema = z.object({
  platform: z.string().min(1, 'Platform zorunlu'),
  url: z.string().url('Geçerli bir URL girin'),
});

export const qrSchemaMap = {
  url: urlSchema,
  text: textSchema,
  email: emailSchema,
  phone: phoneSchema,
  sms: smsSchema,
  wifi: wifiSchema,
  whatsapp: whatsappSchema,
  vcard: vCardSchema,
  event: eventSchema,
  social: socialSchema,
} as const;
