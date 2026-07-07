import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { ExamplesSection } from '@/components/landing/ExamplesSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { FaqSection } from '@/components/landing/FaqSection';
import { Footer } from '@/components/landing/Footer';
import { Navbar } from '@/components/landing/Navbar';

const skipLinkClass =
  'sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-foreground focus:text-background focus:px-4 focus:py-2 focus:rounded-md';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className={skipLinkClass}>
        İçeriğe geç
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <ExamplesSection />
        <PricingSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
