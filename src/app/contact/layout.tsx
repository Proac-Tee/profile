import { inter } from "@/lib/fonts";
import { cn } from "@/utils/cn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Babatunde Taiwo",
  description:
    "Get in touch with Babatunde Taiwo for collaborations, inquiries, or professional opportunities in software development, telecommunications, and renewable energy.",
  keywords:
    "Contact Babatunde Taiwo, Collaborations, Professional Inquiries, Software Development, Telecommunications, Renewable Energy",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={cn(inter.className, "min-h-[100vh]")}>{children}</main>
  );
}
