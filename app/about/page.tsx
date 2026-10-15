import LocationSection from "../components/location";
import PartnersSection from "../components/partners";
import AboutHero from "./about-hero";
import Vision from "./mission";
import Philosophy from "./philosophy";
import TeamSection from "./team";

export default function About() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-50 font-sans scroll-smooth">
      {/* Hero Section */}
      <AboutHero />

      {/* Philosophy Anchor Wrapper */}
      <section id="philosophy" className="w-full scroll-mt-20">
        <Philosophy />
      </section>

      {/* Mission / Vision Anchor Wrapper */}
      <section id="mission" className="w-full scroll-mt-20">
        <Vision />
      </section>

      {/* Team Section */}
      <section id="team">
        <TeamSection />
      </section>

      {/* Location Section */}
      <div className="w-full">
        <LocationSection />
      </div>

      {/* Partners Section */}
      <div className="w-full">
        <PartnersSection />
      </div>
    </div>
  );
}