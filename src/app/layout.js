import { Roboto } from "next/font/google"
import Script from "next/script";
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6WQ6YX9LD2"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-6WQ6YX9LD2');
            `
          }}
        />
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "rcpdzwly5r");
            `
          }}
        />
        <Providers>
          {children}
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
