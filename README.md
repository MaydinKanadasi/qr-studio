# QR Studio

Kullanıcıların canlı önizleme ile yüksek derecede özelleştirilebilir QR kodlar oluşturmasını sağlayan modern bir SaaS web uygulaması. URL, WiFi, vCard, e-posta, telefon, sosyal medya linkleri ve daha fazlası için QR kod üretimini destekler.

**Canlı demo:** https://qr-studio-mak0822.vercel.app

Bu proje, bir bitirme (graduation) projesi olarak geliştirilmektedir. Yazar: Muhammet Aydın Kanadaşi

---

## Özellikler

- 🔐 Supabase Authentication (email/password)
- 🎨 Canlı önizlemeli QR kod editörü (renk, nokta/köşe stili, kenar boşluğu, hata düzeltme seviyesi)
- 🖼️ Logo yükleme ve boyutlandırma
- 📱 10 farklı QR içerik tipi: URL, Text, Email, Phone, SMS, WiFi, WhatsApp, vCard, Event, Social Links
- 💾 QR kodları kaydetme, listeleme, favorileme, silme
- 📊 Dashboard: toplam QR kod, indirme ve favori istatistikleri
- 📥 PNG ve SVG formatında export
- ♿ Erişilebilirlik: klavye navigasyonu, semantic HTML, skip-to-content linki

## Tech Stack

| Katman     | Teknoloji                                         |
| ---------- | ------------------------------------------------- |
| Frontend   | Next.js (App Router), TypeScript, Tailwind CSS v4 |
| UI         | shadcn/ui (Radix UI + Nova preset), Lucide Icons  |
| QR Üretimi | qr-code-styling                                   |
| Backend    | Supabase (PostgreSQL, Auth, Storage, RLS)         |
| Validasyon | Zod, React Hook Form                              |
| Deployment | Vercel                                            |

Detaylı mimari için bkz. [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Başlarken

### Gereksinimler

- Node.js 20+
- Bir [Supabase](https://supabase.com) projesi

### Kurulum

```bash
git clone https://github.com/MaydinKanadasi/qr-studio.git
cd qr-studio
npm install
```

### Ortam Değişkenleri

Proje kök dizininde bir `.env.local` dosyası oluştur:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
SUPABASE_SECRET_KEY=your-secret-key
```

Değerleri Supabase Dashboard → Project Settings → API Keys sayfasından alabilirsin.

### Veritabanı Migrationları

`supabase/migrations/` altındaki SQL dosyalarını Supabase SQL Editor'de sırasıyla çalıştır (`0001`, `0002`, `0003`...).

### Geliştirme Sunucusunu Başlat

```bash
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini aç.

## Proje Yapısı

- `app/` — Next.js App Router sayfaları
- `components/` — Genel amaçlı UI bileşenleri
- `features/` — Özellik bazlı modüller (qr-editor vb.)
- `lib/` — Supabase clientları, QR encode/query fonksiyonları, validasyon şemaları
- `types/` — Paylaşılan TypeScript tipleri
- `supabase/migrations/` — Veritabanı şeması SQL dosyaları
- `docs/` — Proje dokümantasyonu

Detaylı klasör yapısı için bkz. [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Dokümantasyon

| Dosya                                                   | İçerik                                           |
| ------------------------------------------------------- | ------------------------------------------------ |
| [PROJECT_REQUIREMENTS.md](docs/PROJECT_REQUIREMENTS.md) | Ürün kapsamı ve gereksinimleri                   |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md)                 | Sistem mimarisi ve klasör yapısı                 |
| [DATABASE.md](docs/DATABASE.md)                         | Veritabanı şeması ve ilişkiler                   |
| [API.md](docs/API.md)                                   | API endpoint'leri ve veri formatları             |
| [ROADMAP.md](docs/ROADMAP.md)                           | Geliştirme aşamaları ve kilometre taşları        |
| [UI_GUIDELINES.md](docs/UI_GUIDELINES.md)               | Tasarım sistemi, bileşenler ve renkler           |
| [PROMPTS.md](docs/PROMPTS.md)                           | AI araçları için standart geliştirme prompt'ları |
| [CONTRIBUTING.md](docs/CONTRIBUTING.md)                 | Kodlama standartları ve geliştirme kuralları     |
| [CHANGELOG.md](docs/CHANGELOG.md)                       | Sürüm geçmişi ve yapılan değişiklikler           |

## Komutlar

```bash
npm run dev           # Geliştirme sunucusu
npm run build          # Production build
npm run start          # Production sunucusu
npm run lint           # ESLint kontrolü
npm run format         # Prettier ile formatlama
npm run format:check   # Prettier format kontrolü
```

## Katkı

Kodlama standartları ve git akışı için bkz. [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md).

## Deployment

Proje Vercel üzerinde `main` branch'inden otomatik deploy edilmektedir. Detaylar için bkz. [`docs/ROADMAP.md`](docs/ROADMAP.md) Faz 9.

## Lisans

Bu proje bir bitirme projesi kapsamında geliştirilmiştir.
