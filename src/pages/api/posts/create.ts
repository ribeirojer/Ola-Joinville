import { NextApiRequest, NextApiResponse } from "next";
import { createPost } from "./postsController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { title, content } = req.body;
    const newPost = await createPost(title, content);
    return res.status(201).json(newPost);
  } else {
    return res.status(405).json({ error: "Método não permitido" });
  }
}
