import { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "./userController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    try {
      const user = await createUser(name, email, password);
      // Lógica para gerar um token de autenticação, se aplicável

      res.status(201).json({ user, message: "Usuário registrado com sucesso" });
    } catch (error) {
      // Trate erros de registro, por exemplo, usuário já existente
      res.status(400).json({ error });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
