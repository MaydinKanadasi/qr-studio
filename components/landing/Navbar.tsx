export function Navbar() {
  return (
    <header className="border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <span className="font-bold text-xl">QR Studio</span>
        <nav className="flex items-center gap-4">
          <a href="/login" className="text-sm text-muted-foreground hover:text-foreground">
            Giriş Yap
          </a>
          <a
            href="/register"
            className="text-sm bg-foreground text-background px-4 py-2 rounded-md hover:opacity-90"
          >
            Ücretsiz Başla
          </a>
        </nav>
      </div>
    </header>
  );
}
