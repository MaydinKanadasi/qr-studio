import { redirect } from 'next/navigation';
import { getUser } from '@/lib/supabase/auth';

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) redirect('/login');

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground mt-2">Hoş geldin, {user.email}</p>
    </div>
  );
}
