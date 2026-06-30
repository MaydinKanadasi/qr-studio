# UI Guidelines — QR Studio

## 1. Tasarım Felsefesi

QR Studio'nun arayüzü; sade, modern, "araç hissiyatı" veren (tool-like) bir SaaS estetiği taşımalıdır. Editör ekranı kullanıcının dikkatini canlı önizlemeye yönlendirmeli, kontrol panelleri ise net ve düzenli olmalıdır.

## 2. Bileşen Kütüphanesi

- **Temel:** shadcn/ui (Radix UI tabanlı, Tailwind ile stillendirilmiş)
- **İkonlar:** Lucide Icons
- Tüm yeni bileşenler önce `components/ui/` altında shadcn pattern'ine uygun şekilde oluşturulmalı, özellik bazlı bileşenler `features/` altında bunları kullanmalı

## 3. Renk Sistemi

| Token         | Kullanım                        |
| ------------- | ------------------------------- |
| `primary`     | Ana aksiyon butonları, vurgular |
| `secondary`   | İkincil aksiyonlar              |
| `background`  | Sayfa arka planı                |
| `foreground`  | Ana metin rengi                 |
| `muted`       | İkincil metin, açıklamalar      |
| `destructive` | Silme/tehlikeli aksiyonlar      |
| `border`      | Kart ve input kenarlıkları      |

> Renkler Tailwind config içinde CSS değişkenleri olarak tanımlanır; Dark Mode desteği (gelecek özellik) için bu yapı önceden hazırlanmalıdır.

## 4. Tipografi

- Sistem fontu veya tek bir modern sans-serif font ailesi (örn. Inter) kullanılmalı
- Başlık hiyerarşisi: `h1` (Hero) → `h2` (section başlıkları) → `h3` (kart başlıkları)
- Gövde metni için yeterli kontrast oranı (WCAG AA minimum) sağlanmalı

## 5. Layout Kuralları

- **Landing Page:** Tam genişlik section'lar, merkezi içerik (max-width container)
- **Dashboard:** Sol sidebar (Dashboard, Create QR, My QR Codes, Settings) + sağ içerik alanı
- **Create QR (Editör):** İki sütun — sol tarafta form/kontroller, sağ tarafta sabit (sticky) canlı önizleme

## 6. Responsive Davranış

| Breakpoint | Davranış                                                                          |
| ---------- | --------------------------------------------------------------------------------- |
| Desktop    | Sidebar açık, editör iki sütunlu                                                  |
| Tablet     | Sidebar daraltılabilir, editör iki sütunlu kalabilir                              |
| Mobile     | Sidebar drawer/hamburger menüye dönüşür, editör tek sütun (önizleme üstte sticky) |

## 7. Form ve Validasyon

- Tüm formlar React Hook Form + Zod ile yönetilir
- Hata mesajları input'un hemen altında, `destructive` renkte gösterilir
- Zorunlu alanlar açıkça işaretlenir (örn. `*`)

## 8. Slider ve Kontrol Bileşenleri

- Logo boyutu, margin gibi sayısal ayarlar shadcn `Slider` bileşeniyle yönetilir
- Slider yanında canlı sayısal değer gösterimi olmalı

## 9. Dashboard Tablo Standartları

- Kolonlar: Name, Type, Created Date, Last Updated, Actions
- Actions: Edit, Delete, Download (ikon butonlar, tooltip ile)
- Boş durum (empty state) için açıklayıcı mesaj ve "Create QR" CTA'sı gösterilmeli

## 10. Erişilebilirlik (Accessibility) Standartları

- Tüm interaktif öğeler klavye ile erişilebilir olmalı (Tab/Enter/Space)
- Görseller ve ikon-only butonlar için `aria-label` zorunlu
- Renk tek başına bilgi taşıyıcı olmamalı (örn. hata durumunda ikon + renk birlikte kullanılmalı)
- Semantic HTML etiketleri (`nav`, `main`, `header`, `footer`, `button`) doğru kullanılmalı

## 11. Mikro Etkileşimler

- Live preview güncellemeleri yumuşak (debounce'lu, ~100-200ms) olmalı, göz yormamalı
- Buton ve kart hover/focus durumları tutarlı geçiş (transition) süresine sahip olmalı (örn. 150-200ms)

## 12. İkonografi Kullanımı

- Lucide Icons setinden tutarlı stroke-width kullanılmalı
- Aksiyon ikonları (Edit/Delete/Download) proje genelinde aynı ikonlarla temsil edilmeli
