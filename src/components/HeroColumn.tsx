import React from "react";

type Props = {
  title: string;
  imageUrl: string;
  content: string;
};

function HeroColumn({ title, imageUrl, content }: Props) {
  return (
    <div className="bg-white p-6 rounded shadow-lg">
      <img
        src={imageUrl}
        alt={`Imagem de ${title}`}
        className="w-16 h-16 mr-4"
      />
      <div>
        <h1 className="text-3xl font-semibold">{title}</h1>
        <p>{content}</p>
      </div>
    </div>
  );
}

export default HeroColumn;
