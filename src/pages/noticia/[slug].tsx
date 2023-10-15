import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Head from "next/head";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useEffect, useState } from "react";

export async function getStaticPaths() {
  // Substitua a URL abaixo pela URL real da sua API
  const apiUrl = "http://localhost:3000/api/posts";

  try {
    const response = await axios.get(apiUrl);
    const slugs = response.data.map(
      (post: { friendly_url: string }) => post.friendly_url
    ); // Suponha que a API retorne uma lista de slugs

    return {
      paths: slugs.map((slug: any) => ({
        params: { slug },
      })),
      fallback: false, // Ou 'blocking' se preferir geração no momento da solicitação
    };
  } catch (error) {
    console.error("Erro ao buscar slugs:", error);
    return {
      paths: [],
      fallback: false,
    };
  }
}

export async function getStaticProps({ params }: any) {
  // Substitua a URL abaixo pela URL real da sua API
  const apiUrl = `http://localhost:3000/api/posts/${params.slug}`;

  try {
    const response = await axios.get(apiUrl);
    const newsData = response.data; // Suponha que a API retorne os detalhes da notícia

    return {
      props: {
        newsData,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar detalhes da notícia:", error);
    return {
      notFound: true,
    };
  }
}

export default function NewsDetail({ newsData }: any) {
  const [content, setContent] = useState({ __html: "" });

  useEffect(() => {
    const htmlContent = newsData.content;
    setContent({ __html: htmlContent });
  }, [newsData]);

  return (
    <>
      <Header></Header>
      <main className="container mx-auto min-h-screen p-4">
        <Head>
          <title>{newsData.title}</title>
        </Head>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">{newsData.title}</h1>
          <div
            className="prose text-lg"
            dangerouslySetInnerHTML={content}
          ></div>
          <hr className="my-4" />
          <p className="text-gray-600">Autor: {newsData.author}</p>
          <Link
            href="/"
            className="text-purple-500 hover:underline mt-4 inline-block"
          >
            Voltar
          </Link>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}
