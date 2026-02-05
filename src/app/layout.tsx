import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/global/Nav";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Shoes Store - Premium Footwear Collection",
  description: "Discover our exclusive collection of premium shoes. Shop the latest styles, trends, and comfortable footwear for every occasion.",
  keywords: ["shoes", "footwear", "sneakers", "boots", "casual shoes", "premium shoes", "online shoe store"],
  authors: [{ name: "Shoes Store" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shoes-store.com",
    siteName: "Shoes Store",
    title: "Shoes Store - Premium Footwear Collection",
    description: "Discover our exclusive collection of premium shoes.",
    images: [
      {
        url: "https://shoes-store.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shoes Store",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shoes Store - Premium Footwear Collection",
    description: "Discover our exclusive collection of premium shoes.",
    creator: "@shoesstore",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://shoes-store.com",
  },
};

// Root layout for the application. This server component:
// - Fetches the current authenticated user via `auth()`
// - Renders the site-wide `Nav` with that user data
// - Wraps the application `children` under the HTML/body structure
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Retrieve the current user (if any) to pass into the Nav
  const user = await auth()
  return (
    <html lang="en">
      <body>
        <Nav user={user} />
        {children}
      </body>
    </html>
  );
}
