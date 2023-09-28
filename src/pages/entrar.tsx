import React, { useRef } from "react";
import { useContext, useEffect, useState } from "react";
import { AuthService } from "../services/AuthService";
import { emailRegex, passwordRegex } from "../utils";
import { UserContext } from "./_app";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";

type Props = {};

const Entrar = (props: Props) => {
  const { user, saveUserToContext } = useContext(UserContext);
  const [loginInfo, setLoginInfo] = useState({
    password: "",
    email: "",
    remember: false,
  });
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [loginError, setLoginError] = useState({
    email: false,
    password: false,
    emailRegex: false,
    passwordStrong: false,
    general: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setLoginError((prev) => ({
      email: false,
      emailRegex: false,
      password: false,
      passwordStrong: false,
      general: false,
    }));

    if (!loginInfo.email) {
      setLoginError((prev) => ({ ...prev, email: true }));
      emailRef.current?.focus();
      return;
    }
    if (!emailRegex.test(loginInfo.email)) {
      setLoginError((prev) => ({ ...prev, emailRegex: true }));
      emailRef.current?.focus();
      return;
    }
    if (!loginInfo.password) {
      setLoginError((prev) => ({ ...prev, password: true }));
      passwordRef.current?.focus();
      return;
    }
    if (!passwordRegex.test(loginInfo.password)) {
      setLoginError((prev) => ({ ...prev, passwordStrong: true }));
      passwordRef.current?.focus();
      return;
    }

    setIsLoading(true);
    AuthService.login(loginInfo)
      .then((data) => {
        saveUserToContext(data);
        setIsLoading(false);
        router.push("/");
      })
      .catch((error) => {
        setIsLoading(false);
        setLoginError((prev) => ({
          ...prev,
          general: true,
        }));

        console.log(error);
      });
  };

  useEffect(() => {
    if (user) {
      router.push("/usuario");
    }
  }, []);

  const handleGoogleLogin = () => {
    //
  };

  return (
    <>
      <Header></Header>
      <main className="container mx-auto px-4 md:px-0 my-8 md:my-16">
        <h1 className="text-4xl text-center font-bold">Entrar</h1>
        <p className="text-center text-gray-500 my-4">
          Faça login na sua conta para um checkout mais rápido.
        </p>
        {/* <div className="flex gap-4 justify-center items-center">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center gap-2 border border-purple-300 hover:bg-purple-300 rounded-md py-2 px-4"
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_59_460)">
                <path
                  d="M20.2522 10.7169C20.264 10.0466 20.1934 9.37738 20.0419 8.72363H10.7012V12.3419H16.1841C16.0802 12.9763 15.8465 13.5836 15.497 14.1272C15.1474 14.6708 14.6893 15.1396 14.1501 15.5052L14.131 15.6264L17.0846 17.8686L17.2891 17.8886C19.1682 16.1878 20.2518 13.6852 20.2518 10.7169"
                  fill="#4285F4"
                ></path>
                <path
                  d="M10.7012 20.2507C13.3874 20.2507 15.6425 19.384 17.2897 17.889L14.1502 15.5055C13.3101 16.0798 12.1826 16.4807 10.7012 16.4807C9.44313 16.4735 8.21929 16.0782 7.20334 15.3509C6.1874 14.6236 5.43095 13.6013 5.0413 12.429L4.92471 12.4387L1.85362 14.7678L1.81348 14.8772C2.6406 16.4927 3.90995 17.8508 5.4796 18.7998C7.04925 19.7487 8.85731 20.2511 10.7016 20.2507"
                  fill="#34A853"
                ></path>
                <path
                  d="M5.04097 12.4291C4.82336 11.8084 4.71107 11.157 4.70857 10.5008C4.71258 9.84561 4.82072 9.19505 5.02912 8.57251L5.02357 8.44326L1.91483 6.07666L1.81314 6.12405C1.1154 7.48166 0.751953 8.9806 0.751953 10.5007C0.751953 12.0208 1.1154 13.5197 1.81314 14.8773L5.04097 12.4291Z"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M10.7011 4.52068C12.1267 4.49899 13.5055 5.01929 14.5481 5.97241L17.356 3.28568C15.5551 1.63002 13.1702 0.721576 10.7011 0.750678C8.85685 0.750248 7.0488 1.25258 5.47915 2.2015C3.9095 3.15042 2.64013 4.50853 1.81299 6.12395L5.03011 8.57241C5.42359 7.40027 6.18255 6.37872 7.2 5.6518C8.21744 4.92487 9.44203 4.52924 10.7011 4.52068Z"
                  fill="#EB4335"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_59_460">
                  <rect
                    width="19.5"
                    height="19.5"
                    fill="white"
                    transform="translate(0.751953 0.750732)"
                  ></rect>
                </clipPath>
              </defs>
            </svg>
            <span>Entrar com o Google</span>
          </button>
        </div>
        <p className="text-center text-gray-500 my-4">
          Ou entre com seu e-mail
        </p> */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mx-auto border border-purple-300 rounded-lg px-4 pb-4 lg:max-w-[50%]"
        >
          <Input
            id="email"
            error={loginError.email}
            type="text"
            label="E-mail"
            placeholder="Digite seu e-mail"
            value={loginInfo.email}
            onChange={(e: any) => {
              setLoginInfo({ ...loginInfo, email: e.target.value });
            }}
            inputRef={emailRef}
          />
          {loginError.emailRegex && (
            <p className="text-red-500 mt-1">E-mail inválido</p>
          )}
          <Input
            id="password"
            error={loginError.password}
            label="Senha"
            placeholder="Digite sua senha"
            type="password"
            value={loginInfo.password}
            onChange={(e: any) => {
              setLoginInfo({ ...loginInfo, password: e.target.value });
            }}
            inputRef={passwordRef}
          />
          {loginError.passwordStrong && (
            <p className="text-red-500 mt-1">Digite uma senha forte</p>
          )}
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 my-4">
            <div className="checkbox_confirmacao">
              <input
                checked={loginInfo.remember}
                onChange={(e) =>
                  setLoginInfo({ ...loginInfo, remember: e.target.checked })
                }
                id="remember"
                type="checkbox"
              ></input>
              <label className="remember" htmlFor="remember">
                Lembrar de mim
              </label>
            </div>
            <Link
              href={"/esqueci-minha-senha"}
              className="text-purple-500 underline hover:text-purple-700"
            >
              Esqueceu sua senha?
            </Link>
          </div>
          <Button type="submit">Entrar</Button>
          {loginError.general && (
            <p className="text-red-500 text-center my-4">
              Houve um problema, tente novamente mais tarde.
            </p>
          )}
        </form>
        <p className="text-center text-gray-500 my-4">
          Você não tem uma conta?{" "}
          <Link
            href={"/cadastrar"}
            className="text-purple-500 underline hover:text-purple-700"
          >
            Cadastre-se
          </Link>
        </p>
      </main>
      {isLoading && <Loading></Loading>}
      <Footer></Footer>
    </>
  );
};

export default Entrar;
