import { Geist, Geist_Mono } from 'next/font/google';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { CartProvider } from '@/context/CartContext';
import ThemeRegistry from '@/components/ThemeRegistry';
import Footer from '@/components/Footer';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata = {
    title: 'Geophrase Demo Store',
    description: 'A minimal Next.js storefront demonstrating Geophrase address verification.',
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
        </html>
    );
}
