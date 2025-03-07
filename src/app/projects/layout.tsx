import { inter } from "@/lib/fonts";
import { cn } from "@/utils/cn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Babatunde Taiwo - Projects Portfolio",
  description:
    "Explore the diverse projects of Babatunde Taiwo, showcasing expertise in AI, software development, electronics, and full-stack engineering. Featuring work with Python, JavaScript, C++, and cutting-edge AI technologies.",
  keywords:
    "Projects Portfolio, AI Development, Software Projects, Full Stack Engineering, Python, JavaScript, C++, Electronics Engineering, Machine Learning, Artificial Intelligence, Babatunde Taiwo",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function ProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={cn(inter.className, "min-h-[100vh]")}>{children}</main>
  );
}
