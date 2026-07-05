# Architecture — QR Studio

## 1. Mimari Yaklaşım

QR Studio, Next.js App Router üzerine kurulu, modüler ve katmanlı bir mimari izler. Amaç; bileşenlerin yeniden kullanılabilir, sorumlulukların net ayrılmış ve yeni özelliklerin (feature) izole şekilde eklenebilir olmasıdır.

**Mimari prensipler:**
- Feature-based organizasyon (özellik bazlı klasörleme)
- Clean Architecture'dan ilham alan katmanlı yapı (UI → Hooks → Lib/Services → Supabase)
- Sunucu ve istemci bileşenlerinin (Server/Client Components) net ayrımı
- Tek sorumluluk ilkesi (Single Responsibility)

## 2. Genel Sistem Diyagramı

```
┌─────────────────────────────────────────────┐
│                  Client (Browser)            │
│   Next.js App Router (React Server/Client)   │
└───────────────────┬───────────────────────────┘
                    │
        ┌───────────┴────────────┐
        │                         │
┌───────▼────────┐       ┌───────▼────────┐
│  qr-code-styling │       │   Supabase JS   │
│ (Client-side QR) │       │     Client      │
└─────────────────┘       └───────┬────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    │              │              │
            ┌───────▼──────┐ ┌────▼─────┐ ┌──────▼──────┐
            │ Auth          │ │ Postgres  │ │  Storage    │
            │ (Supabase)    │ │ + RLS     │ │ (Logos)     │
            └───────────────┘ └──────────┘ └─────────────┘

                    │ (ileride)
            ┌───────▼────────┐
            │ Replicate API   │
            │ (AI QR Görsel)  │
            └────────────────┘
```

## 3. Klasör Yapısı

```
app/                  → Next.js App Router sayfaları ve route'lar
  (auth)/             → login, register, forgot-password route grupları
  (dashboard)/        → dashboard, create, my-qr-codes, settings
  api/                → Route handlers (gerekirse server-side işlemler için)

components/           → Genel amaçlı, yeniden kullanılabilir UI bileşenleri
  ui/                 → shadcn/ui tabanlı temel bileşenler (button, input, slider, vb.)

features/             → Özellik bazlı modüller (her biri kendi component/hook/logic'i ile)
  qr-editor/          → QR oluşturma & özelleştirme ekranı
  dashboard/          → Dashboard kartları, tablo, istatistikler
  auth/               → Login/Register formları ve mantığı

hooks/                → Paylaşılan custom React hook'ları (örn. useQrCode, useDebounce)

lib/                  → Yardımcı fonksiyonlar, servis katmanı
  supabase/           → Supabase client/server init dosyaları
  qr/                 → QR üretim/encode yardımcı fonksiyonları
  validation/         → Zod şemaları

types/                → Paylaşılan TypeScript tip tanımları

styles/               → Global CSS, Tailwind config'e ek stiller

public/               → Statik dosyalar (favicon, og-image, vb.)

supabase/             → Migration dosyaları, SQL şemaları, RLS politikaları
```

## 4. Katman Sorumlulukları

| Katman | Sorumluluk |
|---|---|
| `app/` | Routing, sayfa düzeni, server component veri çekme |
| `components/` | Saf, durumsuz (stateless) veya hafif state'li UI parçaları |
| `features/` | Bir iş alanına özgü mantık + UI birleşimi |
| `hooks/` | Tekrar kullanılabilir state/efekt mantığı |
| `lib/` | Dış servislerle (Supabase, Replicate) iletişim, saf yardımcı fonksiyonlar |
| `types/` | Uygulama genelinde paylaşılan tipler/interface'ler |

## 5. Veri Akışı (Örnek: QR Oluşturma)

1. Kullanıcı `Create QR` formunu doldurur (React Hook Form + Zod ile doğrulanır)
2. Form state'i `features/qr-editor` içindeki hook'lara aktarılır
3. `qr-code-styling` kütüphanesi state'i dinleyip canlı önizlemeyi günceller (client-side, anında)
4. Kullanıcı "Kaydet" dediğinde `lib/supabase` üzerinden `qr_codes` tablosuna insert/update yapılır
5. Logo varsa Supabase Storage'a yüklenir, dönen URL `logos` tablosuna ve/veya `settings_json` içine yazılır

## 6. Authentication Akışı

- Supabase Auth (email/password) kullanılır
- Oturum bilgisi middleware ile korunan route'larda (`(dashboard)` grubu) kontrol edilir
- Row Level Security, her kullanıcının yalnızca kendi `qr_codes` kayıtlarına erişebilmesini garanti eder

## 7. AI Entegrasyonu (Gelecek Mimari — v2)

```
Kullanıcı promptu girer
        ↓
Next.js API Route → Replicate API çağrısı
        ↓
Model: QR Code Monster / ControlNet / Stable Diffusion QR
        ↓
Üretilen görsel, QR okunabilirliği korunarak işlenir
        ↓
Sonuç kullanıcıya indirilebilir olarak sunulur
```

> Detaylı prompt şablonları için bkz. `PROMPTS.md`.

## 8. Kodlama Standartları (Mimari ile İlişkili)

- Yalnızca TypeScript
- Yalnızca fonksiyonel bileşenler (class component yok)
- Modüler, yeniden kullanılabilir kod
- ESLint + Prettier zorunlu

> Detaylı kodlama kuralları için bkz. `CONTRIBUTING.md`.
