import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import NavBar from "@/components/NavBar";
import { Toaster } from "react-hot-toast";
import { cn } from "@/utils/cn";
import { ImageProvider } from "@/features/project/Context/ImageFormContext";
import QueryProvider from "@/context/QueryProvider";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Babatunde Taiwo - Full-Stack Software & Electronics Engineer",
  description:
    "Versatile Software Engineer with a BSc in Electrical and Electronics Engineering, MSc in Computer Engineering, and expertise in Python, JavaScript, and C++. Proficient in both frontend and backend development and electronics systems design.",
  keywords:
    "Software Engineer, Full Stack Developer, Electronics Engineer, Machine Learning, Deep Learning, Artificial intelligence, Backend Development, Frontend Development, Python, JavaScript, C++, Electrical Engineering, Computer Engineering, IoT, Embedded Systems, Babatunde Taiwo",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <ImageProvider>
        <html lang="en">
          <body
            className={cn(
              `${inter.className} px-[1rem] md:px-[2rem] lg:px-[4rem] max-w-[1440px] min-h-[100vh] mx-auto `,
            )}
          >
            <NavBar />
            <Toaster position="top-right" />

            {children}
            <Footer />
          </body>
        </html>
      </ImageProvider>
    </QueryProvider>
  );
}
