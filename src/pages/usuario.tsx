import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "./_app";
import { useRouter } from "next/router";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import { AuthService } from "@/services/AuthService";

type Props = {};

const Usuario = (props: Props) => {
  const { user, saveUserToContext, removeUserFromContext } =
    useContext(UserContext);
  const [isEditDataUser, setIsEditDataUser] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState(user);
  const [erroruserData, setErrorUserData] = useState({
    firstName: false,
    lastName: false,
    email: false,
    zipCode: false,
    logradouro: false,
    numberAddress: false,
    complemento: false,
    bairro: false,
    city: false,
    state: false,
    tel: false,
    general: false,
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const userDataRefFirstName = useRef<HTMLInputElement | null>(null);
  const userDataRefLastName = useRef<HTMLInputElement | null>(null);
  const userDataRefEmail = useRef<HTMLInputElement | null>(null);
  const userDataRefZipCode = useRef<HTMLInputElement | null>(null);
  const userDataRefLogradouro = useRef<HTMLInputElement | null>(null);
  const userDataRefNumberAddress = useRef<HTMLInputElement | null>(null);
  const userDataRefComplemento = useRef<HTMLInputElement | null>(null);
  const userDataRefBairro = useRef<HTMLInputElement | null>(null);
  const userDataRefCity = useRef<HTMLInputElement | null>(null);
  const userDataRefState = useRef<HTMLInputElement | null>(null);
  const userDataRefTel = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
  const userDataRefs = {
    firstName: userDataRefFirstName,
    lastName: userDataRefLastName,
    email: userDataRefEmail,
    zipCode: userDataRefZipCode,
    logradouro: userDataRefLogradouro,
    numberAddress: userDataRefNumberAddress,
    complemento: userDataRefComplemento,
    bairro: userDataRefBairro,
    city: userDataRefCity,
    state: userDataRefState,
    tel: userDataRefTel,
  };

  useEffect(() => {
    if (user === undefined || user === null || user.length === 0) {
      router.push("/entrar");
    }
  }, []);

  async function handleSubmitCep(event: any) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://brasilapi.com.br/api/cep/v1/${event.target.value}`
      );
      const data = await response.json();
      setUserData({
        ...userData,
        zipCode: data.cep,
        logradouro: data.street,
        bairro: data.neighborhood,
        city: data.city,
        state: data.state,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    removeUserFromContext();
    router.push("/");
  };

  const handleDeleteUser = () => {
    setIsLoading(true);
    AuthService.delete(user.id)
      .then((res) => {
        setIsLoading(false);
        if (res.status === 200) {
          handleLogout();
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const handleSaveChanges = (e: any) => {
    e.preventDefault();
    setErrorUserData((prev) => ({
      firstName: false,
      lastName: false,
      email: false,
      zipCode: false,
      logradouro: false,
      numberAddress: false,
      complemento: false,
      bairro: false,
      city: false,
      state: false,
      tel: false,
      general: false,
    }));

    if (
      userData.firstName === "" ||
      userData.firstName === undefined ||
      userData.firstName === null
    ) {
      setErrorUserData((prev) => ({
        ...prev,
        firstName: true,
      }));
      userDataRefFirstName.current?.focus();
      return;
    }
    if (
      userData.lastName === "" ||
      userData.lastName === undefined ||
      userData.lastName === null
    ) {
      setErrorUserData((prev) => ({
        ...prev,
        lastName: true,
      }));
      userDataRefLastName.current?.focus();
      return;
    }
    if (
      userData.tel === "" ||
      userData.tel === undefined ||
      userData.tel === null
    ) {
      setErrorUserData((prev) => ({
        ...prev,
        tel: true,
      }));
      userDataRefTel.current?.focus();
      return;
    }
    if (
      userData.zipCode === "" ||
      userData.zipCode === undefined ||
      userData.zipCode === null
    ) {
      setErrorUserData((prev) => ({
        ...prev,
        zipCode: true,
      }));
      userDataRefZipCode.current?.focus();
      return;
    }
    if (
      userData.logradouro === "" ||
      userData.logradouro === undefined ||
      userData.logradouro === null
    ) {
      setErrorUserData((prev) => ({
        ...prev,
        logradouro: true,
      }));
      userDataRefLogradouro.current?.focus();
      return;
    }
    if (
      userData.numberAddress === "" ||
      userData.numberAddress === undefined ||
      userData.numberAddress === null
    ) {
      setErrorUserData((prev) => ({
        ...prev,
        numberAddress: true,
      }));
      userDataRefNumberAddress.current?.focus();
      return;
    }
    if (
      userData.complemento === "" ||
      userData.complemento === undefined ||
      userData.complemento === null
    ) {
      setErrorUserData((prev) => ({
        ...prev,
        complemento: true,
      }));
      userDataRefComplemento.current?.focus();
      return;
    }
    if (
      userData.bairro === "" ||
      userData.bairro === undefined ||
      userData.bairro === null
    ) {
      setErrorUserData((prev) => ({
        ...prev,
        bairro: true,
      }));
      userDataRefBairro.current?.focus();
      return;
    }
    if (
      userData.city === "" ||
      userData.city === undefined ||
      userData.city === null
    ) {
      setErrorUserData((prev) => ({
        ...prev,
        city: true,
      }));
      userDataRefCity.current?.focus();
      return;
    }
    if (
      userData.state === "" ||
      userData.state === undefined ||
      userData.state === null
    ) {
      setErrorUserData((prev) => ({
        ...prev,
        state: true,
      }));
      userDataRefState.current?.focus();
      return;
    }

    setIsLoading(true);
    AuthService.update(userData)
      .then((data) => {
        saveUserToContext(data);
        setIsLoading(false);
        setSuccess(true);
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorUserData((prev) => ({
          ...prev,
          general: true,
        }));
        console.log(error);
      });
  };

  console.log(userData);
  return (
    <>
      <Header></Header>
      {user ? (
        <main className="container px-4 mx-auto my-8 md:my-16">
          {/*<InputsCheckout
            title={"Seus dados"}
            info={userData}
            setInfo={setUserData}
            errorInfo={erroruserData}
            refsInfo={userDataRefs}
            errorEmailRegex={false}
            handleSubmitCep={handleSubmitCep}
          ></InputsCheckout>*/}
          <div className="checkbox_confirmacao mt-4 flex items-center">
            <input
              id="edit-password"
              type="checkbox"
              checked={isEditPassword}
              onChange={(e: any) => setIsEditPassword(e.target.checked)}
            />
            <label htmlFor="edit-password">Alterar senha?</label>
          </div>
          {isEditPassword && (
            <>
              <div className="flex w-full flex-col md:flex-row gap-4">
                <Input
                  id="password"
                  label="Senha"
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                  error={errorPassword}
                  inputRef={passwordRef}
                />
                <Input
                  id="confirmpassword"
                  label="Confirme a senha"
                  type="password"
                  placeholder="Confirme sua senha"
                  value={confirmPassword}
                  onChange={(e: any) => setConfirmPassword(e.target.value)}
                  error={errorConfirmPassword}
                  inputRef={confirmPasswordRef}
                />
              </div>
              {confirmPassword !== password && (
                <p className="text-red-500 mt-2">As senhas não conferem</p>
              )}
            </>
          )}
          <form onSubmit={handleSaveChanges} className="mb-20 mt-4">
            <section className="flex gap-4">
              {isEditDataUser && (
                <>
                  <Button variant="success" type="submit">
                    Salvar alterações
                  </Button>
                  <Button onClick={() => setIsEditDataUser(false)}>
                    Cancelar
                  </Button>
                </>
              )}
              {!isEditDataUser && (
                <Button onClick={() => setIsEditDataUser(true)}>Editar</Button>
              )}
              <Button variant="danger" onClick={handleLogout}>
                Sair
              </Button>
            </section>
            {erroruserData.general && (
              <p className="text-red-500 mt-2">
                Alterações não salvas, tente novamente.
              </p>
            )}
            {success && (
              <p className="text-green-500 mt-2">
                Alteraçães salvas com sucesso!
              </p>
            )}
          </form>
          <div className="border border-pink-300 rounded-lg p-2 px-4 my-4">
            <p>
              Permissões:{" "}
              {userData.permissions
                ? userData.permissions.join(",")
                : "Usuário"}
            </p>
          </div>
          <div className="border border-pink-300 rounded-lg p-2 px-4 my-4">
            <p className="font-semibold">Produtos favoritos: </p>
            {userData.favoriteProducts}
          </div>
          <p>Usuário desde de {userData.createdAt}</p>
          <Button variant="danger" onClick={() => setIsShowModal(true)}>
            Deletar minha conta
          </Button>
        </main>
      ) : (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
          <svg
            className="animate-spin h-12 w-12"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-50 text-white"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="text-pink-500 opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7."
            ></path>
          </svg>
        </div>
      )}
      {isShowModal &&
        {
          /*<Modal
          closeModal={setIsShowModal}
          functionToExecute={handleDeleteUser}
          title="Deletar"
          description="Tem certeza que deseja deletar sua conta?"
        ></Modal>*/
        }}
      {isLoading && <Loading></Loading>}
      <Footer></Footer>
    </>
  );
};

export default Usuario;
