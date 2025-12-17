import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["700", "900"], // Use heavy weights for bold look
});

export const metadata: Metadata = {
  metadataBase: new URL('https://moyaseen.com'),
  title: {
    default: "Mohammed Yaseen | Full-Stack Software Engineer",
    template: "%s | Mohammed Yaseen"
  },
  description: "Portfolio of Mohammed Yaseen, a Full-Stack Software Engineer specializing in scalable systems, AI, and design.",
  keywords: ["Mohammed Yaseen", "Mo Yaseen", "Mohammed S. Yaseen", "Software Engineer", "Full-Stack", "AI", "Design", "Portfolio", "Web Development"],
  authors: [{ name: "Mohammed Yaseen" }],
  openGraph: {
    title: "Mohammed Yaseen | Full-Stack Software Engineer",
    description: "Portfolio of Mohammed Yaseen, a Full-Stack Software Engineer specializing in scalable systems, AI, and design.",
    url: "https://moyaseen.com",
    siteName: "Mohammed Yaseen Portfolio",
    images: [
      {
        url: "/personal/moyaseen-profile-1.webp",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Yaseen | Full-Stack Software Engineer",
    description: "Portfolio of Mohammed Yaseen, a Full-Stack Software Engineer specializing in scalable systems, AI, and design.",
    images: ["/personal/moyaseen-profile-1.webp"], 
  },
  icons: {
    icon: "/favicon.avif",
    apple: "/favicon.avif",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Mohammed Yaseen",
              "url": "https://moyaseen.com",
              "image": "https://moyaseen.com/personal/moyaseen-profile-1.webp",
              "sameAs": [
                "https://github.com/mohasarc",
                "https://www.linkedin.com/in/mohasy/",
                "https://www.behance.net/myds",
                "https://www.upwork.com/freelancers/~01f49cf3f56619fe1d"
              ],
              "jobTitle": "Full-Stack Software Engineer",
              "worksFor": {
                "@type": "Organization",
                "name": "FileMap"
              },
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "Bilkent University"
              }
            })
          }}
        />
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            themes={["light", "dark", "colorful"]}
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
