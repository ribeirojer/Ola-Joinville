import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Loading from "@/components/Loading";
import { AuthService } from "../services/AuthService";
import React, { useRef, useState } from "react";

type Props = {};

const EsqueciMinhaSenha = (props: Props) => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    general: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const closeSuccess = () => {
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setErrors((prev) => ({
      email: "",
      general: "",
    }));

    if (!email) {
      setErrors((prev) => ({
        ...prev,
        email: "Por favor digite seu email...",
      }));
      emailRef.current?.focus();
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "O campo Email não possui um formato válido.",
      }));
      emailRef.current?.focus();
      return;
    }
    setLoading(true);

    try {
      const response = await AuthService.forgotPassword(email);
      if (response.status === 200) {
        setSuccess(true);
        setEmail("");
        closeSuccess();
      } else {
        setErrors((prev) => ({
          ...prev,
          general:
            "Ocorreu um erro ao enviar o email. Tente novamente mais tarde.",
        }));
      }
    } catch (error) {
      console.error("Erro ao enviar o email de redefinição de senha:", error);
      setErrors((prev) => ({
        ...prev,
        general:
          "Ocorreu um erro ao enviar o email. Tente novamente mais tarde.",
      }));
    }
    setLoading(false);
  };

  return (
    <>
      <Header></Header>
      <main className="container px-4 mx-auto my-8 md:my-16">
        <h1 className="text-center text-3xl font-semibold mb-4">
          Esqueci Minha Senha
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Insira seu email abaixo para receber um link de redefinição de senha.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 max-w-md mx-auto"
        >
          <Input
            placeholder="Seu e-mail"
            type="text"
            id="email"
            name="email"
            inputRef={emailRef}
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit">Enviar</Button>
        </form>
        {errors.email && (
          <p className="text-center text-red-500 mt-2">{errors.email}</p>
        )}
        {errors.general && (
          <p className="text-center text-red-500 mt-2">{errors.general}</p>
        )}
        {success && (
          <p className="text-center text-green-500 mt-2">
            Verifique sua caixa de entrada!
          </p>
        )}
      </main>
      {loading && <Loading />}
      <Footer></Footer>
    </>
  );
};

export default EsqueciMinhaSenha;
