import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
        <span className="text-sm font-medium bg-muted px-3 py-1 rounded-full">
          🎉 Ücretsiz başla, kredi kartı gerekmez
        </span>

        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-tight">
          Saniyeler içinde{' '}
          <span className="underline decoration-4 underline-offset-4">özel QR kodlar</span> oluştur
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl">
          URL, WiFi, vCard, sosyal medya ve daha fazlası için — canlı önizleme ile tasarla, PNG veya
          SVG olarak indir.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <Button asChild size="lg">
            <Link href="/register">Ücretsiz Başla</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/login">Giriş Yap</Link>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">Zaten 1.000+ kullanıcı QR Studio kullanıyor</p>
      </div>
    </section>
  );
}
