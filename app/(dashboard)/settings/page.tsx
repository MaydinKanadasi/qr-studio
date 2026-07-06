import { getUser, signOut } from '@/lib/supabase/auth';
import { Button } from '@/components/ui/button';

export default async function SettingsPage() {
  const user = await getUser();

  return (
    <div className="max-w-2xl mx-auto pt-8 px-6 pb-16">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Ayarlar</h1>
        <p className="text-muted-foreground text-sm mt-1">Hesap bilgilerini yönet.</p>
      </div>

      <div className="border border-border rounded-xl p-6 flex flex-col gap-4">
        <div>
          <p className="text-sm text-muted-foreground">E-posta</p>
          <p className="font-medium mt-1">{user?.email}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Hesap Oluşturulma Tarihi</p>
          <p className="font-medium mt-1">
            {user?.created_at ? new Date(user.created_at).toLocaleDateString('tr-TR') : '-'}
          </p>
        </div>
      </div>

      <form action={signOut} className="mt-6">
        <Button type="submit" variant="outline">
          Çıkış Yap
        </Button>
      </form>
    </div>
  );
}
