import bcrypt from "bcrypt"; // Importe a biblioteca para criptografar senhas
import jwt from "jsonwebtoken"; // Importe a biblioteca para geração de tokens JWT
import { supabase } from "../../../lib/supabase"; // Importe a configuração do Supabase

// Chave secreta para assinar tokens JWT
const JWT_SECRET = process.env.JWT_SECRET as string;

async function createUser(name: any, email: any, password: string | Buffer) {
  console.log(name, email, password);
  try {
    // Verifique se o email já está em uso
    const { data: existingUser, error: userError } = await supabase
      .from("users")
      .select("email")
      .eq("email", email);

    if (userError) {
      throw new Error(
        "Erro ao verificar o email existente: " + userError.message
      );
    }

    if (existingUser && existingUser.length > 0) {
      throw new Error("O email já está em uso");
    }

    // Criptografe a senha antes de armazená-la
    const salt = await bcrypt.genSalt(10);
    const passwordhash = await bcrypt.hash(password, salt);

    const { data, error } = await supabase
      .from("users")
      .insert([{ username: name, email, passwordhash }])
      .select();

    if (error) {
      throw new Error("Erro ao criar o usuário: " + error.message);
    }

    return data[0];
  } catch (error) {
    throw error;
  }
}

async function loginUser(email: any, password: string | Buffer) {
  try {
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (userError) {
      throw new Error("Erro ao buscar o usuário: " + userError.message);
    }

    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordhash);
    if (!passwordMatch) {
      throw new Error("Credenciais inválidas");
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return {
      user: {
        name: user.username,
        email: user.email,
        avatarURL: user.avatarURL,
        bio: user.bio,
      },
      token,
    };
  } catch (error) {
    throw error;
  }
}

export { createUser, loginUser };
