import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";

// Configurar o armazenamento para as imagens
const storage = multer.memoryStorage(); // Armazenar na memória (você pode escolher outra opção, como armazenamento em disco)
const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      // Processar o upload
      upload.single("image")(req, res, (err) => {
        if (err) {
          return res.status(400).json({ message: "Erro ao fazer upload da imagem." });
        }

        // A imagem foi carregada com sucesso
        const file = req.file; // Conteúdo da imagem
        return res.status(200).json({ message: "Upload da imagem bem-sucedido.", file });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  } else {
    return res.status(405).end();
  }
};

export default handler;
