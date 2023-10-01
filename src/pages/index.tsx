import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-[100vh]">
        <HeroSection />
      </main>
      <Footer />
    </>
  );
}
