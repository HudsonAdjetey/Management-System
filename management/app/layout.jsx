// app/layout.js

import { Roboto as Robot } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import TanstackProvider from "@/lib/providers/TanstackProvider";

const fontRoboto = Robot({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  preload: true,
  variable: "--font-robot",
});

export const metadata = {
  title: "Management System",
  author: "Your Name",
  keywords: ["management system", "school"],
  image: "/favicon.png",
  description:
    "A simple, efficient, and user-friendly management system for school.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen font-roboto bg-dark-300 antialiased",
          fontRoboto.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TanstackProvider>{children}</TanstackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
