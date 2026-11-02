import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Learning Resources | Austra Training Institute",
  description:
    "Browse public learning resources and course documents from Austra Training Institute in Eldoret, Kenya.",
  alternates: { canonical: `${SITE_URL}/library` },
};

export default function LibraryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
