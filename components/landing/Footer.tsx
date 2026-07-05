import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center sm:items-start gap-1">
          <span className="font-bold">QR Studio</span>
          <span className="text-xs text-muted-foreground">
            © 2026 QR Studio. Tüm hakları saklıdır.
          </span>
        </div>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/login" className="hover:text-foreground transition-colors">
            Giriş Yap
          </Link>
          <Link href="/register" className="hover:text-foreground transition-colors">
            Kayıt Ol
          </Link>
        </nav>
      </div>
    </footer>
  );
}
