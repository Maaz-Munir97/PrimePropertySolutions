import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import IntroProvider from "@/components/providers/IntroProvider";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { site } from "@/lib/content";
import "./globals.css";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const sans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Residential, Commercial, Strata & Insurance`,
    template: `%s · ${site.name}`,
  },
  description:
    "Over 30 years of experience across residential, commercial, strata and insurance projects across Australia. Clear communication and transparency from first consultation to final reveal.",
  // Concept redesign — keep it out of search results so it never competes with the real site.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0c0d0f",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${display.variable} ${sans.variable}`}>
      <body>
        <IntroProvider>
          <SmoothScroll>
            <Header />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        </IntroProvider>
      </body>
    </html>
  );
}
