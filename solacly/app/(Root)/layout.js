import Footer from "@/Components/Footer";
import Nav from "@/Components/Nav";
export default function RootLayout({ children }) {
    return (
      <main>
        <Nav />
        {children}
        <Footer />
      </main>
    );
  }
  