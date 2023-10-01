import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Lógica para invalidar o token de autenticação, se aplicável
    // Retorne uma resposta de sucesso
    res.status(200).json({ message: "Logout bem-sucedido" });
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
