import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import useAnalytics from "../hooks/useAnalytics";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  useAnalytics(router.pathname);

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
