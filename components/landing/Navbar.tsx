import Link from 'next/link';

export function Navbar() {
  return (
    <header className="border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          QR Studio
        </Link>
        <nav className="flex items-center gap-4" aria-label="Ana navigasyon">
          <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">
            Giriş Yap
          </Link>
          <Link
            href="/register"
            className="text-sm bg-foreground text-background px-4 py-2 rounded-md hover:opacity-90"
          >
            Ücretsiz Başla
          </Link>
        </nav>
      </div>
    </header>
  );
}
