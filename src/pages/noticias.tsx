import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

type Props = {};

const Noticias = (props: Props) => {
  return (
    <>
      <Header />
      <main className="min-h-[100vh]">
        <div>Noticias</div>
      </main>
      <Footer />
    </>
  );
};

export default Noticias;
