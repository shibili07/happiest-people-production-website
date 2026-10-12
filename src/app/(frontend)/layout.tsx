import type { Metadata } from "next";
import { Albert_Sans, Figtree, Manrope } from "next/font/google";
import "intl-tel-input/build/css/intlTelInput.css";
import "@/styles/globals.css";
import "@/styles/main.css";
import { getSite } from "@/lib/cms";
import { isPreview } from "@/lib/cms/preview";
import { LivePreviewListener, PreviewBanner } from "@/components/PreviewTools";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal"],
});

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal"],
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: {
      default: site.siteName,
      template: `%s | ${site.siteName}`,
    },
    description: site.defaultDescription,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const preview = await isPreview();

  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${figtree.variable} ${albertSans.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        {preview && (
          <>
            <LivePreviewListener />
            <PreviewBanner />
          </>
        )}
      </body>
    </html>
  );
}
