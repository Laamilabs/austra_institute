import type { Metadata } from "next";
import ContactSection from "./contacts-hero";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
    title: "Contact Austra Training Institute in Eldoret",
    description:
        "Visit Austra Training Institute at Komora Centre, Eldoret. Call +254 703 710 401 or +254 720 480 750, or email info@austratraininginstitute.co.ke. Open Monday to Friday, 8:00 AM to 5:00 PM.",
    alternates: { canonical: `${SITE_URL}/contact` },
    openGraph: {
        type: "website",
        url: `${SITE_URL}/contact`,
        siteName: "Austra Training Institute",
        title: "Contact Austra Training Institute | Eldoret, Kenya",
        description:
            "Find the Austra Training Institute main campus in Eldoret or contact admissions by phone and email.",
    },
};

export default function Contact() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
            <ContactSection />
        </div>
    );
}
