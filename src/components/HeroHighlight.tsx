import React from "react";
import Link from "next/link";
import { decodeEntities, sanitizeHTML, limitarDescricao } from "../utils";

type Props = {
  title: string;
  imageUrl: string;
  content: string;
  slug: string;
};

function HeroHighlight({ title, imageUrl, content, slug }: Props) {
  const contentFormatted = limitarDescricao(decodeEntities(sanitizeHTML(content)), 100);

  return (
    <div className="bg-white p-6 rounded shadow-lg relative overflow-hidden group transition-transform transform-gpu hover:scale-105">
      <Link href={`/noticia/${slug}`}>
          <div
            className="relative h-32 mb-4"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="h-0.5 w-1/2 mx-auto bg-gradient-to-t from-transparent via-white to-white group-hover:from-white group-hover:via-transparent group-hover:to-transparent"></div>
          <h1 className="text-xl font-semibold text-center">{title}</h1>
          <p className="text-center">{contentFormatted}</p>
      </Link>
    </div>
  );
}

export default HeroHighlight;
