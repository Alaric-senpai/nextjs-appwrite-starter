import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


// const JetBrainsMo

export const metadata: Metadata = {
  title: "Next Appwrite Starter | Ship with confidence",
  description: "A production-minded Next.js and Appwrite starter with authentication, protected workspaces, and role-aware access.",
  authors: [{
    name: "Alaric senpai",
    url: "https://devcharles.me"
  }],
  keywords: ['nextjs-starter', 'appwrite-starter', 'auth', 'Oauth', 'dashboard', 'starter'],
  creator: "Alaric-senpai",
  robots: {
    index: true,
    follow: true
  }

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-screen min-h-screen`}
      >

          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>

             {children}
            </AuthProvider>
          </ThemeProvider>

      </body>
    </html>
  );
}
