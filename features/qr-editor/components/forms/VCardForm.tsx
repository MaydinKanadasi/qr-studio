'use client';

import type { VCardContent } from '@/types/qr';

interface VCardFormProps {
  value: VCardContent;
  onChange: (value: VCardContent) => void;
}

export function VCardForm({ value, onChange }: VCardFormProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-sm font-medium">
            Ad
          </label>
          <input
            id="firstName"
            type="text"
            value={value.firstName}
            onChange={(e) => onChange({ ...value, firstName: e.target.value })}
            className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName" className="text-sm font-medium">
            Soyad
          </label>
          <input
            id="lastName"
            type="text"
            value={value.lastName ?? ''}
            onChange={(e) => onChange({ ...value, lastName: e.target.value })}
            className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="vcardPhone" className="text-sm font-medium">
          Telefon
        </label>
        <input
          id="vcardPhone"
          type="text"
          value={value.phone ?? ''}
          onChange={(e) => onChange({ ...value, phone: e.target.value })}
          placeholder="Opsiyonel"
          className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="vcardEmail" className="text-sm font-medium">
          E-posta
        </label>
        <input
          id="vcardEmail"
          type="email"
          value={value.email ?? ''}
          onChange={(e) => onChange({ ...value, email: e.target.value })}
          placeholder="Opsiyonel"
          className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="company" className="text-sm font-medium">
          Şirket
        </label>
        <input
          id="company"
          type="text"
          value={value.company ?? ''}
          onChange={(e) => onChange({ ...value, company: e.target.value })}
          placeholder="Opsiyonel"
          className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
        />
      </div>
    </div>
  );
}
