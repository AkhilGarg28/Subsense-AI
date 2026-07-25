import { useEffect } from 'react';
import {
  Navbar,
  Hero,
  Features,
  Timeline,
  DashboardPreview,
  WhyChooseUs,
  Testimonials,
  CTA,
  Footer,
} from '../../components/landing';

/**
 * LandingPage — Full startup landing page for SubSense AI.
 * Assembles all modular sections into a unified, high-converting homepage.
 */
const LandingPage = () => {
  // Set document title for SEO
  useEffect(() => {
    document.title = 'SubSense AI — Your Autonomous Financial Copilot';
  }, []);

  return (
    <div className="min-h-screen bg-background text-text-primary selection:bg-primary/30 selection:text-white">
      {/* Sticky Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <section id="hero">
          <Hero />
        </section>

        {/* Features Section */}
        <section id="features">
          <Features />
        </section>

        {/* How It Works Section */}
        <section id="how-it-works">
          <Timeline />
        </section>

        {/* Interactive Dashboard Preview Section */}
        <section id="preview">
          <DashboardPreview />
        </section>

        {/* Why Choose Us / Comparison Section */}
        <section id="why-us">
          <WhyChooseUs />
        </section>

        {/* Testimonials Section */}
        <section id="testimonials">
          <Testimonials />
        </section>

        {/* Call To Action Section */}
        <section id="cta">
          <CTA />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
