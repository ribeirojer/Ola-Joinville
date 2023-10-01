import type { NextApiRequest, NextApiResponse } from "next";
import { getAllPosts } from "./postsController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const data = await getAllPosts();
      return res.status(200).json(data);
    } else {
      return res.status(405).json({ error: "Método não permitido" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Ocorreu um erro no servidor" });
  }
}
