'use client';

import type {
  TextContent,
  EmailContent,
  PhoneContent,
  SmsContent,
  WhatsappContent,
  EventContent,
  SocialContent,
} from '@/types/qr';

const inputClass = 'w-full border border-border rounded-md px-3 py-2 text-sm bg-background';
const labelClass = 'text-sm font-medium';

export function TextForm({
  value,
  onChange,
}: {
  value: TextContent;
  onChange: (v: TextContent) => void;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor="text" className={labelClass}>
        Metin
      </label>
      <textarea
        id="text"
        value={value.text}
        onChange={(e) => onChange({ text: e.target.value })}
        rows={4}
        className={inputClass}
      />
    </div>
  );
}

export function EmailForm({
  value,
  onChange,
}: {
  value: EmailContent;
  onChange: (v: EmailContent) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <label htmlFor="email" className={labelClass}>
          E-posta
        </label>
        <input
          id="email"
          type="email"
          value={value.email}
          onChange={(e) => onChange({ ...value, email: e.target.value })}
          className={inputClass}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="subject" className={labelClass}>
          Konu
        </label>
        <input
          id="subject"
          type="text"
          value={value.subject ?? ''}
          onChange={(e) => onChange({ ...value, subject: e.target.value })}
          placeholder="Opsiyonel"
          className={inputClass}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="body" className={labelClass}>
          Mesaj
        </label>
        <textarea
          id="body"
          value={value.body ?? ''}
          onChange={(e) => onChange({ ...value, body: e.target.value })}
          rows={3}
          placeholder="Opsiyonel"
          className={inputClass}
        />
      </div>
    </div>
  );
}

export function PhoneForm({
  value,
  onChange,
}: {
  value: PhoneContent;
  onChange: (v: PhoneContent) => void;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor="phone" className={labelClass}>
        Telefon Numarası
      </label>
      <input
        id="phone"
        type="text"
        value={value.phone}
        onChange={(e) => onChange({ phone: e.target.value })}
        placeholder="+905551112233"
        className={inputClass}
      />
    </div>
  );
}

export function SmsForm({
  value,
  onChange,
}: {
  value: SmsContent;
  onChange: (v: SmsContent) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <label htmlFor="smsPhone" className={labelClass}>
          Telefon Numarası
        </label>
        <input
          id="smsPhone"
          type="text"
          value={value.phone}
          onChange={(e) => onChange({ ...value, phone: e.target.value })}
          placeholder="+905551112233"
          className={inputClass}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="smsMessage" className={labelClass}>
          Mesaj
        </label>
        <textarea
          id="smsMessage"
          value={value.message ?? ''}
          onChange={(e) => onChange({ ...value, message: e.target.value })}
          rows={3}
          placeholder="Opsiyonel"
          className={inputClass}
        />
      </div>
    </div>
  );
}

export function WhatsappForm({
  value,
  onChange,
}: {
  value: WhatsappContent;
  onChange: (v: WhatsappContent) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <label htmlFor="waPhone" className={labelClass}>
          Telefon Numarası
        </label>
        <input
          id="waPhone"
          type="text"
          value={value.phone}
          onChange={(e) => onChange({ ...value, phone: e.target.value })}
          placeholder="+905551112233"
          className={inputClass}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="waMessage" className={labelClass}>
          Ön Tanımlı Mesaj
        </label>
        <textarea
          id="waMessage"
          value={value.message ?? ''}
          onChange={(e) => onChange({ ...value, message: e.target.value })}
          rows={3}
          placeholder="Opsiyonel"
          className={inputClass}
        />
      </div>
    </div>
  );
}

export function EventForm({
  value,
  onChange,
}: {
  value: EventContent;
  onChange: (v: EventContent) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <label htmlFor="eventTitle" className={labelClass}>
          Etkinlik Başlığı
        </label>
        <input
          id="eventTitle"
          type="text"
          value={value.title}
          onChange={(e) => onChange({ ...value, title: e.target.value })}
          className={inputClass}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="eventStart" className={labelClass}>
            Başlangıç
          </label>
          <input
            id="eventStart"
            type="datetime-local"
            value={value.start}
            onChange={(e) => onChange({ ...value, start: e.target.value })}
            className={inputClass}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="eventEnd" className={labelClass}>
            Bitiş
          </label>
          <input
            id="eventEnd"
            type="datetime-local"
            value={value.end}
            onChange={(e) => onChange({ ...value, end: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="eventLocation" className={labelClass}>
          Konum
        </label>
        <input
          id="eventLocation"
          type="text"
          value={value.location ?? ''}
          onChange={(e) => onChange({ ...value, location: e.target.value })}
          placeholder="Opsiyonel"
          className={inputClass}
        />
      </div>
    </div>
  );
}

export function SocialForm({
  value,
  onChange,
}: {
  value: SocialContent;
  onChange: (v: SocialContent) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <label htmlFor="platform" className={labelClass}>
          Platform
        </label>
        <select
          id="platform"
          value={value.platform}
          onChange={(e) => onChange({ ...value, platform: e.target.value })}
          className={inputClass}
        >
          <option value="instagram">Instagram</option>
          <option value="twitter">X (Twitter)</option>
          <option value="facebook">Facebook</option>
          <option value="linkedin">LinkedIn</option>
          <option value="tiktok">TikTok</option>
          <option value="youtube">YouTube</option>
        </select>
      </div>
      <div className="space-y-2">
        <label htmlFor="socialUrl" className={labelClass}>
          Profil URL&apos;i
        </label>
        <input
          id="socialUrl"
          type="text"
          value={value.url}
          onChange={(e) => onChange({ ...value, url: e.target.value })}
          placeholder="https://instagram.com/kullaniciadi"
          className={inputClass}
        />
      </div>
    </div>
  );
}
