import { NextApiRequest, NextApiResponse } from "next";
import { loginUser } from "./userController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      // Verifique as credenciais e, se válido, gere um token de autenticação
      const { user, token } = await loginUser(email, password);
      // Retorne o token ou outra resposta de sucesso
      res.status(200).json({ user, token });
    } catch (error) {
      // Trate erros de login, por exemplo, credenciais inválidas
      res.status(401).json({ error: "Credenciais inválidas" });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
