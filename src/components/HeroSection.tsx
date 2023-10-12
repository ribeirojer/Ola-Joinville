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
  const [posts, setPosts] = useState<PostResponse[]>([]);

  useEffect(() => {
    axios
      .get<PostResponse[]>("/api/posts")
      .then((response) => {
        setPosts(response.data.slice(0, 6)); // Pegue os primeiros 2 posts para destacar
      })
      .catch((error) => {
        console.error("Erro ao buscar posts:", error);
      });
  }, []);

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {posts.slice(0, 2).map((post) => (
            <HeroHighlight
              key={post.id}
              title={post.title}
              content={post.content}
              imageUrl="https://placehold.co/400"
			  slug={post.id}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
          {posts.slice(2, 6).map((post) => (
            <HeroColumn
              key={post.id}
              title={post.title}
              imageUrl="https://placehold.co/400"
              content={post.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
