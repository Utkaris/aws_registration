import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { RegistrationProvider } from '@/context/RegistrationContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Student Registration Portal | AWS Builder Center',
  description: 'Join the student builder community. Register to access AWS workshops, cloud resources, and certification challenges.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#161D28] text-[#F8FAFC]">
        <RegistrationProvider>
          {children}
        </RegistrationProvider>
      </body>
    </html>
  );
}
