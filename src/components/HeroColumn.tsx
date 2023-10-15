import React from "react";
import { decodeEntities, sanitizeHTML, limitarDescricao } from "../utils";
import Link from "next/link";

type Props = {
  title: string;
  imageUrl: string;
  content: string;
};

function HeroColumn({ post }: any) {
  const { title, cover_image_url, friendly_url } = post;
  //const contentFormatted = limitarDescricao(decodeEntities(sanitizeHTML(content)), 100);

  return (
    <div className="p-4 bg-white rounded shadow-lg">
      <Link href={`/noticia/${friendly_url}`} className="flex flex-col gap-4">
        <img
          src={cover_image_url || "https://placehold.co/400"}
          alt={`Imagem de ${title}`}
          className="w-full h-32 mr-4"
        />
        <h1 className="text-md font-semibold">{title}</h1>
      </Link>
    </div>
  );
}

export default HeroColumn;
