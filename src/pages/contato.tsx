import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import React, { FormEvent, useRef, useState } from "react";

type Props = {};

const contato = (props: Props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
    general: "",
  });
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [success, setSuccess] = useState(false);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  const data = [
    {
      id: 1,
      address: "Rua XV de Novembro, nº 000, Glória, Joinville - SC",
      email: "contato@boutiquedamoh.com",
      phone: "(47) 11111-1111",
    },
    {
      id: 2,
      address: "Rua Doutor João Colin, nº 000, Centro, Joinville - SC",
      email: "contato2@boutiquedamoh.com",
      phone: "(47) 22222-2222",
    },
  ];

  const closeSuccess = () => {
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setErrors((prev) => ({
      name: "",
      email: "",
      message: "",
      general: "",
    }));

    if (formData.name === "") {
      setErrors((prev) => ({ ...prev, name: "Por favor digite seu nome..." }));
      nameRef.current?.focus();
      return;
    }
    if (formData.name.length < 3 || formData.name.length > 50) {
      setErrors((prev) => ({
        ...prev,
        name: "O campo Nome deve ter entre 3 e 50 caracteres.",
      }));
      nameRef.current?.focus();
      return;
    }
    if (!formData.email) {
      setErrors((prev) => ({
        ...prev,
        email: "Por favor digite seu email...",
      }));
      emailRef.current?.focus();
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrors((prev) => ({
        ...prev,
        email: "O campo Email não possui um formato válido.",
      }));
      emailRef.current?.focus();
      return;
    }

    if (!formData.message) {
      setErrors((prev) => ({
        ...prev,
        message: "Por favor digite sua mensagem...",
      }));
      messageRef.current?.focus();
      return;
    }

    setLoading(true);
    setIsDisable(true);

    try {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });

      if (response.status !== 200 && response.status !== 201) {
        // Se o código de status não for 2xx (sucesso), trate o erro aqui
        console.error("Erro no servidor:", "response.data.message");
        setErrors((prev) => ({
          ...prev,
          general: "Ocorreu um erro no servidor ao enviar sua mensagem",
        }));
      } else {
        setSuccess(true);
        setFormData((prev) => ({
          name: "",
          email: "",
          message: "",
        }));
        closeSuccess();
      }
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
      setErrors((prev) => ({
        ...prev,
        general: "Ocorreu um erro ao enviar sua mensagem",
      }));
    }
    setLoading(false);
    setIsDisable(false);
  };

  const handleBlur = () => {
    setErrors((prev) => ({
      ...prev,
      name: "",
      email: "",
      message: "",
      general: "",
    }));
  };

  return (
    <>
      <Header></Header>
      <h1 className="text-3xl font-bold my-8 text-center">
        Entre em contato conosco para um estilo inesquecível!
      </h1>
      <div className="container mx-auto px-4 md:px-0 flex flex-col justify-between md:flex-row">
        <div className="w-full md:w-1/2">
          <p className="mb-4">
            Você é única, e seu estilo também deve ser! Estamos aqui para tornar
            seus sonhos de moda realidade. Seja para uma ocasião especial ou
            para renovar seu guarda-roupa, nossa boutique de roupas está pronta
            para te ajudar a brilhar.
          </p>
          {data.map((item) => (
            <div key={item.id} className="flex flex-col mb-3">
              <h5 className="font-semibold mb-3">Loja {item.id}</h5>
              <p className="flex gap-2 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 14c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2z"></path>
                  <path d="M11.42 21.814a.998.998 0 0 0 1.16 0C12.884 21.599 20.029 16.44 20 10c0-4.411-3.589-8-8-8S4 5.589 4 9.995c-.029 6.445 7.116 11.604 7.42 11.819zM12 4c3.309 0 6 2.691 6 6.005.021 4.438-4.388 8.423-6 9.73-1.611-1.308-6.021-5.294-6-9.735 0-3.309 2.691-6 6-6z"></path>
                </svg>
                <span>{item.address}</span>
              </p>
              <p className="flex gap-2 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10c1.466 0 2.961-.371 4.442-1.104l-.885-1.793C14.353 19.698 13.156 20 12 20c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8v1c0 .692-.313 2-1.5 2-1.396 0-1.494-1.819-1.5-2V8h-2v.025A4.954 4.954 0 0 0 12 7c-2.757 0-5 2.243-5 5s2.243 5 5 5c1.45 0 2.748-.631 3.662-1.621.524.89 1.408 1.621 2.838 1.621 2.273 0 3.5-2.061 3.5-4v-1c0-5.514-4.486-10-10-10zm0 13c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3z"></path>
                </svg>
                <span>{item.email}</span>
              </p>
              <p className="flex gap-2 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.707 12.293a.999.999 0 0 0-1.414 0l-1.594 1.594c-.739-.22-2.118-.72-2.992-1.594s-1.374-2.253-1.594-2.992l1.594-1.594a.999.999 0 0 0 0-1.414l-4-4a.999.999 0 0 0-1.414 0L3.581 5.005c-.38.38-.594.902-.586 1.435.023 1.424.4 6.37 4.298 10.268s8.844 4.274 10.269 4.298h.028c.528 0 1.027-.208 1.405-.586l2.712-2.712a.999.999 0 0 0 0-1.414l-4-4.001zm-.127 6.712c-1.248-.021-5.518-.356-8.873-3.712-3.366-3.366-3.692-7.651-3.712-8.874L7 4.414 9.586 7 8.293 8.293a1 1 0 0 0-.272.912c.024.115.611 2.842 2.271 4.502s4.387 2.247 4.502 2.271a.991.991 0 0 0 .912-.271L17 14.414 19.586 17l-2.006 2.005z"></path>
                </svg>
                <span>{item.phone}</span>
              </p>
            </div>
          ))}
        </div>
        <form
          className="flex flex-col mt-8 md:mt-0 gap-4 w-full md:w-2/5"
          name="sentMessage"
          id="contactForm"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <input
              id="name"
              type="text"
              className="text-body-color border-[f0f0f0] focus:border-primary w-full rounded border py-3 px-[14px] text-base outline-none focus-visible:shadow-none focus:ring-2 focus:ring-[#ec4899aa]"
              placeholder="Seu nome"
              value={formData.name}
              ref={nameRef}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div className="flex flex-col">
            <input
              id="email"
              type="text"
              className="text-body-color border-[f0f0f0] focus:border-primary w-full rounded border py-3 px-[14px] text-base outline-none focus-visible:shadow-none focus:ring-2 focus:ring-[#ec4899aa]"
              placeholder="Seu melhor e-mail"
              value={formData.email}
              ref={emailRef}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-red-500 mt-1">{errors.email}</p>
            )}
          </div>
          <div className="flex flex-col">
            <textarea
              id="message"
              className="text-body-color border-[f0f0f0] focus:border-primary w-full rounded border py-3 px-[14px] text-base outline-none focus-visible:shadow-none focus:ring-2 focus:ring-[#ec4899aa]"
              rows={6}
              placeholder="Digite sua mensagem aqui"
              value={formData.message}
              ref={messageRef}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            ></textarea>
            {errors.message && (
              <p className="text-red-500 mt-1">{errors.message}</p>
            )}
          </div>
          <Button
            className="btn btn-primary py-2 px-4"
            type="submit"
            id="sendMessageButton"
            disabled={isDisable}
          >
            Enviar mensagem
          </Button>
          {errors.general && (
            <p className="text-red-500 mt-1 text-center">{errors.general}</p>
          )}
          {success && (
            <p className="text-green-500 mt-1 text-center">Mensagem enviada!</p>
          )}
        </form>
      </div>
      <Footer></Footer>
      {loading && <Loading />}
    </>
  );
};

export default contato;
