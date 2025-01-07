import { Montserrat } from "next/font/google";

import "@/app/globals.css";

import MTProvider from "@/providers/MTProvider";

export const metadata = {
  title: "Basic Funda",
  description: "One place to prepare your CAT",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  variable: "--font-montserrat",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={montserrat.className}>
        <MTProvider>{children}</MTProvider>
      </body>
    </html>
  );
}
