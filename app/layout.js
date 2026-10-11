// =====================================================================
// LAYOUT GLOBAL (serveur) : polices, SEO, données structurées,
// barre de navigation et footer présents sur toutes les pages.
// =====================================================================
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation/navigation";
import Footer from "@/components/Footer/footer";
import { siteConfig } from "@/lib/siteConfig";

// Police des titres : élégante, féminine (serif)
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

// Police du texte : moderne et lisible
const sans = Jost({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// ---------- SEO ----------
export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Coiffure & maquillage à ${siteConfig.city}`,
    template: `%s | ${siteConfig.name} ${siteConfig.city}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  icons: {
    icon: "/LogoHair.ico",
    shortcut: "/LogoHair.ico",
    apple: "/LogoHair.png",
  },
  openGraph: {
    type: "website",
    locale: "fr_CI",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Coiffure & maquillage à ${siteConfig.city}`,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Coiffure & maquillage à ${siteConfig.city}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#140907",
};

// ---------- Données structurées Google (salon local) ----------
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  image: `${siteConfig.url}${siteConfig.ogImage}`,
  logo: `${siteConfig.url}${siteConfig.logoPng}`,
  telephone: siteConfig.phoneDisplay,
  email: siteConfig.email,
  priceRange: "FCFA",
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.city,
    addressCountry: siteConfig.country,
  },
  sameAs: siteConfig.socials.map((s) => s.href),
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
