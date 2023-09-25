import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { useRouter } from "next/router";
import { UserContext } from "@/pages/_app";
import { FacebookLogo, InstagramLogo, WhatsappLogo, TiktokLogo } from "@phosphor-icons/react";

type Props = {};

const Header = (props: Props) => {
  const { user } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFixed, setIsFixed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchTermRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 40) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleSubmit(
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    if (searchTerm) {
      router.push(`/loja?search=${searchTerm}`);
    } else {
      searchTermRef.current?.focus();
    }
  }

  return (
    <header id="header">
      <div className="md:hidden h-[100px]"></div>
      <div
        className={`hidden md:block bg-gray-200 ${isFixed ? "h-[140px]" : ""}`}
      >
        <div className="container mx-auto flex justify-between items-center px-4 md:px-0 py-2">
            <Link href="/contato" className="text-primary">
              Contato
            </Link>
          <div className="flex gap-2">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              className="text-primary"
            >
				<FacebookLogo size={32} />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              className="text-primary"
            >
<InstagramLogo size={32} />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              className="text-primary"
            >
<WhatsappLogo size={32} />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              className="text-primary"
            >
<TiktokLogo size={32} />            </a>
          </div>
        </div>
      </div>
      <div
        className={`${
          isFixed
            ? "fixed top-0 left-0 w-full z-40"
            : "fixed top-0 left-0 w-full z-40 md:static"
        } bg-pink-200 shadow transition-all`}
      >
        <div className="container mx-auto px-4 md:px-0 flex flex-row items-center justify-between">
          <div className="w-1/3 flex justify-start">
            <Link href="/" className="flex items-center">
              <Image
                src={"/logo-sem-bg.png"}
                alt="logo"
                width={100}
                height={100}
              ></Image>
              <div className="text-center md:text-left">
                <h1 className="text-2xl font-base satisfy">Boutique</h1>
                <h2 className="satisfy text-2xl font-base text-[#884447]">
                  da MOH
                </h2>
              </div>
            </Link>
          </div>
          <div className="flex justify-center items-center w-2/3">
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="toggle"
                checked={isMenuOpen}
                onChange={() => setIsMenuOpen(!isMenuOpen)}
              />
              <label htmlFor="toggle" className="checkbox">
                <div className="trace"></div>
                <div className="trace"></div>
                <div className="trace"></div>
              </label>
              <div className="menu"></div>
              <nav className="menu-itens">
                <ul>
                  <li onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <Link
                      href="/"
                      passHref
                      className={
                        router.pathname === "/" ? "font-bold" : "font-light"
                      }
                    >
                      Início
                    </Link>
                  </li>
                  <li onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <Link
                      href="/loja"
                      passHref
                      className={
                        router.pathname === "/loja" ? "font-bold" : "font-light"
                      }
                    >
                      Loja
                    </Link>
                  </li>
                  <li onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {user ? (
                      <Link
                        href="/usuario"
                        passHref
                        className={
                          router.pathname === "/usuario"
                            ? "font-bold"
                            : "font-light"
                        }
                      >
                        <span className="text-pink-500">Meus dados</span>
                      </Link>
                    ) : (
                      <Link
                        href="/entrar"
                        passHref
                        className={
                          router.pathname === "/entrar"
                            ? "font-bold"
                            : "font-light"
                        }
                      >
                        Entrar
                      </Link>
                    )}
                  </li>
                  <li onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <Link
                      href="/contato"
                      passHref
                      className={
                        router.pathname === "/contato"
                          ? "font-bold"
                          : "font-light"
                      }
                    >
                      Contato
                    </Link>
                  </li>
                  <li
                    className="my-2 text-black uppercase tracking-wide text-3xl leading-13 font-light"
                    onClick={() => {
                      if (!isSearchOpen) {
                        setIsSearchOpen(true);
                        setInterval(() => {
                          searchTermRef.current?.focus();
                        }, 100);
                      } else {
                        setIsSearchOpen(false);
                      }
                    }}
                  >
                    Pesquisar
                  </li>
                  {isSearchOpen && (
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-2 my-4"
                    >
                      <div className="relative flex items-center">
                        <Input
                          id={"searchTerm"}
                          type="text"
                          inputRef={searchTermRef}
                          placeholder="Pesquisar produtos"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          className="absolute top-2 right-2"
                        >
                          <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
                        </svg>
                      </div>
                      <Button type="submit">Pesquisar</Button>
                    </form>
                  )}
                </ul>
              </nav>
            </div>
            <nav className="menularge justify-between w-full">
			  <ul className="flex items-center gap-2">
			    <li>
                  <Link className="!text-gray-700 hover:!text-pink-500" href="/loja?category=f">Feminino</Link>
				</li>
			    <li>
                  <Link className="!text-gray-700 hover:!text-pink-500" href="/loja?category=m">Masculino</Link>
				</li>
			    <li>
				  <Link className="!text-gray-700 hover:!text-pink-500" href="/loja?category=unisex">Acessórios</Link>
				</li>
			  </ul>
              <div className="flex gap-2 items-center">
			  <form
                onSubmit={handleSubmit}
                className="hidden md:flex gap-2 items-center"
              >
                <div className="relative flex items-center">
                  <Input
                    id={"searchTerm"}
                    type="text"
                    inputRef={searchTermRef}
                    placeholder="Pesquisar produtos"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="absolute top-2 right-2"
                  >
                    <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
                  </svg>
                </div>
              </form>
                {user && (
                  <span className="text-pink-500 font-bold">
                    {user.firstName}
                  </span>
                )}

                {user ? (
                  <Link
                    href="/usuario"
                    className="flex gap-2 items-center py-2 px-3 border border-pink-500 rounded-lg bg-white group hover:bg-pink-500 transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="fill-pink-500 group-hover:fill-white"
                    >
                      <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path>
                    </svg>{" "}
                  </Link>
                ) : (
                  <Link
                    href="/entrar"
                    className="flex gap-2 items-center py-2 px-3 border border-pink-500 rounded-lg bg-white group hover:bg-pink-500 transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="fill-pink-500 group-hover:fill-white"
                    >
                      <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path>
                    </svg>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
