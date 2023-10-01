import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "./_app";
import { useRouter } from "next/router";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import { AuthService } from "@/services/AuthService";
import { FloppyDisk, Pencil } from "@phosphor-icons/react";

type Props = {};

const Usuario = (props: Props) => {
  const { user, saveUserToContext, removeUserFromContext } =
    useContext(UserContext);
  const [isEditDataUser, setIsEditDataUser] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false); // Novo estado para controle de edição da foto
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState(user);
  const [errorUserData, setErrorUserData] = useState({
    name: false,
    email: false,
    avatarURL: false,
    bio: false,
    general: false,
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const avatarURLRef = useRef<HTMLInputElement | null>(null);
  const bioRef = useRef<HTMLTextAreaElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (user === undefined || user === null || user.length === 0) {
      router.push("/entrar");
    }
  }, []);

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
      name: false,
      email: false,
      avatarURL: false,
      bio: false,
      general: false,
    }));

    if (
      userData.name === "" ||
      userData.name === undefined ||
      userData.name === null
    ) {
      setErrorUserData((prev) => ({
        ...prev,
        name: true,
      }));
      nameRef.current?.focus();
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

  const handleEditAvatar = () => {
    setIsEditingAvatar(true);
  };

  function handleSaveAvatar(newAvatarURL: string) {
    setIsEditingAvatar(false);
    setUserData({ ...userData, avatarURL: newAvatarURL });
  }

  console.log(userData);
  return (
    <>
      <Header></Header>
      {user ? (
        <main className="container px-4 mx-auto my-8 md:my-16">
          <div className="relative w-20 h-20 mx-auto">
            <img
              src={userData.avatarURL || "https://placehold.co/400"}
              alt="Avatar"
              className="rounded-full border border-purple-700"
            />
            {isEditingAvatar ? (
              <span
                className="profile-avatar-edit-button"
                onClick={() => handleSaveAvatar(userData.avatarURL)}
              >
                <FloppyDisk size={32} />
              </span>
            ) : (
              <span
                className="profile-avatar-edit-button"
                onClick={handleEditAvatar}
              >
                <Pencil size={32} />
              </span>
            )}
          </div>

          {isEditingAvatar && (
            <Input
              id="avatarURL"
              label="URL do Avatar"
              type="text"
              placeholder="URL do avatar"
              value={userData.avatarURL}
              onChange={(e: any) =>
                setUserData({ ...userData, avatarURL: e.target.value })
              }
              error={errorUserData.avatarURL}
              inputRef={avatarURLRef}
            />
          )}
          <div className="flex w-full flex-col md:flex-row gap-4">
            <Input
              id="name"
              label="Nome"
              type="text"
              placeholder="Seu nome"
              value={userData.name}
              onChange={(e: any) =>
                setUserData((prev: any) => ({ ...prev, name: e.target.value }))
              }
              error={errorPassword}
              inputRef={nameRef}
            />
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="Seu email"
              value={userData.email}
              onChange={(e: any) =>
                setUserData({ ...userData, email: e.target.value })
              }
              error={errorUserData.email}
              inputRef={emailRef}
            />
          </div>
          <TextArea
            id="bio"
            label="Bio"
            placeholder="Sua bio"
            value={userData.bio}
            onChange={(e: any) =>
              setUserData({ ...userData, bio: e.target.value })
            }
            error={errorUserData.bio}
            inputRef={bioRef}
          />
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
            {errorUserData.general && (
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
              className="text-purple-500 opacity-75"
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
