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

function HeroColumn({ title, imageUrl, content }: Props) {
  // Sanitize e decode o conteúdo HTML
  const contentSanitized = decodeEntities(sanitizeHTML(content));

  return (
    <div className="bg-white p-6 rounded shadow-lg">
      <img
        src={imageUrl}
        alt={`Imagem de ${title}`}
        className="w-16 h-16 mr-4"
      />
      <div>
        <h1 className="text-3xl font-semibold">{title}</h1>
        <p>{contentSanitized}</p>
      </div>
    </div>
  );
}

export default HeroColumn;
