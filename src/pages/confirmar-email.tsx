import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const ConfirmEmail = () => {
  const router = useRouter();
  const { userId, token } = router.query;
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [redirectCountdown, setRedirectCountdown] = useState(5); // Contagem regressiva em segundos

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        // Realize a chamada à sua API ou servidor para verificar o token e realizar a ação de confirmação
        const response = await fetch("/api/auth/confirm-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, token }),
        });

        // Verifique a resposta da confirmação de e-mail
        if (response.ok) {
          setIsConfirmed(true); // Confirmação bem-sucedida
        } else {
          setErrorMessage(
            "Houve um erro ao confirmar o e-mail. Verifique o link ou tente novamente."
          ); // Mensagem de erro
        }
      } catch (error) {
        setErrorMessage(
          "Houve um erro ao confirmar o e-mail. Por favor, tente novamente mais tarde."
        ); // Mensagem de erro
      } finally {
        setIsLoading(false); // Independentemente do resultado, pare de carregar
      }
    };

    // Chame a função de confirmação de e-mail quando o componente for montado
    confirmEmail();
  }, [userId, token]);

  // Redirecionar após a confirmação
  useEffect(() => {
    if (!isLoading) {
      if (isConfirmed) {
        // Redirecionar para a tela inicial após alguns segundos
        const countdownInterval = setInterval(() => {
          setRedirectCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        setTimeout(() => {
          clearInterval(countdownInterval);
          router.push("/"); // Redirecionar para a tela inicial
        }, redirectCountdown * 1000);
      } else {
        router.push("/error"); // Redirecionar para a página de erro
      }
    }
  }, [isConfirmed, isLoading, redirectCountdown]);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4">
        <div className="text-center mt-8">
          {isLoading ? (
            <Loading />
          ) : (
            <div>
              <h1 className="text-2xl font-bold mb-4">Confirmação de E-mail</h1>
              {isConfirmed ? (
                <>
                  <p className="text-green-500">
                    Seu e-mail foi confirmado com sucesso!
                  </p>
                  <p>
                    Você será redirecionado(a) para a tela inicial em{" "}
                    {redirectCountdown} segundos.
                  </p>
                </>
              ) : (
                <p className="text-red-500">{errorMessage}</p>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ConfirmEmail;
