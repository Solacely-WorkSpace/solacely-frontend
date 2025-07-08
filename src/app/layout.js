import { Roboto } from "next/font/google"
import "@/Styles/globals.css";
import Providers from "@/providers/QueryProvider";

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
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
