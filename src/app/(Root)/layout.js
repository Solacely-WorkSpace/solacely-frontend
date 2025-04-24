import Footer from "@/Components/Footer";
import Nav from "@/Components/Nav";

export default function RootLayout({ children }) {
  return (
    <>
      <Nav />

      {children}

      <Footer />
    </>
  );
}
