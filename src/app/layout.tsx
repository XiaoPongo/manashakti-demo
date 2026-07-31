import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { AccessibilityProvider } from "@/components/site/accessibility-provider";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://www.manashakti.info";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Manashakti | Compassionate Psychiatric Care in Margao, Goa",
    template: "%s | Manashakti",
  },
  description:
    "Manashakti is a psychiatric clinic in Margao, Goa, led by Dr. Arpita Sirsikar. Compassionate, confidential, evidence-based mental health care for children, adults and families — anxiety, depression, OCD, addiction, stress & more.",
  keywords: [
    "Psychiatrist in Margao",
    "Psychiatrist in Goa",
    "Manashakti clinic",
    "Dr. Arpita Sirsikar",
    "mental health clinic Goa",
    "anxiety treatment",
    "depression treatment",
    "stress management",
    "OCD treatment Goa",
    "online psychiatric consultation",
    "counseling Goa",
    "psychiatrist near me",
  ],
  authors: [{ name: "Dr. Arpita Sirsikar" }],
  creator: "Manashakti",
  publisher: "Manashakti",
  applicationName: "Manashakti",
  category: "Health",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/brand/favicon.png`, type: "image/png" },
      { url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/brand/manashakti-logo.png`, type: "image/png", sizes: "1080x1080" },
    ],
    apple: [{ url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/brand/manashakti-logo.png` }],
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Manashakti",
    title: "Manashakti | Compassionate Psychiatric Care in Margao, Goa",
    description:
      "Helping you find balance, strength & peace. Compassionate psychiatric care for children, adults and families, led by Dr. Arpita Sirsikar in Margao, Goa.",
    images: [
      {
        url: "/brand/manashakti-logo.png",
        width: 1080,
        height: 1080,
        alt: "Manashakti — psychiatric clinic logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manashakti | Compassionate Psychiatric Care in Margao, Goa",
    description:
      "Confidential, evidence-based psychiatric care for children, adults and families, led by Dr. Arpita Sirsikar.",
    images: ["/brand/manashakti-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2e6f73" },
    { media: "(prefers-color-scheme: dark)", color: "#121a18" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLdMedicalClinic = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "Manashakti",
  description:
    "Compassionate, confidential and evidence-based psychiatric care in Margao, Goa led by Dr. Arpita Sirsikar.",
  url: siteUrl,
  telephone: "+91-9511725382",
  email: "drarpitasirsikar@manashakti.info",
  image: `${siteUrl}/brand/manashakti-logo.png`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Almeida's Clinic, Baboy Commerce Center, Next to Krishna Medical Stores",
    addressLocality: "Margao",
    addressRegion: "Goa",
    postalCode: "403601",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 15.2744,
    longitude: 73.9609,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  medicalSpecialty: ["Psychiatry", "MentalHealth"],
  employee: {
    "@type": "Physician",
    name: "Dr. Arpita Sirsikar",
    medicalSpecialty: "Psychiatry",
    jobTitle: "Consultant Psychiatrist",
  },
  sameAs: ["https://www.instagram.com/mana.shakti"],
};

const jsonLdPhysician = {
  "@context": "https://schema.org",
  "@type": "Physician",
  name: "Dr. Arpita Sirsikar",
  jobTitle: "Consultant Psychiatrist",
  medicalSpecialty: "Psychiatry",
  worksFor: {
    "@type": "MedicalClinic",
    name: "Manashakti",
  },
  telephone: "+91-9511725382",
  email: "drarpitasirsikar@manashakti.info",
  hospitalAffiliation: ["GMC, Goa", "IPHB, Goa", "SGDH, Goa", "Tele MANAS"],
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Almeida's Clinic, Baboy Commerce Center, Next to Krishna Medical Stores",
    addressLocality: "Margao",
    addressRegion: "Goa",
    postalCode: "403601",
    addressCountry: "IN",
  },
  knowsAbout: [
    "Anxiety Disorders",
    "Depression",
    "PTSD",
    "Psychosis",
    "OCD",
    "Dementia",
    "Addiction Psychiatry",
    "Stress Management",
  ],
};

const jsonLdFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long is a consultation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sessions typically last between 30 and 60 minutes, depending on your needs.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a referral?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No referral is needed; you can book an appointment directly with us.",
      },
    },
    {
      "@type": "Question",
      name: "Are online consultations available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, online consultations offer the same professional care and privacy as in-person visits.",
      },
    },
    {
      "@type": "Question",
      name: "Will my information remain confidential?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We follow strict confidentiality guidelines to ensure your privacy and comfort.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdMedicalClinic) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPhysician) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
        />
      </head>
      <body
        className={`${jakarta.variable} ${fraunces.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AccessibilityProvider>{children}</AccessibilityProvider>
          <Toaster />
          <SonnerToaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
