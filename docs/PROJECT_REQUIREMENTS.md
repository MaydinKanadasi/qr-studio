# Project Requirements — QR Studio

**Proje:** QR Studio
**Tür:** Bitirme Projesi (Graduation Project)
**Yazar:** Muhammet Aydın Kanadaşi

---

## 1. Genel Bakış

QR Studio, kullanıcıların canlı önizleme ile yüksek derecede özelleştirilebilir QR kodlar oluşturmasını sağlayan modern bir SaaS web uygulamasıdır. URL, WiFi bilgileri, kişi kartı (vCard), e-posta, telefon, sosyal medya linkleri gibi birçok içerik tipi için QR kod üretimini destekler.

Uzun vadeli vizyon, platformu okunabilirliğini koruyan sanatsal QR kodlar üretebilen AI destekli bir tasarım servisine dönüştürmektir.

## 2. Proje Hedefleri

- Modern bir SaaS uygulaması geliştirmek
- Full-stack web geliştirme pratiği yapmak
- Authentication, veritabanı, dosya depolama ve API entegrasyonu öğrenmek
- Production-ready bir portfolyo projesi ortaya çıkarmak
- Uygulamayı public olarak deploy etmek

## 3. Teknoloji Yığını (Tech Stack)

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- Lucide Icons

### QR Üretimi
- qr-code-styling kütüphanesi

Desteklenen özellikler: canlı önizleme, logo gömme, gradient, yuvarlatılmış köşeler, özel nokta stilleri, SVG/PNG export.

### Backend — Supabase
- Authentication
- PostgreSQL
- Row Level Security (RLS)
- Storage
- Database
- Edge Functions (ileride)

### Deployment
- Vercel

## 4. Kullanıcı Rolleri

### Guest (Misafir)
**Yapabilir:** Landing page'i ziyaret etme, demo deneme, kayıt olma, giriş yapma
**Yapamaz:** QR kod kaydetme

### User (Üye)
**Yapabilir:** QR kod oluşturma, kaydetme, düzenleme, silme, PNG/SVG indirme, logo yükleme, profil yönetimi

## 5. Sayfalar ve Kapsam

| Sayfa | İçerik |
|---|---|
| Landing Page | Hero, Features, Examples, Pricing, FAQ, Footer |
| Login | Email, Password, Forgot Password |
| Register | Email, Password, Confirm Password |
| Dashboard | Sidebar: Dashboard, Create QR, My QR Codes, Settings |
| Create QR | URL, Text, Email, Phone, SMS, WiFi, WhatsApp, vCard, Event, Social Links |

## 6. QR Özelleştirme Gereksinimleri

- **Renkler:** Foreground, Background, Gradient
- **Şekiller — Dots:** Square, Rounded, Circle, Diamond
- **Şekiller — Corners:** Square, Rounded, Extra Rounded
- **Logo:** PNG/SVG yükleme, boyut slider'ı
- **Margin:** Slider ile ayarlanabilir
- **Hata Düzeltme (Error Correction):** L, M, Q, H seçenekleri
- **Live Preview:** Her değişiklik, sayfa yenilenmeden anında QR koda yansımalı

## 7. Export Gereksinimleri

- **Destekleniyor:** PNG, SVG
- **Gelecek:** PDF

## 8. Doğrulama (Validation) Kuralları

| Tip | Kural |
|---|---|
| URL | Geçerli bir URL olmalı |
| Email | Geçerli bir e-posta formatında olmalı |
| Phone | Yalnızca geçerli karakterler içermeli |
| WiFi | SSID zorunlu, şifre opsiyonel |

## 9. Güvenlik Gereksinimleri

- Supabase Authentication
- Row Level Security
- HTTPS
- Dosya doğrulama (file validation)
- Rate limiting (ileride)

## 10. Responsive ve Erişilebilirlik

**Responsive:** Desktop, Tablet, Mobile — tüm sayfalar tam responsive olmalı

**Erişilebilirlik (Accessibility):**
- Klavye navigasyonu
- Uygun kontrast oranları
- Semantic HTML
- Ekran okuyucu desteği

## 11. Fonksiyonel Olmayan Gereksinimler (NFR)

| Kategori | Gereksinim |
|---|---|
| Performance | Lighthouse skoru > 90 |
| SEO | Landing page optimize edilmiş olmalı |
| Security | Authentication zorunlu |
| Scalability | Modüler mimari |
| Maintainability | Yeniden kullanılabilir bileşenler |

## 12. Definition of Done

Proje aşağıdakiler tamamlandığında "bitti" sayılır:

- [ ] Authentication çalışıyor
- [ ] QR üretimi çalışıyor
- [ ] Live preview çalışıyor
- [ ] QR özelleştirme çalışıyor
- [ ] Kullanıcı dashboard'u çalışıyor
- [ ] Veritabanı QR kodlarını saklıyor
- [ ] Logo yükleme çalışıyor
- [ ] Deployment tamamlandı
- [ ] Mobile responsive
- [ ] Dokümantasyon tamamlandı

## 13. Gelecek Özellikler (Out of Scope — v1)

Dynamic QR, Analytics, Password Protected QR, Expiration Date, Bulk QR Generator, AI QR Generator, QR Templates, Dark Mode, Team Workspace, Public API, Subscription Plans, Stripe Payments.

> Detaylı yol haritası için bkz. `ROADMAP.md`. AI entegrasyon planı için bkz. `ARCHITECTURE.md` ve `PROMPTS.md`.
