import React from "react";
import { decodeEntities, sanitizeHTML, limitarDescricao } from "../utils";
import Link from "next/link";

type Props = {
  title: string;
  imageUrl: string;
  content: string;
};

function HeroColumn( {post } : any) {
	  const { title, imageUrl, content, id } = post
  const contentFormatted = limitarDescricao(decodeEntities(sanitizeHTML(content)), 100);
  const imageStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  
  return (
    <div className="bg-white p-6 rounded shadow-lg">
	{/*<p>{JSON.stringify(post)}</p>*/}
	      <Link href={`/noticia/${id}`}>

      <img
        src={imageUrl || "https://placehold.co/400"}
        alt={`Imagem de ${title}`}
        className="w-16 h-16 mr-4"
      />
      <div style={imageStyle} ></div>
      <div>
        <h1 className="text-3xl font-semibold">{title}</h1>
        <p>{contentFormatted}</p>
      </div>
	  </Link>
    </div>
  );
}

export default HeroColumn;
