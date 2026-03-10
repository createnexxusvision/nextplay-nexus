import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/public/HeroSection';
import StatsSection from '@/components/public/StatsSection';
import HowItWorks from '@/components/public/HowItWorks';
import FeaturesSection from '@/components/public/FeaturesSection';
import NILPOCSection from '@/components/public/NILPOCSection';
import CTASection from '@/components/public/CTASection';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <HowItWorks />
        <FeaturesSection />
        <NILPOCSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
