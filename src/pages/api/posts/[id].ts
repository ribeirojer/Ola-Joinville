import { NextApiRequest, NextApiResponse } from "next";
import { getPostById } from "./postsController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postId = req.query.id;
  try {
    if (req.method === "GET") {
      const post = await getPostById(postId as string);
      return res.status(200).json(post);
    } else {
      return res.status(405).json({ error: "Método não permitido" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Ocorreu um erro no servidor" });
  }
}
