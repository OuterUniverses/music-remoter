import type {Metadata, Viewport} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {Providers} from "@/app/providers";

const inter = Inter({subsets: ["latin"]});

export const viewport: Viewport = {
    themeColor: '#1db954'
}

export const metadata: Metadata = {
    title: "音乐遥控器",
    description: "远程控制Spotify客户端",
    icons: {
        icon: '/favicon/favicon-16x16.png',
        shortcut: '/favicon/favicon.ico',
        apple: '/favicon/apple-touch-icon.png',
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${inter.className} min-h-screen bg-spotify-900`}>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}
