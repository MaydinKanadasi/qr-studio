# Changelog — QR Studio

Bu proje [Keep a Changelog](https://keepachangelog.com/) formatına benzer bir yapı izler. Sürümler [Semantic Versioning](https://semver.org/) mantığına göre numaralandırılabilir (örn. `0.1.0`).

Format: `## [Sürüm] - YYYY-MM-DD`

---

## [Unreleased]

### Planned

- Faz 8: Erişilebilirlik ve Cilalama (bkz. `ROADMAP.md`)
- QR kod düzenleme (Edit) akışı
- İndirme sayacının gerçek indirme aksiyonuna bağlanması
- My QR Codes sayfasına filtreleme
- Supabase Storage bucket kurulumu (logolar için)
- Renk seçimine gradient desteği eklenmesi

---

## [0.8.0] - 2026-07-06

### Added

- `qr_codes` tablosuna `download_count` ve `is_favorite` kolonları eklendi
- Dashboard sayfasına gerçek verilerle istatistik kartları (Toplam QR Kod, Toplam İndirme, Favoriler)
- Dashboard'a "Son QR Kodlar" tablosu eklendi
- Favori ekleme/çıkarma butonu (`FavoriteButton`) ve My QR Codes sayfasına entegrasyonu
- Settings sayfası: e-posta, hesap oluşturulma tarihi, çıkış yap butonu
- `increment_download_count` Postgres fonksiyonu ve `getDashboardStats` sorgusu

---

## [0.7.0] - 2026-07-06

### Added

- `qr_codes` ve `logos` tabloları oluşturuldu, RLS politikaları eklendi
- QR kod kaydetme, listeleme, güncelleme ve silme fonksiyonları (`lib/qr/queries.ts`)
- `/my-qr-codes` sayfası: kaydedilmiş QR kodların listesi ve silme aksiyonu
- `QrEditor`'e "Kaydet" butonu ve QR kod adı alanı eklendi

### Fixed

- `authenticated` rolüne `qr_codes` ve `logos` tabloları için gerekli GRANT izinleri verildi

---

## [0.6.0] - 2026-07-05

### Added

- Tüm QR içerik tipleri eklendi: Text, Email, Phone, SMS, WiFi, WhatsApp, vCard, Event, Social Links
- Her tip için özel form bileşenleri (`features/qr-editor/components/forms/`)
- QR Kod Tipi seçici (dropdown) ile dinamik form gösterimi
- Her tip için içeriği doğru QR string formatına çeviren encode fonksiyonları (`lib/qr/encoders.ts`)
- Her tip için Zod validasyon şemaları (`lib/validation/qr-schemas.ts`)
- Paylaşılan TypeScript tipleri (`types/qr.ts`)

---

## [0.5.0] - 2026-07-05

### Added

- Köşe stili seçimi (kare, nokta, ekstra yuvarlatılmış)
- Kenar boşluğu (margin) slider'ı
- Hata düzeltme seviyesi seçimi (L/M/Q/H)
- Logo yükleme (PNG/SVG) ve logo boyutu slider'ı

### Changed

- PNG/SVG export çözünürlüğü 280px'ten 1024px'e çıkarıldı, logo ve detaylar artık net görünüyor

---

## [0.4.0] - 2026-07-05

### Added

- `qr-code-styling` kütüphanesi entegre edildi
- URL tipi için QR kod oluşturma desteği
- Canlı önizleme (`useQrCode` hook'u ile anlık güncelleme)
- PNG ve SVG formatlarında QR kod indirme
- `/create` sayfası ve `QrEditor` bileşeni eklendi

---

## [0.3.0] - 2026-07-03

### Added

- Landing page: Navbar, Hero, Features, Examples, Pricing, FAQ, Footer section'ları
- Ana sayfa (`app/page.tsx`) landing page bileşenlerinden oluşacak şekilde yeniden yapılandırıldı

---

## [0.2.0] - 2026-07-03

### Added

- Supabase Auth entegrasyonu (email/password)
- Register sayfası (e-posta doğrulama akışı dahil)
- Login sayfası
- Route koruması: giriş yapmayanlar `/login`'e, yapanlar `/dashboard`'a yönlendiriliyor
- `public.users` tablosu oluşturuldu, RLS politikaları eklendi
- Yeni kullanıcı kaydında otomatik profil oluşturan trigger eklendi
- Geçici Dashboard sayfası (kullanıcı e-postası gösterimi)

---

## [0.1.0] - 2026-06-30

### Added

- Proje dokümantasyon yapısı oluşturuldu (`docs/` klasörü: PROJECT_REQUIREMENTS, ARCHITECTURE, DATABASE, API, ROADMAP, UI_GUIDELINES, PROMPTS, CONTRIBUTING, CHANGELOG)
- GitHub reposu oluşturuldu, `main`/`develop` branch stratejisi kuruldu
- Next.js (App Router) + TypeScript projesi oluşturuldu
- Tailwind CSS v4 entegre edildi
- shadcn/ui kuruldu (Radix UI + Nova preset, Lucide Icons)
- ESLint + Prettier konfigürasyonu eklendi
- ARCHITECTURE.md'ye uygun proje klasör yapısı oluşturuldu (`components/`, `features/`, `hooks/`, `lib/`, `types/`, `styles/`, `supabase/`)
- Supabase projesi oluşturuldu (Central EU - Frankfurt, otomatik RLS aktif)
- Supabase client/server/proxy entegrasyonu eklendi (`@supabase/ssr`)
- Next.js 16 `proxy.ts` dosya konvansiyonuna geçildi (eski `middleware.ts`'ten migrate edildi)

---

> **Not:** Her yeni faz/özellik tamamlandığında bu dosyaya yeni bir sürüm bloğu eklenmeli ve `Added` / `Changed` / `Fixed` / `Removed` kategorileri kullanılmalıdır. Geliştirme akışı için bkz. `CONTRIBUTING.md` §7.
