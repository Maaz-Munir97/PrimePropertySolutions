import Hero from "@/components/home/Hero";
import SectorMarquee from "@/components/home/SectorMarquee";
import Intro from "@/components/home/Intro";
import ServicesStack from "@/components/home/ServicesStack";
import Transformations from "@/components/home/Transformations";
import Process from "@/components/home/Process";
import GalleryStrip from "@/components/home/GalleryStrip";
import Accreditations from "@/components/home/Accreditations";
import QuoteSection from "@/components/contact/QuoteSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SectorMarquee />
      <Intro />
      <ServicesStack />
      <Transformations />
      <Process />
      <GalleryStrip />
      <Accreditations />
      <QuoteSection />
    </>
  );
}
