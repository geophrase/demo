import { Geist, Geist_Mono } from 'next/font/google';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { CartProvider } from '@/context/CartContext';
import ThemeRegistry from '@/components/ThemeRegistry';
import Footer from '@/components/Footer';
import { GoogleAnalytics } from '@next/third-parties/google'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata = {
    metadataBase: new URL('https://demo.geophrase.com'),
    title: 'Geophrase Demo Store',
    description: 'A minimal Next.js storefront demonstrating Geophrase address collection.',
    icons: {
        icon: '/favicon.svg',
        apple: '/apple-icon.png',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
            <body>
                <InitColorSchemeScript attribute="data" defaultMode="system" />
                <AppRouterCacheProvider>
                    <ThemeRegistry>
                        <CartProvider>
                            {children}
                            <Footer />
                        </CartProvider>
                    </ThemeRegistry>
                </AppRouterCacheProvider>
            </body>
            <GoogleAnalytics gaId="G-P1K735FXE0" />
        </html>
    );
}
