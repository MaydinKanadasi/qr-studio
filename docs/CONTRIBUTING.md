# Contributing — QR Studio

Bu doküman, projeye katkı sağlarken (veya tek geliştirici olarak çalışırken) uyulması gereken kodlama standartlarını ve geliştirme akışını tanımlar.

## 1. Genel Kodlama Kuralları

- **Yalnızca TypeScript** kullanılır, `.js`/`.jsx` dosyası eklenmez
- **Yalnızca fonksiyonel component'ler** yazılır, class component kullanılmaz
- Bileşenler **yeniden kullanılabilir** olacak şekilde tasarlanır
- **Clean Architecture** prensiplerine uyulur (bkz. `ARCHITECTURE.md`)
- Kod **modüler** tutulur — bir dosya/fonksiyon tek bir sorumluluğa sahip olmalı
- **ESLint** ve **Prettier** kuralları zorunludur, commit öncesi lint hatası olmamalı

## 2. Dosya ve Klasör Adlandırma

| Tür | Adlandırma | Örnek |
|---|---|---|
| Component dosyası | PascalCase | `QrPreview.tsx` |
| Hook dosyası | camelCase, `use` ön eki | `useQrCode.ts` |
| Klasör | kebab-case | `qr-editor/` |
| Tip dosyası | camelCase | `qrTypes.ts` |
| Zod şema dosyası | camelCase, `Schema` son eki | `wifiSchema.ts` |

## 3. Component Yazım Kuralları

```tsx
// İYİ ÖRNEK
interface QrPreviewProps {
  data: string;
  size?: number;
}

export function QrPreview({ data, size = 300 }: QrPreviewProps) {
  // ...
}
```

- Props için her zaman ayrı bir `interface` tanımlanır
- Varsayılan değerler destructuring sırasında verilir
- `export default` yerine **named export** tercih edilir (tutarlılık için)

## 4. State ve Hook Kullanımı

- Tekrar eden state mantığı `hooks/` altında custom hook'a çıkarılır
- Bir özelliğe özgü hook'lar `features/[özellik]/hooks/` altında tutulur
- Gereksiz re-render'ları önlemek için `useMemo`/`useCallback` gerektiğinde kullanılır (erken optimizasyondan kaçınılır)

## 5. Form ve Validasyon

- Tüm formlar **React Hook Form** ile yönetilir
- Tüm validasyon şemaları **Zod** ile yazılır ve `lib/validation/` altında tutulur
- Form şeması ile TypeScript tipi `z.infer<typeof schema>` ile senkron tutulur

## 6. Supabase Kullanımı

- Supabase client başlatma kodu yalnızca `lib/supabase/` altında tutulur, başka yerde tekrar oluşturulmaz
- Server component'lerde server client, client component'lerde browser client kullanılır
- Hiçbir sorgu RLS'i bypass edecek şekilde service role key ile client tarafında çalıştırılmaz

## 7. Git ve Commit Standartları

### Commit Mesaj Formatı (Conventional Commits)

```
<tip>(<kapsam>): <kısa açıklama>

[opsiyonel detay]
```

**Tipler:** `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`

**Örnekler:**
```
feat(qr-editor): WiFi QR tipi için form eklendi
fix(auth): login redirect hatası düzeltildi
docs(database): RLS politikaları güncellendi
```

### Branch Adlandırma

```
feature/qr-editor-wifi-type
fix/login-redirect-bug
docs/update-roadmap
```

### Pull Request Kuralları

- Her PR, `ROADMAP.md`'deki bir faz/maddeyle ilişkilendirilmeli
- PR açıklamasında "ne değişti" ve "neden" net belirtilmeli
- Mümkünse PR küçük ve tek bir konuya odaklı tutulmalı
- Merge öncesi `CHANGELOG.md`'ye ilgili madde eklenmeli

## 8. Test Beklentisi (İleride)

Proje kapsamında otomatik test zorunluluğu başlangıçta yoktur, ancak kritik mantık (QR encode fonksiyonları, validasyon şemaları) için ileride unit test eklenmesi hedeflenir.

## 9. Kod İnceleme Kontrol Listesi

Bir PR merge edilmeden önce:

- [ ] TypeScript hatası yok
- [ ] ESLint/Prettier uyarısı yok
- [ ] Yeni component'ler `ARCHITECTURE.md`'deki klasör yapısına uygun yerleştirilmiş
- [ ] Erişilebilirlik kuralları (`UI_GUIDELINES.md` §10) gözetilmiş
- [ ] Supabase sorguları RLS ile uyumlu
- [ ] İlgili dokümantasyon (varsa) güncellenmiş

## 10. AI Araçlarıyla Geliştirme

AI araçları (ChatGPT, Copilot, Claude vb.) ile kod üretirken `PROMPTS.md` içindeki standart şablonlar kullanılmalı ve üretilen kod bu dokümandaki kurallara göre gözden geçirilmelidir.
