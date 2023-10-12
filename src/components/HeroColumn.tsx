import React from "react";
import { decodeEntities, sanitizeHTML, limitarDescricao } from "../utils";

type Props = {
  title: string;
  imageUrl: string;
  content: string;
};

function HeroColumn({ title, imageUrl, content }: Props) {
  const contentFormatted = limitarDescricao(decodeEntities(sanitizeHTML(content)), 100);
  const imageStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  
  return (
    <div className="bg-white p-6 rounded shadow-lg">
      <img
        src={imageUrl}
        alt={`Imagem de ${title}`}
        className="w-16 h-16 mr-4"
      />
      <div style={imageStyle} ></div>
      <div>
        <h1 className="text-3xl font-semibold">{title}</h1>
        <p>{contentFormatted}</p>
      </div>
    </div>
  );
}

export default HeroColumn;
