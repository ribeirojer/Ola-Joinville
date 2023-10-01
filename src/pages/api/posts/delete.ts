import { NextApiRequest, NextApiResponse } from "next";
import { deletePost } from "./postsController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postId = req.query.id;

  if (req.method === "DELETE") {
    await deletePost(postId as string);
    return res.status(204).end();
  } else {
    return res.status(405).json({ error: "Método não permitido" });
  }
}
