import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/public/HeroSection';
import StatsSection from '@/components/public/StatsSection';
import SportGrid from '@/components/sports/SportGrid';
import HowItWorks from '@/components/public/HowItWorks';
import FeaturesSection from '@/components/public/FeaturesSection';
import CTASection from '@/components/public/CTASection';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <section id="sports" style={{ padding: '5rem 1.5rem', background: 'var(--bg-app)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <SportGrid />
          </div>
        </section>
        <HowItWorks />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
