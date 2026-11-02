import type { Course } from "@/lib/api/course";
import type { Department } from "@/lib/api/department";
import Hero from "./components/home-hero";
import TvetCertification from "./components/tvet";
import SchoolsGrid from "./components/schools";
import PartnersSection from "./components/partners";
import CTA from "./components/cta";
import LocationSection from "./components/location";
import NewsHighlights from "./components/news-highlights";
import FeaturedCourses from "./components/featured-courses";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3300").replace(/\/$/, "");

async function getHomepageCourses(): Promise<Course[]> {
  try {
    const response = await fetch(`${API_URL}/course/featured`, { next: { revalidate: 300 } });
    return response.ok ? ((await response.json()) as Course[]) : [];
  } catch (error) {
    console.error("Unable to load homepage courses:", error);
    return [];
  }
}

async function getHomepageSchools(): Promise<Department[]> {
  try {
    const response = await fetch(`${API_URL}/departments`, { next: { revalidate: 300 } });
    if (!response.ok) return [];
    const departments = (await response.json()) as Department[];
    return departments.filter((department) => department.isActive !== false);
  } catch (error) {
    console.error("Unable to load homepage schools:", error);
    return [];
  }
}

export default async function Home() {
  const [featuredCourses, schools] = await Promise.all([
    getHomepageCourses(),
    getHomepageSchools(),
  ]);

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <Hero />
      <TvetCertification />
      <NewsHighlights />
      <SchoolsGrid initialSchools={schools} />
      <FeaturedCourses initialCourses={featuredCourses} />
      <CTA />
      <LocationSection />
      <PartnersSection />
    </div>
  );
}
