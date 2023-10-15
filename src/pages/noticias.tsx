import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

type Props = {
  allNews: {
    id: number;
    title: string;
    tags: string[];
    friendly_url: string;
  }[];
};

type Category = {
  id: number;
  name: string;
};

const categories: Category[] = [
  { id: 1, name: "Esportes" },
  { id: 2, name: "Política" },
  { id: 3, name: "Entretenimento" },
];

export async function getStaticProps() {
  const apiUrl = `http://localhost:3000/api/posts`;

  try {
    const response = await axios.get(apiUrl);
    const allNews = response.data;

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
  const router = useRouter();
  const { category, search } = router.query;
  const [selectedCategory, setSelectedCategory] = useState(category || "");
  const [searchTerm, setSearchTerm] = useState(search || "");

  useEffect(() => {
    setSelectedCategory(category || "");
    setSearchTerm(search || "");
  }, [category, search]);

  const filteredNews = allNews.filter((news) => {
    if (selectedCategory && !news.tags.includes(selectedCategory as string)) {
      return false;
    }
    if (
      searchTerm &&
      !news.title.toLowerCase().includes(searchTerm.toString().toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <>
      <Header />
      <main className="pt-8 min-h-screen flex flex-col items-center">
        {!allNews || allNews.length === 0 ? (
          <p className="text-2xl">Nenhuma notícia encontrada.</p>
        ) : (
          <div className="mt-8 w-full max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center">
              Lista de Notícias
            </h1>
            <div className="flex justify-center items-center space-x-4 mb-4">
              <h2 className="text-xl font-bold">Filtrar por Categoria:</h2>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded p-2"
              >
                <option value="">Todas</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-center items-center space-x-4 mb-4">
              <h2 className="text-xl font-bold">Pesquisar:</h2>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded p-2 w-80"
                placeholder="Pesquisar por notícias"
              />
            </div>
            <ul className="space-y-4">
              {filteredNews.map((news: any) => (
                <li
                  key={news.id}
                  className="text-purple-700 font-semibold hover:underline text-lg"
                >
                  <Link href={`/noticia/${news.friendly_url}`}>
                    {news.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Noticias;
