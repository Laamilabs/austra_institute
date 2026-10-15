import Hero from "./components/home-hero";
import TvetCertification from "./components/tvet";
import SchoolsGrid from "./components/schools";
import PartnersSection from "./components/partners";
import CTA from "./components/cta";
import LocationSection from "./components/location";
import NewsHighlights from "./components/news-highlights";
import FeaturedCourses from "./components/featured-courses";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <Hero />
      <TvetCertification />
      <NewsHighlights />
      <SchoolsGrid />
      <FeaturedCourses />
      <CTA />
      <LocationSection />
      <PartnersSection />
    </div>
  );
}
