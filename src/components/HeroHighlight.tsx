import React from "react";
import Link from "next/link";

type Post = {
  title: string;
  cover_image_url: string;
  friendly_url: string;
};

type Props = {
  post: Post;
};

function HeroHighlight({ post }: Props) {
  const { title, cover_image_url, friendly_url } = post;
  const imageStyle: React.CSSProperties = {
    backgroundImage: `url(${cover_image_url || "https://placehold.co/400"})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="shadow-lg rounded-lg relative overflow-hidden group transition-transform transform-gpu">
      <Link href={`/noticia/${friendly_url}`}>
        <div
          style={imageStyle}
          className="h-64 p-4 rounded-lg hover:scale-105 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
        </div>
        <h1 className="absolute bottom-4 text-white left-4 text-xl font-semibold">
          {title}
        </h1>
      </Link>
    </div>
  );
}

export default HeroHighlight;
