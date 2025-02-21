import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { GlobalStateProvider } from "@/context/global.context";
import { Analytics } from "@vercel/analytics/react";

const poppins = Poppins({
   subsets: ["latin"],
   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
   variable: "--fontpoppins",
});

export const metadata: Metadata = {
   title: "Typescript Only",
   description: "Best Typescript Only Compiler , supports only typescript",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en" suppressHydrationWarning>
         <body className={`${poppins.variable} font-poppins antialiased`}>
            <ThemeProvider
               attribute="class"
               defaultTheme="dark"
               enableSystem
               disableTransitionOnChange
            >
               <Header />
               <GlobalStateProvider>
                  {children} <Analytics />
               </GlobalStateProvider>
            </ThemeProvider>
         </body>
      </html>
   );
}
