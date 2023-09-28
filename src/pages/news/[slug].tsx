// pages/news/[slug].js

// Função para buscar todos os slugs (identificadores) de notícias
async function getAllNewsSlugs() {
  // Substitua esta lógica por uma chamada a uma API ou busca em um banco de dados real
  return ["news-1", "news-2", "news-3"];
}

// Função para buscar os detalhes de uma notícia com base em seu slug
async function getNewsBySlug(slug: any) {
  // Substitua esta lógica por uma chamada a uma API ou busca em um banco de dados real
  const newsData = {
    slug,
    title: "Título da Notícia",
    content: "Conteúdo da Notícia",
  };
  return newsData;
}

export async function getStaticPaths() {
  const paths = await getAllNewsSlugs();

  return {
    paths: paths.map((slug) => ({
      params: { slug },
    })),
    fallback: false, // Ou 'blocking' se preferir geração no momento da solicitação
  };
}

export async function getStaticProps({ params }: any) {
  const newsData = await getNewsBySlug(params.slug);

  return {
    props: {
      newsData,
    },
  };
}

export default function NewsDetail({ newsData }: any) {
  return (
    <div>
      <h1>{newsData.title}</h1>
      <p>{newsData.content}</p>
    </div>
  );
}
