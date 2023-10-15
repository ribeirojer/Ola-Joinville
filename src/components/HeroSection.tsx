import React, { useEffect, useState } from "react";
import axios from "axios";
import HeroColumn from "./HeroColumn";
import HeroHighlight from "./HeroHighlight";

type PostResponse = {
  id: number;
  title: string;
  content: string;
};

function HeroSection() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get<any[]>("/api/posts")
      .then((response) => {
        setPosts(response.data.slice(0, 6));
        setLoading(false); // Marca o carregamento como concluído após receber os dados
      })
      .catch((error) => {
        console.error("Erro ao buscar posts:", error);
        setLoading(false); // Marca o carregamento como concluído em caso de erro
      });
  }, []);

  if (loading) {
    return <div className="text-center">Carregando...</div>; // Mostra "Carregando..." enquanto os dados estão sendo buscados
  }

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {posts.slice(0, 2).map((post) => (
            <HeroHighlight key={post.id} post={post} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
          {posts.slice(2, 6).map((post) => (
            <HeroColumn key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

/*export async function getStaticProps() {
  let posts = [];
  try {
    const response = await axios.get("/api/posts");
    posts = response.data.slice(0, 6);
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
  }

  return {
    props: {
      posts,
    },
  };
}*/

export default HeroSection;
