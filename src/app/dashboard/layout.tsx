import { inter } from "@/lib/fonts";
import { cn } from "@/utils/cn";
import Modal from "@/utils/Modal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - Babatunde Taiwo",
  description:
    "Administrator dashboard for managing Babatunde Taiwo's portfolio, projects, and content. Streamlined tools for updates and analytics.",
  keywords:
    "Admin Dashboard, Portfolio Management, Project Management, Content Management, Babatunde Taiwo",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={cn(inter.className, "max-w-[1440px] mx-auto ")}>
      <Modal />
      {children}
    </main>
  );
}
