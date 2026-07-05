# Database — QR Studio

## 1. Genel Bakış

Veritabanı Supabase (PostgreSQL) üzerinde tutulur. Tüm tablolar Row Level Security (RLS) ile korunur; bir kullanıcı yalnızca kendine ait kayıtlara erişebilir.

## 2. Şema Diyagramı (Mantıksal)

```
users (Supabase Auth)
   │ 1
   │
   │ N
qr_codes ─────┐
   │ 1         │
   │           │
   │ N         │
logos          │
```

## 3. Tablolar

### 3.1 `users`

> Not: Bu tablo, Supabase'in yerleşik `auth.users` tablosuyla ilişkilidir. Gerekirse profil bilgileri için `public.users` adında bir genişletme tablosu kullanılabilir.

| Kolon      | Tip         | Açıklama                           |
| ---------- | ----------- | ---------------------------------- |
| id         | uuid (PK)   | Supabase auth.users.id ile eşleşir |
| email      | text        | Kullanıcı e-postası                |
| created_at | timestamptz | Kayıt oluşturulma zamanı           |

### 3.2 `qr_codes`

| Kolon         | Tip                                   | Açıklama                                                                              |
| ------------- | ------------------------------------- | ------------------------------------------------------------------------------------- |
| id            | uuid (PK, default: gen_random_uuid()) | QR kod kimliği                                                                        |
| user_id       | uuid (FK → users.id)                  | Sahibi olan kullanıcı                                                                 |
| name          | text                                  | Kullanıcının verdiği isim                                                             |
| type          | text                                  | url, text, email, phone, sms, wifi, whatsapp, vcard, event, social                    |
| content       | jsonb                                 | QR'ın kodladığı asıl veri (tipine göre değişen yapı)                                  |
| settings_json | jsonb                                 | Görsel ayarlar: renkler, dot/corner stilleri, margin, error correction, logo ayarları |
| created_at    | timestamptz                           | Oluşturulma zamanı                                                                    |
| updated_at    | timestamptz                           | Son güncellenme zamanı                                                                |

**`settings_json` örnek yapı:**

```json
{
  "foregroundColor": "#000000",
  "backgroundColor": "#FFFFFF",
  "gradient": null,
  "dotsStyle": "rounded",
  "cornersStyle": "extra-rounded",
  "margin": 8,
  "errorCorrection": "M",
  "logo": {
    "enabled": true,
    "size": 0.3
  }
}
```

### 3.3 `logos`

| Kolon     | Tip                     | Açıklama                                |
| --------- | ----------------------- | --------------------------------------- |
| id        | uuid (PK)               | Logo kimliği                            |
| qr_id     | uuid (FK → qr_codes.id) | Bağlı olduğu QR kodu                    |
| image_url | text                    | Supabase Storage üzerindeki dosya URL'i |

## 4. İlişkiler

- `users 1 — N qr_codes`: Bir kullanıcının birden çok QR kodu olabilir
- `qr_codes 1 — N logos`: Bir QR koduna ait bir veya birden fazla logo kaydı tutulabilir (genelde 1, ileride versiyonlama için N)

## 5. Row Level Security (RLS) Politikaları

Tüm tablolarda aşağıdaki temel mantık uygulanır:

```sql
-- qr_codes tablosu için örnek RLS politikası
alter table qr_codes enable row level security;

create policy "Users can view own qr codes"
  on qr_codes for select
  using (auth.uid() = user_id);

create policy "Users can insert own qr codes"
  on qr_codes for insert
  with check (auth.uid() = user_id);

create policy "Users can update own qr codes"
  on qr_codes for update
  using (auth.uid() = user_id);

create policy "Users can delete own qr codes"
  on qr_codes for delete
  using (auth.uid() = user_id);
```

`logos` tablosu için de `qr_id` üzerinden join ile aynı mantık uygulanmalıdır (logonun bağlı olduğu qr_code'un user_id'si kontrol edilir).

## 6. Storage (Supabase Storage)

| Bucket  | Amaç                                                   | Erişim                                                 |
| ------- | ------------------------------------------------------ | ------------------------------------------------------ |
| `logos` | Kullanıcı tarafından yüklenen logo dosyaları (PNG/SVG) | Sadece sahibi yazabilir, public okuma (QR export için) |

## 7. Index Önerileri

```sql
create index idx_qr_codes_user_id on qr_codes(user_id);
create index idx_logos_qr_id on logos(qr_id);
```

## 8. Migration Yönetimi

- Tüm şema değişiklikleri `supabase/migrations/` klasöründe SQL dosyaları olarak tutulur
- Migration dosya adlandırma: `YYYYMMDDHHMMSS_aciklama.sql`
- Her migration `CHANGELOG.md` içinde ilgili sürüm notuna eklenir
