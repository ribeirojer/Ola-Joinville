import { Request, Response } from "express";
import s3 from "../config/s3Config";

export class UploadController {
  static async saveImage(req: Request, res: Response): Promise<void> {
    const file = req.file;

    if (!file) {
      res.status(400).json({ error: "Nenhum arquivo enviado" });
      return;
    }

    const params = {
      Bucket: "YOUR_BUCKET_NAME",
      Key: file.filename,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read",
    };

    s3.createObject(
      params,
      //(error: any
      (error: any, data: any) => {
        if (error) {
          res.status(500).json({ error: "Erro ao fazer upload do arquivo" });
        } else {
          const imageUrl = data.Location;
          res.status(200).json({ imageUrl });
        }
      }
    );
  }

  static async getImage(req: Request, res: Response): Promise<void> {
    const { imageName } = req.params;

    const params = {
      Bucket: "YOUR_BUCKET_NAME",
      Key: imageName,
    };

    s3.getObject(params, (error: any, data: any) => {
      if (error) {
        res.status(500).json({ error: "Erro ao ler a imagem" });
      } else {
        res.set("Content-Type", data.ContentType);
        res.send(data.Body);
      }
    });
  }

  static async uploadImage(req: Request, res: Response): Promise<void> {
    const { imageName } = req.params;
    const file = req.file;

    if (!file) {
      res.status(400).json({ error: "Nenhum arquivo enviado" });
      return;
    }

    const params = {
      Bucket: "YOUR_BUCKET_NAME",
      Key: imageName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read",
    };

    // s3.upload(params, (error: any, data: any) => {
    s3.createBucket(params, (error: any, data: any) => {
      if (error) {
        res.status(500).json({ error: "Erro ao fazer upload do arquivo" });
      } else {
        const imageUrl = data.Location;
        res.status(200).json({ imageUrl });
      }
    });
  }

  static async deleteImage(req: Request, res: Response): Promise<void> {
    const { imageName } = req.params;

    const params = {
      Bucket: "YOUR_BUCKET_NAME",
      Key: imageName,
    };

    s3.deleteObject(params, (error: any) => {
      if (error) {
        res.status(500).json({ error: "Erro ao excluir a imagem" });
      } else {
        res.status(200).json({ message: "Imagem excluída com sucesso" });
      }
    });
  }
}
