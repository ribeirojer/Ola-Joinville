import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import Link from "next/link";
import axios from "axios"; // Certifique-se de ter axios instalado

type Props = {
  allNews: {id: any, title: string}[];
};

export async function getStaticProps() {
  const apiUrl = `http://localhost:3000/api/posts`;

  try {
    const response = await axios.get(apiUrl);
    const allNews = response.data; // Suponha que a API retorne os detalhes das notícias

    return {
      props: {
        allNews,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar detalhes das notícias:", error);
    return {
      notFound: true,
    };
  }
}

const Noticias = ({ allNews }: Props) => {
	if(!allNews)return <p>aguarde...</p>
  return (
    <>
      <Header />
      <main className="min-h-[100vh]">
        <h1>Lista de Notícias</h1>
        <ul>
          {allNews.map((news: any) => (
            <li key={news.id}>
              <Link href={`/noticia/${news.id}`}>
                <p>{news.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
};

export default Noticias;
