import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "../styles/index.css";
import { Metadata } from "next";
import LayoutContent from "@/components/LayoutContent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://neubyte.co"),
  title: {
    template: "%s | NeuByte",
    default: "NeuByte | Future with AI",
  },
  description: "NeuByte provides cutting-edge AI and software solutions for businesses.",
  icons: {
    icon: "/images/logo/NEUNYTE11.png",
  },
  openGraph: {
    images: "/images/logo/NEUNYTE11.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
      </head>
      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
          <LayoutContent>
            {children}
          </LayoutContent>
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
