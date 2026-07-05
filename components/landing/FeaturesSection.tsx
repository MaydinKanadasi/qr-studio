import { Palette, Zap, Download, QrCode, Shield, Smartphone } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Canlı Önizleme',
    description: 'Her değişiklik anında QR koduna yansır, sayfa yenileme gerekmez.',
  },
  {
    icon: Palette,
    title: 'Tam Özelleştirme',
    description: 'Renk, gradient, nokta stili, köşe şekli ve logo ile tamamen senin tarzında.',
  },
  {
    icon: QrCode,
    title: '10+ İçerik Tipi',
    description: 'URL, WiFi, vCard, e-posta, telefon, WhatsApp, sosyal medya ve daha fazlası.',
  },
  {
    icon: Download,
    title: 'PNG & SVG Export',
    description: 'Yüksek kaliteli PNG veya vektörel SVG formatında indir.',
  },
  {
    icon: Shield,
    title: 'Güvenli Depolama',
    description: 'QR kodların güvenli şekilde kaydedilir, her yerden erişilebilir.',
  },
  {
    icon: Smartphone,
    title: 'Mobil Uyumlu',
    description: 'Masaüstü, tablet ve mobilde kusursuz çalışır.',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">QR kod oluşturmanın en kolay yolu</h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Profesyonel QR kodlar için ihtiyacın olan her şey tek bir yerde.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-background rounded-xl p-6 border border-border flex flex-col gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center">
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-lg">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
