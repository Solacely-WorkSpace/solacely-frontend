import Footer from "@/UI/Components/Footer";
import Nav from "@/UI/Components/Nav";
import Hero from "@/UI/LandingPage/Sections/Hero";

export default function RootLayout({ children }) {
  return (
    <>
      <Nav />

      {/* <Hero /> */}

      {children}

      <Footer />
    </>
  );
}
