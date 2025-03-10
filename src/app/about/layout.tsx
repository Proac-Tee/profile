import { inter } from "@/lib/fonts";
import { cn } from "@/utils/cn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Babatunde Taiwo",
  description:
    "Learn about Babatunde Taiwo, a versatile professional with expertise in telecommunications, renewable energy, and software engineering. Combining industry experience and technical knowledge to deliver innovative solutions.",
  keywords:
    "About Babatunde Taiwo, Telecommunications, Renewable Energy, Software Engineer, Professional Background, Industry Expertise, Innovative Solutions",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={cn(inter.className, "min-h-[100vh]")}>{children}</main>
  );
}
