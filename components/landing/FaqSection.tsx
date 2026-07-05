const faqs = [
  {
    q: 'QR Studio ücretsiz mi?',
    a: 'Evet, temel özellikler tamamen ücretsiz. Sınırsız QR kod oluşturabilir, PNG ve SVG olarak indirebilirsin.',
  },
  {
    q: 'Oluşturduğum QR kodlar ne kadar süre geçerli?',
    a: 'Statik QR kodlar sonsuza kadar çalışır. İçerikleri değiştirilemez ama her zaman taranabilir.',
  },
  {
    q: 'Logo ekleyebilir miyim?',
    a: 'Evet! PNG veya SVG formatında logo yükleyebilir, boyutunu ayarlayabilirsin.',
  },
  {
    q: 'Hangi formatlarda indirebilirim?',
    a: 'PNG ve SVG destekleniyor. PDF desteği yakında eklenecek.',
  },
  {
    q: 'QR kodlarım güvende mi?',
    a: 'Evet. Supabase altyapısı ve Row Level Security ile verilerine yalnızca sen erişebilirsin.',
  },
];

export function FaqSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">Sık sorulan sorular</h2>
        </div>

        <div className="flex flex-col divide-y divide-border">
          {faqs.map((faq) => (
            <div key={faq.q} className="py-6">
              <h3 className="font-semibold text-base">{faq.q}</h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
