import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Box } from '@mui/material';
import ThemeRegistry from '@/theme/ThemeRegistry';
import { Navbar, Footer } from '@/components';
import { siteContent } from '@/content/site';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: siteContent.meta.title,
  description: siteContent.meta.description,
  metadataBase: new URL(siteContent.meta.siteUrl),
  openGraph: {
    title: siteContent.meta.title,
    description: siteContent.meta.description,
    url: siteContent.meta.siteUrl,
    siteName: 'Luis David Mag',
    images: [
      {
        url: siteContent.meta.ogImage,
        width: 1200,
        height: 630,
        alt: 'Luis David Mag - Data Engineer & AI Specialist',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteContent.meta.title,
    description: siteContent.meta.description,
    images: [siteContent.meta.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body style={{ margin: 0 }}>
        <ThemeRegistry>
          <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1 }}>
              {children}
            </Box>
            <Footer />
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
