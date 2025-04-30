import Footer from "@/UI/Components/Footer";
import Nav from "@/UI/Components/Nav";

export default function RootLayout({ children }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}
