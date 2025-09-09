import { Roboto } from "next/font/google"
import "@/Styles/globals.css";
import Providers from "@/providers/QueryProvider";
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: "Solacely",
  description: "Find verified rentals, pay in smaller, flexible installments, and enjoy secure, transparent transactions. Earn while you rent and use it to pay towards your next rent. Solacely makes renting smarter and safer.",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-rob",
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial']
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
