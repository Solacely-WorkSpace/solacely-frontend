import { Roboto } from "next/font/google"
import "@/Styles/globals.css";
import Providers from "@/providers/QueryProvider";
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: "Solacely",
  description: "Home Away From Home",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-rob",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} `}>
        <Providers>
          {children}
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
