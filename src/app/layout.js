import { Roboto } from "next/font/google"
import "@/Styles/globals.css";
import Hero from "@/UI/LandingPage/Sections/Hero";

export const metadata = {
  title: "Solacely",
  description: "Home Away From Home",
};

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-rob",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} `}>
        {children}
      </body>
    </html>
  );
}
