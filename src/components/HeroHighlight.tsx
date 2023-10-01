import React from "react";

type Props = {
  title: string;
  imageUrl: string;
  content: string;
};

function HeroHighlight({ title, imageUrl, content }: Props) {
  return (
    <div className="bg-white p-6 rounded shadow-lg">
      <img
        src={imageUrl}
        alt={`Imagem de ${title}`}
        className="w-32 h-32 mx-auto mb-4"
      />
      <h1 className="text-2xl font-semibold text-center">{title}</h1>
      <p className="text-center">{content}</p>
    </div>
  );
}

export default HeroHighlight;
