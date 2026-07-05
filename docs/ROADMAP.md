# Roadmap — QR Studio

Bu doküman, projenin git/github üzerinden adım adım nasıl ilerleyeceğini tanımlar. Her faz, bağımsız bir branch/PR akışıyla geliştirilebilecek şekilde tasarlanmıştır.

## Faz 0 — Kurulum

- [x] Next.js (App Router) + TypeScript projesinin oluşturulması
- [x] Tailwind CSS ve shadcn/ui kurulumu
- [x] ESLint + Prettier konfigürasyonu
- [x] Klasör yapısının oluşturulması (bkz. `ARCHITECTURE.md`)
- [x] Supabase projesinin oluşturulması ve ortam değişkenlerinin (.env) ayarlanması
- [x] GitHub reposunun oluşturulması, ana branch koruması (main) ve branch stratejisi belirlenmesi

## Faz 1 — Authentication

- [x] Supabase Auth entegrasyonu
- [x] Register sayfası (email, password, confirm password)
- [x] Login sayfası (email, password, forgot password)
- [x] Korumalı route'lar için middleware
- [x] `users` tablosu ve temel RLS politikaları

## Faz 2 — Landing Page

- [x] Hero, Features, Examples, Pricing, FAQ, Footer bölümleri
- [ ] Responsive tasarım (desktop/tablet/mobile)
- [ ] SEO temel optimizasyonları

## Faz 3 — QR Üretim Çekirdeği

- [x] `qr-code-styling` entegrasyonu
- [x] Temel QR tipi olarak URL desteği
- [x] Live preview mekanizması
- [x] PNG/SVG export

## Faz 4 — QR Özelleştirme

- [ ] Renk seçimi (foreground/background/gradient)
- [ ] Dot/Corner stilleri
- [ ] Logo yükleme ve boyutlandırma
- [ ] Margin slider
- [ ] Error correction seçenekleri (L/M/Q/H)

## Faz 5 — Tüm QR Tipleri

- [ ] Text, Email, Phone, SMS
- [ ] WiFi (SSID + şifre)
- [ ] WhatsApp
- [ ] vCard
- [ ] Event
- [ ] Social Links
- [ ] Her tip için Zod validasyon şemaları

## Faz 6 — Veritabanı Entegrasyonu

- [ ] `qr_codes` ve `logos` tablolarının oluşturulması (bkz. `DATABASE.md`)
- [ ] RLS politikalarının uygulanması
- [ ] Supabase Storage bucket kurulumu (logos)
- [ ] QR kaydetme/güncelleme/silme akışlarının bağlanması

## Faz 7 — Dashboard

- [ ] İstatistik kartları (Total QR Codes, Downloads, Favorites)
- [ ] Recent QR Codes tablosu (Name, Type, Created Date, Last Updated, Actions)
- [ ] Edit/Delete/Download aksiyonları
- [ ] My QR Codes sayfası (liste + filtreleme)
- [ ] Settings sayfası (profil yönetimi)

## Faz 8 — Erişilebilirlik ve Cilalama (Polish)

- [ ] Klavye navigasyonu
- [ ] Kontrast/semantic HTML kontrolleri
- [ ] Ekran okuyucu testleri
- [ ] Lighthouse skoru > 90 hedefine ulaşma

## Faz 9 — Deployment

- [ ] Vercel'e production deployment
- [ ] Ortam değişkenlerinin production'da ayarlanması
- [ ] Custom domain (opsiyonel)
- [ ] Son uçtan uca test

## Faz 10 — Dokümantasyon ve Teslim

- [ ] Tüm `docs/` dosyalarının güncellenmesi
- [ ] README.md tamamlanması
- [ ] CHANGELOG.md güncel tutulması
- [ ] Definition of Done kontrolü (bkz. `PROJECT_REQUIREMENTS.md`)

---

## Gelecek Sürümler (v2+)

| Özellik                     | Açıklama                                                          |
| --------------------------- | ----------------------------------------------------------------- |
| Dynamic QR                  | İçeriği sonradan değiştirilebilen QR'lar                          |
| Analytics                   | Tarama istatistikleri                                             |
| Password Protected QR       | Şifre korumalı QR içerikleri                                      |
| Expiration Date             | Son kullanma tarihi olan QR'lar                                   |
| Bulk QR Generator           | Toplu QR üretimi                                                  |
| AI QR Generator             | Replicate API ile sanatsal QR üretimi (bkz. `ARCHITECTURE.md` §7) |
| QR Templates                | Hazır şablonlar                                                   |
| Dark Mode                   | Karanlık tema                                                     |
| Team Workspace              | Takım bazlı çalışma alanları                                      |
| Public API                  | Harici geliştirici erişimi                                        |
| Subscription Plans + Stripe | Ücretli plan ve ödeme entegrasyonu                                |

## Git Branch Stratejisi (Öneri)

```
main            → Production-ready kod
develop         → Aktif geliştirme branch'i
feature/*       → Her faz/özellik için ayrı branch (örn. feature/auth, feature/qr-editor)
fix/*           → Hata düzeltmeleri
```

Her faz tamamlandığında `develop` branch'ine merge edilir, kararlı sürümler `main`e alınır ve `CHANGELOG.md` güncellenir.
