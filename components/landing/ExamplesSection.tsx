const examples = [
  { type: 'URL', label: 'Web Sitesi', color: 'bg-blue-50 text-blue-700' },
  { type: 'WiFi', label: 'WiFi Bağlantısı', color: 'bg-green-50 text-green-700' },
  { type: 'vCard', label: 'Kişi Kartı', color: 'bg-purple-50 text-purple-700' },
  { type: 'WhatsApp', label: 'WhatsApp', color: 'bg-emerald-50 text-emerald-700' },
  { type: 'Email', label: 'E-posta', color: 'bg-orange-50 text-orange-700' },
  { type: 'Social', label: 'Sosyal Medya', color: 'bg-pink-50 text-pink-700' },
];

export function ExamplesSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">Her kullanım için QR kodu</h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            10&apos;dan fazla içerik tipini destekler. İstediğin her şey için QR kod oluştur.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {examples.map((ex) => (
            <div
              key={ex.type}
              className="flex flex-col items-center gap-3 p-4 rounded-xl border border-border hover:border-foreground/20 transition-colors"
            >
              <div
                className={`w-16 h-16 rounded-lg ${ex.color} flex items-center justify-center font-bold text-sm`}
              >
                {ex.type}
              </div>
              <span className="text-sm font-medium text-center">{ex.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
