import React, { useRef } from "react";
import { useContext, useState } from "react";
import { emailRegex, passwordRegex } from "../utils";
import { AuthService } from "../services/AuthService";
import { UserContext } from "./_app";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";

type Props = {};

const Cadastrar = (props: Props) => {
  const { saveUserToContext } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [errorData, setErrorData] = useState({
    firstName: false,
    lastName: false,
    email: false,
    emailRegex: false,
    password: false,
    passwordStrong: false,
    confirmPassword: false,
    confirmPasswordMatch: false,
    terms: false,
    general: false,
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setErrorData((prev) => ({
      firstName: false,
      lastName: false,
      email: false,
      emailRegex: false,
      password: false,
      passwordStrong: false,
      confirmPassword: false,
      confirmPasswordMatch: false,
      terms: false,
      general: false,
    }));

    if (!formData.firstName) {
      setErrorData((prev) => ({ ...prev, firstName: true }));
      firstNameRef.current?.focus();
      return;
    }
    if (!formData.lastName) {
      setErrorData((prev) => ({ ...prev, lastName: true }));
      lastNameRef.current?.focus();
      return;
    }
    if (!formData.email) {
      setErrorData((prev) => ({ ...prev, email: true }));
      emailRef.current?.focus();
      return;
    }
    if (!emailRegex.test(formData.email)) {
      setErrorData((prev) => ({ ...prev, emailRegex: true }));
      emailRef.current?.focus();
      return;
    }
    if (!formData.password) {
      setErrorData((prev) => ({ ...prev, password: true }));
      passwordRef.current?.focus();
      return;
    }
    if (!passwordRegex.test(formData.password)) {
      setErrorData((prev) => ({ ...prev, passwordStrong: true }));
      passwordRef.current?.focus();
      return;
    }
    setIsLoading(true);
    AuthService.register(formData)
      .then((data) => {
        saveUserToContext(data);
        setIsLoading(false);
        router.push("/");
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorData((prev) => ({
          ...prev,
          general: true,
        }));
        console.log(error);
      });
  };

  return (
    <>
      <Header></Header>
      <main className="container px-4 my-8 md:my-16 mx-auto">
        <h1 className="text-center text-4xl font-bold">Cadastrar</h1>
        <p className="text-center text-gray-500 my-4">
          Preencha os dados abaixo para se cadastrar
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col px-4 pb-4 gap-4 border border-purple-300 rounded-lg max-w-md mx-auto"
        >
          <Input
            id="first-name"
            type="text"
            label="Primeiro nome"
            error={errorData.firstName}
            placeholder="Primeiro nome"
            value={formData.firstName}
            onChange={(e: any) => {
              setFormData({ ...formData, firstName: e.target.value });
            }}
            inputRef={firstNameRef}
          />
          <Input
            id="last-name"
            type="text"
            label="Último nome"
            error={errorData.lastName}
            placeholder="Último nome"
            value={formData.lastName}
            onChange={(e: any) => {
              setFormData({ ...formData, lastName: e.target.value });
            }}
            inputRef={lastNameRef}
          />
          <Input
            id="email"
            error={errorData.email}
            type="email"
            label="E-mail"
            placeholder="E-mail"
            value={formData.email}
            onChange={(e: any) => {
              setFormData({ ...formData, email: e.target.value });
            }}
            inputRef={emailRef}
          />
          {errorData.emailRegex && (
            <p className="text-red-500 mt-1">E-mail inválido</p>
          )}
          <Input
            id="password"
            error={errorData.password}
            label="Senha"
            placeholder="Digite sua senha"
            type="password"
            value={formData.password}
            onChange={(e: any) => {
              setFormData({ ...formData, password: e.target.value });
            }}
            inputRef={passwordRef}
          />
          {errorData.passwordStrong && (
            <p className="text-red-500 mt-1">
              A senha deve conter pelo menos 8 caracteres, 1 letra maiúscula, 1
              letra minúscula e 1 número
            </p>
          )}
          <Button type="submit">Cadastrar</Button>
          {errorData.general && (
            <p className="text-red-500 mt-1 text-center my-4">
              Erro ao cadastrar. Tente novamente mais tarde.
            </p>
          )}
        </form>
        <p className="text-center text-gray-500 my-8">
          Já tem uma conta?{" "}
          <Link
            href="/entrar"
            passHref
            className="text-purple-500 underline hover:text-purple-700"
          >
            Entrar
          </Link>
        </p>
      </main>
      <Footer></Footer>
      {isLoading && <Loading></Loading>}
    </>
  );
};

export default Cadastrar;
