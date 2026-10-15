import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Nunito,
  Poppins,
  Rubik_Spray_Paint,
} from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import FloatingWidgets from "./components/floating-widgets"; // <-- Import added

const SITE_URL = "https://austratraininginstitute.co.ke";
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const HOMEPAGE_ID = `${SITE_URL}/#webpage`;

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const rubikSprayPaint = Rubik_Spray_Paint({
  subsets: ["latin"],
  variable: "--font-rubik-spray",
  display: "swap",
  weight: "400",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:
      "Austra Training Institute Eldoret | German, Caregiving & TVET Courses",
    template: "%s | Austra Training Institute",
  },

  description:
    "Looking for a training institute in Eldoret, Kenya? Explore German language classes, caregiving training, nursing aide, ICT, computer packages and IELTS preparation at Austra Training Institute.",

  applicationName: "Austra Training Institute",

  authors: [
    {
      name: "Austra Training Institute",
      url: SITE_URL,
    },
  ],

  creator: "Austra Training Institute",
  publisher: "Austra Training Institute",
  category: "Education",

  keywords: [
    "Austra Training Institute",
    "training institutes in Eldoret",
    "TVET institutes in Eldoret",
    "TVET colleges in Eldoret",
    "vocational training in Eldoret",
    "technical training in Eldoret",
    "colleges in Eldoret Kenya",
    "courses in Eldoret",
    "professional training in Eldoret",
    "German classes in Eldoret",
    "German language classes in Eldoret",
    "German language school in Eldoret",
    "German A1 classes in Eldoret",
    "German A2 classes in Eldoret",
    "German B1 classes in Eldoret",
    "German B2 classes in Eldoret",
    "German language training in Kenya",
    "German lessons for nurses in Kenya",
    "caregiving courses in Eldoret",
    "caregiver training in Eldoret",
    "caregiving training in Kenya",
    "caregiver certificate course in Kenya",
    "nursing aide course in Eldoret",
    "healthcare support training in Eldoret",
    "computer courses in Eldoret",
    "ICT training in Eldoret",
    "computer packages in Eldoret",
    "IELTS classes in Eldoret",
    "IELTS preparation in Kenya",
  ],

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_KE",
    url: SITE_URL,
    siteName: "Austra Training Institute",
    title:
      "Austra Training Institute Eldoret | German, Caregiving & TVET Courses",
    description:
      "Find German language classes, caregiving training, nursing aide, ICT, computer packages and IELTS preparation at Austra Training Institute in Eldoret, Kenya.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt:
          "Austra Training Institute in Eldoret, Kenya — German language, caregiving and professional training",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Austra Training Institute | German & Caregiving Courses in Eldoret",
    description:
      "Explore German language classes, caregiving training and professional courses at Austra Training Institute in Eldoret, Kenya.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/icon.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    apple: [
      {
        url: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },

  manifest: "/manifest.webmanifest",

  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": ORGANIZATION_ID,
      name: "Austra Training Institute",
      alternateName: [
        "Austra Training Institute Eldoret",
        "Austra Training Institute, Eldoret, Kenya",
      ],
      url: SITE_URL,
      description:
        "Austra Training Institute is based at Komora Center, Tulin Supermarket Building, 4th Floor, Room 415, Eldoret, Uasin Gishu County, Kenya. Its training areas include German language classes, caregiving, nursing aide, ICT, computer packages, IELTS preparation and other professional programmes. Prospective students should confirm current course availability, fees, entry requirements and certification details directly with the institute.",
      email: "info@austratraininginstitute.co.ke",
      telephone: "+254703710401",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Komora Center, Tulin Supermarket Building, 4th Floor, Room 415",
        addressLocality: "Eldoret",
        addressRegion: "Uasin Gishu County",
        addressCountry: "KE",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+254703710401",
        email: "info@austratraininginstitute.co.ke",
        contactType: "admissions and course enquiries",
        areaServed: "KE",
        availableLanguage: ["English", "Swahili"],
      },
      areaServed: [
        {
          "@type": "City",
          name: "Eldoret",
        },
        {
          "@type": "AdministrativeArea",
          name: "Uasin Gishu County",
        },
        {
          "@type": "Country",
          name: "Kenya",
        },
      ],
      knowsAbout: [
        "German language classes in Eldoret",
        "German language proficiency levels A1, A2, B1 and B2",
        "Caregiving training",
        "Caregiver skills",
        "Nursing aide training",
        "Information and communication technology",
        "Computer packages",
        "IELTS preparation",
        "Professional and vocational training",
        "Career development",
      ],
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
      image: `${SITE_URL}/og-image.jpg`,
      sameAs: [],
    },

    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: "Austra Training Institute",
      alternateName: "Austra Training Institute Eldoret",
      description:
        "The official website of Austra Training Institute in Eldoret, Kenya, providing information about German classes, caregiving training, professional courses, admissions and student enquiries.",
      publisher: {
        "@id": ORGANIZATION_ID,
      },
      inLanguage: "en-KE",
    },

    {
      "@type": "WebPage",
      "@id": HOMEPAGE_ID,
      url: SITE_URL,
      name:
        "Austra Training Institute Eldoret | German, Caregiving & TVET Courses",
      description:
        "Discover German language classes, caregiving training and other professional courses at Austra Training Institute in Eldoret, Kenya.",
      isPartOf: {
        "@id": WEBSITE_ID,
      },
      about: {
        "@id": ORGANIZATION_ID,
      },
      mainEntity: {
        "@id": ORGANIZATION_ID,
      },
      inLanguage: "en-KE",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-KE"
      className={`
        ${poppins.variable}
        ${nunito.variable}
        ${rubikSprayPaint.variable}
        ${geistSans.variable}
        ${geistMono.variable}
        font-sans
        h-full
        antialiased
        bg-zinc-50
      `}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>

      <body className={`${nunito.className} min-h-full flex flex-col relative`}>
        <Navbar />
        {children}
        <Footer />
        <FloatingWidgets /> {/* <-- Added Floating Component */}
      </body>
    </html>
  );
}