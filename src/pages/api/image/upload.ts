import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";
import s3 from "../../../config/s3Config";

// Configurar o armazenamento para as imagens
const storage = multer.memoryStorage(); // Armazenar na memória (você pode escolher outra opção, como armazenamento em disco)
const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: any, res: any) => {
  if (req.method === "POST") {
    try {
      // Processar o upload
      upload.single("image")(req, res, (err) => {
        if (err) {
          return res
            .status(400)
            .json({ message: "Erro ao fazer upload da imagem." });
        }

        // A imagem foi carregada com sucesso
        const file = req.file; // Conteúdo da imagem

        saveImage(file, res);
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

// Função para salvar a imagem no AWS S3
const saveImage = (file: any, res: NextApiResponse) => {
  if (!file) {
    return res.status(400).json({ error: "Nenhum arquivo enviado" });
  }

  const params = {
    Bucket: "YOUR_BUCKET_NAME",
    Key: file.filename,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read",
  };

  s3.putObject(params, (error: any, data: any) => {
    if (error) {
      console.error("Erro ao fazer upload do arquivo:", error);
      res.status(500).json({ error: "Erro ao fazer upload do arquivo" });
    } else {
      const imageUrl = `https://${
        params.Bucket
      }.s3.${"AWS.config.region"}.amazonaws.com/${params.Key}`;
      res.status(200).json({ imageUrl });
    }
  });
};
