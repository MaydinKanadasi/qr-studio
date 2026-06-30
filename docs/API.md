# API — QR Studio

## 1. Genel Yaklaşım

QR Studio'da çoğu işlem (CRUD) doğrudan Supabase JS client'ı üzerinden client-side veya server component'larda yapılır; RLS güvenliği sağlar. Next.js API Route'ları (`app/api/`) yalnızca şu durumlarda kullanılır:

- Üçüncü taraf servis çağrıları gerektiğinde (örn. Replicate API — AI QR üretimi)
- Sunucu tarafında ek doğrulama/işlem gerektiğinde (örn. dosya işleme)
- İleride public API sunulduğunda

## 2. Supabase Üzerinden Veri Erişimi (Doğrudan Client Kullanımı)

Next.js'te API route yazmak yerine, aşağıdaki işlemler doğrudan `lib/supabase` client'ı ile yapılır:

| İşlem | Yöntem |
|---|---|
| QR kod oluşturma | `supabase.from('qr_codes').insert(...)` |
| QR kod listeleme | `supabase.from('qr_codes').select(...)` |
| QR kod güncelleme | `supabase.from('qr_codes').update(...).eq('id', id)` |
| QR kod silme | `supabase.from('qr_codes').delete().eq('id', id)` |
| Logo yükleme | `supabase.storage.from('logos').upload(...)` |
| Auth (login/register) | `supabase.auth.signInWithPassword(...)` / `signUp(...)` |

## 3. İç API Route'ları (`app/api/`)

### 3.1 `POST /api/qr/generate-ai` (Gelecek — v2)

AI destekli QR görsel üretimi için Replicate API'ye proxy görevi görür.

**Request body:**
```json
{
  "prompt": "cyberpunk şehir manzarası, neon ışıklar",
  "qrContent": "https://example.com",
  "style": "controlnet-qr"
}
```

**Response:**
```json
{
  "success": true,
  "imageUrl": "https://.../generated-qr.png"
}
```

**Hata durumu:**
```json
{
  "success": false,
  "error": "Generation failed: model timeout"
}
```

### 3.2 `POST /api/export/pdf` (Gelecek)

QR kodun PDF formatında export edilmesi için server-side render gerektiren işlem.

**Request body:**
```json
{
  "qrId": "uuid",
  "format": "pdf"
}
```

**Response:** Binary PDF dosyası (`application/pdf`)

## 4. Veri Formatları (QR Content Tipleri)

Her QR tipi için `content` alanının (bkz. `DATABASE.md`) beklenen yapısı:

| Tip | content yapısı (örnek) |
|---|---|
| url | `{ "url": "https://example.com" }` |
| text | `{ "text": "Merhaba dünya" }` |
| email | `{ "email": "a@b.com", "subject": "...", "body": "..." }` |
| phone | `{ "phone": "+905551112233" }` |
| sms | `{ "phone": "+905551112233", "message": "..." }` |
| wifi | `{ "ssid": "MyWifi", "password": "...", "encryption": "WPA" }` |
| whatsapp | `{ "phone": "+905551112233", "message": "..." }` |
| vcard | `{ "firstName": "...", "lastName": "...", "phone": "...", "email": "...", "company": "..." }` |
| event | `{ "title": "...", "start": "ISO date", "end": "ISO date", "location": "..." }` |
| social | `{ "platform": "instagram", "url": "https://..." }` |

## 5. Hata Yönetimi Standardı

Tüm API route'ları aşağıdaki standart yanıt formatını kullanır:

```json
// Başarılı
{ "success": true, "data": { } }

// Hatalı
{ "success": false, "error": "Açıklayıcı hata mesajı", "code": "ERROR_CODE" }
```

## 6. Rate Limiting (Gelecek)

İleride eklenecek public API ve AI üretim endpoint'leri için rate limiting uygulanacaktır (örn. Upstash Redis veya Supabase Edge Functions ile).

## 7. Public API (Gelecek — v2/v3)

Subscription planına bağlı olarak harici geliştiricilerin QR oluşturmasına izin veren bir public API planlanmaktadır. Detaylar `ROADMAP.md` içinde ilgili milestone'da netleştirilecektir.
