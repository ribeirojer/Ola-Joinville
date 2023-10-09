import { useState } from "react";
import { Cloud } from "@phosphor-icons/react";

const UploadImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log("Upload bem-sucedido:", data);
        // Limpar o estado ou realizar outra ação após o upload bem-sucedido
      } else {
        console.error("Erro no upload:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center space-x-2">
        <label htmlFor="image" className="text-gray-600">
          <Cloud size={24} /> {/* Ícone do Phosphor Icons */}
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden" // Input oculto, estilizaremos o rótulo em vez disso
        />
        <label
          htmlFor="image"
          className="cursor-pointer p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300"
        >
          Selecionar uma imagem
        </label>
        {selectedImage && (
          <button
            onClick={handleUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Upload
          </button>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
