import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Ücretsiz',
    price: '0',
    description: 'Başlamak için ideal',
    features: [
      'Sınırsız QR kod oluşturma',
      'PNG & SVG export',
      'Temel özelleştirme',
      'Logo ekleme',
    ],
    cta: 'Ücretsiz Başla',
    href: '/register',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: 'Yakında',
    description: 'Profesyoneller için',
    features: [
      "Ücretsiz'in tümü",
      'Dinamik QR kodlar',
      'Tarama analitiği',
      'Şifreli QR kodlar',
      'Toplu QR üretimi',
      'AI QR tasarımcı',
    ],
    cta: 'Çok Yakında',
    href: '#',
    highlighted: true,
  },
];

export function PricingSection() {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">Şeffaf fiyatlandırma</h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Gizli ücret yok. İstediğin zaman iptal et.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl p-8 border flex flex-col gap-6 ${
                plan.highlighted
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border bg-background'
              }`}
            >
              <div>
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  {plan.price === 'Yakında' ? (
                    <span className="text-3xl font-bold">{plan.price}</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold">₺{plan.price}</span>
                      <span
                        className={
                          plan.highlighted ? 'text-background/60' : 'text-muted-foreground'
                        }
                      >
                        /ay
                      </span>
                    </>
                  )}
                </div>
                <p
                  className={`mt-1 text-sm ${plan.highlighted ? 'text-background/70' : 'text-muted-foreground'}`}
                >
                  {plan.description}
                </p>
              </div>

              <ul className="flex flex-col gap-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                asChild
                variant={plan.highlighted ? 'secondary' : 'default'}
                className="mt-auto"
                disabled={plan.href === '#'}
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
