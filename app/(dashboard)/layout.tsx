import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { MobileNav } from '@/components/dashboard/MobileNav';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      <MobileNav />
      <DashboardSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
