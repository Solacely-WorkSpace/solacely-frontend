import Footer from "@/UI/Components/Footer";
import Nav from "@/UI/Components/Nav";

export default function ApartmentLayout({ children }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}
