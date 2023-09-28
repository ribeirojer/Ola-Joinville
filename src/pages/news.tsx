// pages/news.js
import Link from "next/link";
// Função para buscar todas as notícias
async function getAllNews() {
  // Substitua esta lógica por uma chamada a uma API ou busca em um banco de dados real
  return [
    { slug: "news-1", title: "Título da Notícia 1" },
    { slug: "news-2", title: "Título da Notícia 2" },
    // ...
  ];
}

export async function getStaticProps() {
  const allNews = await getAllNews();

  return {
    props: {
      allNews,
    },
  };
}

type Props = {
  allNews?: any;
};

export default function NewsList({ allNews }: Props) {
  return (
    <div>
      <h1>Lista de Notícias</h1>
      <ul>
        {allNews.map((news: any) => (
          <li key={news.slug}>
            <Link href={`/news/${news.slug}`}>
              <p>{news.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
