import type { Metadata } from 'next';
import { Montserrat, Anta } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

const anta = Anta({
  variable: '--font-anta',
  weight: ['400'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Szmurdom',
  description: 'Wielki turniej ofert nieruchomościowych',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='m-0 p-0'>
      <body
        className={`${montserrat.variable} ${anta.variable} font-montserrat antialiased m-0 p-0`}
      >
        {children}
      </body>
    </html>
  );
}
