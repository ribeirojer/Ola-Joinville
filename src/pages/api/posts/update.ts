import { NextApiRequest, NextApiResponse } from "next";
import { updatePost } from "./postsController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postId = req.query.id;

  if (req.method === "PUT") {
    const { title, content } = req.body;
    const updatedPost = await updatePost(postId as unknown as number, title, content );
    return res.status(200).json(updatedPost);
  } else {
    return res.status(405).json({ error: "Método não permitido" });
  }
}
