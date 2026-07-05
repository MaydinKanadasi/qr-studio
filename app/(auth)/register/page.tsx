'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError('Şifreler eşleşmiyor.');
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-bold">E-postanı doğrula</h1>
        <p className="text-muted-foreground text-sm">
          <strong>{email}</strong> adresine bir doğrulama e-postası gönderdik. Hesabını aktive etmek
          için e-postanı kontrol et.
        </p>
        <Link href="/login" className="text-sm underline">
          Giriş sayfasına dön
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Kayıt Ol</h1>
        <p className="text-muted-foreground text-sm mt-1">Yeni hesap oluştur</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            E-posta
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
            placeholder="ornek@email.com"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Şifre
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="confirm" className="text-sm font-medium">
            Şifre Tekrar
          </label>
          <input
            id="confirm"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
          />
        </div>

        {error && <p className="text-destructive text-sm">{error}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Kayıt olunuyor...' : 'Kayıt Ol'}
        </Button>
      </form>

      <p className="text-sm text-center text-muted-foreground">
        Zaten hesabın var mı?{' '}
        <Link href="/login" className="text-foreground underline">
          Giriş yap
        </Link>
      </p>
    </div>
  );
}
