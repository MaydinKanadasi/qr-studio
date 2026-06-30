# Prompts — QR Studio

Bu doküman, AI araçlarıyla (ChatGPT, GitHub Copilot, Claude vb.) geliştirme yaparken kullanılacak standart prompt şablonlarını içerir. Amaç, AI çıktılarının proje mimarisi ve kod standartlarıyla tutarlı olmasını sağlamaktır.

## 1. Genel Kullanım Kuralı

Her prompt'un başında, AI aracına aşağıdaki bağlamı vermek önerilir:

```
Bu proje "QR Studio" adlı bir Next.js (App Router) + TypeScript + Tailwind +
shadcn/ui + Supabase SaaS uygulamasıdır. Kodlama kuralları için CONTRIBUTING.md,
mimari için ARCHITECTURE.md dosyasını referans al. Yalnızca fonksiyonel
component'ler kullan, class component yazma. Kod TypeScript ile yazılmalı.
```

## 2. Yeni Bileşen Oluşturma Prompt'u

```
features/[özellik-adı]/ klasörü altında [Bileşen Adı] adında bir React
component'i oluştur.

Gereksinimler:
- TypeScript fonksiyonel component
- Props için ayrı bir interface tanımla
- Tailwind CSS ile stillendir, shadcn/ui bileşenlerini tercih et
- Erişilebilirlik için uygun aria-label ve semantic HTML kullan
- Gerekirse React Hook Form + Zod ile form validasyonu ekle

Bileşenin yapması gereken: [açıklama]
```

## 3. QR Tipi Ekleme Prompt'u

```
QR Studio projesine yeni bir QR içerik tipi ekleyeceğiz: [TİP ADI]

1. lib/validation/ altında Zod şeması oluştur (DATABASE.md §8'deki content
   yapısına uygun)
2. features/qr-editor/ altında bu tipe özel form alanlarını oluştur
3. QR encode mantığını lib/qr/ altına ekle (qr-code-styling ile uyumlu
   string formatına çevir)
4. types/ altında ilgili TypeScript tipini tanımla

Referans content yapısı (API.md §4):
[buraya örnek JSON yapıştır]
```

## 4. Supabase Sorgu/Migration Prompt'u

```
Supabase için aşağıdaki işlemi gerçekleştiren bir [migration SQL / Supabase
client sorgusu] yaz:

[işlem açıklaması]

Kurallar:
- RLS politikalarını DATABASE.md §5'teki pattern'e uygun yaz
- Tablo/kolon adlarını DATABASE.md şemasıyla birebir uyumlu tut
- Migration dosyası ise supabase/migrations/ formatına uygun adlandır
```

## 5. Bug Fix / Refactor Prompt'u

```
Aşağıdaki kodda [sorun açıklaması] var. Projenin kodlama standartlarına
(CONTRIBUTING.md) uygun şekilde düzelt ve gerekirse refactor et. Mevcut
davranışı bozma, sadece [hedef] iyileştirmesini yap.

[kod buraya]
```

## 6. UI/Tasarım Prompt'u

```
UI_GUIDELINES.md'deki renk sistemi, tipografi ve layout kurallarına uygun
şekilde [sayfa/bileşen adı] tasarla. shadcn/ui bileşenlerini kullan,
responsive olsun (mobile-first), erişilebilirlik kurallarına uy.
```

## 7. AI QR Görsel Üretimi Prompt Şablonu (Kullanıcıya Sunulacak — v2)

Bu şablon, son kullanıcının AI QR üretimi için gireceği prompt'u zenginleştirmek amacıyla sistem tarafında kullanılacaktır:

```
Sistem promptu (Replicate modeline gönderilecek):
"Generate an artistic background image incorporating the visual theme:
'{user_prompt}'. The final composition must remain scannable as a QR code
guiding to: {qr_content}. Maintain sufficient contrast and module structure
for QR readability. Style: {style_param}."
```

## 8. Kod İnceleme (Code Review) Prompt'u

```
Aşağıdaki pull request diff'ini CONTRIBUTING.md standartlarına göre incele.
Şunlara dikkat et:
- TypeScript tip güvenliği
- Gereksiz tekrar eden kod (DRY ihlali)
- Erişilebilirlik eksikleri
- RLS/güvenlik açıkları (Supabase sorguları varsa)

Diff:
[buraya yapıştır]
```

## 9. Dokümantasyon Güncelleme Prompt'u

```
[ROADMAP.md / CHANGELOG.md / API.md] dosyasını, az önce eklenen
[özellik adı] özelliğini yansıtacak şekilde güncelle. Mevcut format ve
dil tonunu koru (Türkçe, başlık yapısı aynı kalsın).
```

## 10. Genel İpuçları

- AI'a her zaman hangi dosyayı/klasörü hedeflediğini açıkça söyle
- Üretilen kodu mutlaka `CONTRIBUTING.md` kurallarına göre gözden geçir
- Büyük özellikleri tek seferde değil, `ROADMAP.md`'deki fazlara böl
- Veritabanı şemasıyla ilgili her promptta `DATABASE.md`'yi referans göster
