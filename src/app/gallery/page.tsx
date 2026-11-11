import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CtaBanner from "@/components/ui/CtaBanner";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import Transformations from "@/components/home/Transformations";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse residential, commercial and strata projects completed by MaxOne Solutions.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Take a look at some of our projects."
        accent={[6, 7]}
        text="We pour our passion and expertise into every project we're privileged to work on. Browse our gallery to witness the depth of our commitment and the quality of our craftsmanship."
        image="/images/gallery/g7.webp"
        imageAlt="Open-plan living area with water views"
      />
      <section className="bg-bone py-20 sm:py-28">
        <div className="container-x">
          <GalleryGrid />
        </div>
      </section>
      <Transformations />
      <div className="bg-bone pt-24 sm:pt-32">
        <CtaBanner title="Like what you see? Let's talk." />
      </div>
    </>
  );
}
