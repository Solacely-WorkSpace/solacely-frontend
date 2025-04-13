import { Caveat, Roboto, Montserrat } from "next/font/google"
import "./globals.css";

export const metadata = {
  title: "Solacely",
  description: "Home Away From Home",

};

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-cav",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-rob",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${caveat.variable} ${roboto.variable} ${montserrat.variable} `}>
        {children}
      </body>
    </html>
  );
}
