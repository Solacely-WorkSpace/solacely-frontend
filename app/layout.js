
import "./globals.css";



export const metadata = {
  title: "Solacely",
  description: "Home Away From Home",
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body>
        
        {children}
        
      </body>
    </html>
  );
}
