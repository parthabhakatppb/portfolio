import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { resume } from "@/data/resume";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://parthabhakatppb.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${resume.name} — Machine Learning Engineer`,
    template: `%s | ${resume.name}`,
  },
  description:
    "Portfolio of Partha Pratim Bhakat — Machine Learning Engineer, Generative AI specialist, and final-year CSE undergraduate at VIT Bhopal. Expert in deep learning, agentic LLM systems, and computer vision.",
  keywords: [
    "Machine Learning Engineer",
    "AI Engineer",
    "Deep Learning",
    "Generative AI",
    "LLM",
    "Computer Vision",
    "NLP",
    "VIT Bhopal",
    "Partha Pratim Bhakat",
  ],
  authors: [{ name: resume.name }],
  creator: resume.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: `${resume.name} Portfolio`,
    title: `${resume.name} — Machine Learning Engineer`,
    description:
      "Bridging deep learning and production-scale software. Agentic LLM systems, computer vision, generative AI.",
    images: [{ url: `${BASE_URL}/og`, width: 1200, height: 630, alt: `${resume.name} Portfolio` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${resume.name} — Machine Learning Engineer`,
    description: "Portfolio of Partha Pratim Bhakat — ML Engineer & Generative AI Specialist.",
    images: [`${BASE_URL}/og`],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: resume.name,
  jobTitle: "Machine Learning Engineer",
  description: resume.summary,
  url: BASE_URL,
  email: resume.contact.email,
  telephone: resume.contact.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: resume.location,
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: resume.education.institution,
    address: {
      "@type": "PostalAddress",
      addressLocality: resume.education.location,
    },
  },
  sameAs: [resume.contact.github.url, resume.contact.linkedin.url],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {/* Skip to content for keyboard accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* Ambient background */}
        <div className="blob-container" aria-hidden="true">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
        </div>
        <div className="grid-overlay" aria-hidden="true" />

        {children}
      </body>
    </html>
  );
}
