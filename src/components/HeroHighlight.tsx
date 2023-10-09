import React from "react";

type Props = {
  title: string;
  imageUrl: string;
  content: string;
};

// Função para decodificar entidades HTML
function decodeEntities(texto: string): string {
  const elemento = document.createElement("div");
  elemento.innerHTML = texto;
  return elemento.textContent || "";
}

// Função para remover tags HTML e atributos perigosos
function sanitizeHTML(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}

function HeroHighlight({ title, imageUrl, content }: Props) {
  const contentSanitized = decodeEntities(sanitizeHTML(content));
	
  return (
    <div className="bg-white p-6 rounded shadow-lg">
      <img
        src={imageUrl}
        alt={`Imagem de ${title}`}
        className="w-32 h-32 mx-auto mb-4"
      />
      <h1 className="text-2xl font-semibold text-center">{title}</h1>
      <p className="text-center">{contentSanitized}</p>
    </div>
  );
}

export default HeroHighlight;
