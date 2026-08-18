import type { Metadata } from 'next';
import { Fredoka, Inter } from 'next/font/google';
import '@/styles/globals.css';
import { AuthProvider } from '@/lib/auth';
import AccessibilityToolbar from '@/components/AccessibilityToolbar';

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-body',
  display: 'swap',
});

export const viewport = {
  themeColor: '#FF6B35',
};

export const metadata: Metadata = {
  title: {
    template: '%s | STEM Play Lab',
    default: 'STEM Play Lab — Where Imagination Meets Innovation',
  },
  description:
    "Manchester's award-winning hands-on STEM learning centre for children aged 3–14. Book weekly classes, holiday camps, birthday parties, build workshops and more.",
  keywords: ['STEM', 'children', 'Manchester', 'science', 'coding', 'robotics', 'birthday party', 'holiday camp'],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'STEM Play Lab',
    title: 'STEM Play Lab — Where Imagination Meets Innovation',
    description: 'Hands-on STEM learning for children aged 3–14 in Manchester.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${fredoka.variable} ${inter.variable}`}>
      <body>
        <AuthProvider>
          <AccessibilityToolbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
