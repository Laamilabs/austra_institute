import type { Metadata } from "next";

const SITE_URL = "https://austratraininginstitute.co.ke";

export const metadata: Metadata = {
  title: "Apply for Admission in Eldoret, Kenya",
  description:
    "Apply online to Austra Training Institute in Eldoret, Kenya. Choose a course, provide your contact and education details, and receive an application number to track your admission.",
  alternates: {
    canonical: `${SITE_URL}/apply`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: `${SITE_URL}/apply`,
    siteName: "Austra Training Institute",
    title: "Apply for Admission | Austra Training Institute Eldoret",
    description:
      "Start an online course application at Austra Training Institute in Eldoret, Kenya, and get an application number to track your progress.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Apply to Austra Training Institute in Eldoret, Kenya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apply for Admission | Austra Training Institute Eldoret",
    description:
      "Start an online course application at Austra Training Institute in Eldoret, Kenya.",
    images: ["/og-image.jpg"],
  },
};

export default function ApplyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
