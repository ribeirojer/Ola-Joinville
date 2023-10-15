import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import theme from "../utils/theme";
import { useRouter } from "next/router";
import { UserContext } from "@/pages/_app";
import {
  FacebookLogo,
  InstagramLogo,
  WhatsappLogo,
  TiktokLogo,
  MagnifyingGlass,
  User,
  FilePlus,
} from "@phosphor-icons/react";

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
      router.push(`/noticias?search=${searchTerm}`);
    } else {
      searchTermRef.current?.focus();
    }
  }

  return (
    <header id="header">
      <div className="md:hidden h-[100px]"></div>
      <div
        className={`hidden md:block bg-olaSecondary ${
          isFixed ? "h-[140px]" : ""
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-4 md:px-0 py-2">
          <Link
            href="/contato"
            className="text-white text-lg hover:text-purple-700"
          >
            Entre em contato
          </Link>
          <div className="flex gap-2">
            <a href="https://www.facebook.com/olajoinville" target="_blank">
              <FacebookLogo
                className="fill-white hover:fill-purple-700 transition-colors"
                size={24}
                weight="fill"
              />
            </a>
            <a href="https://www.instagram.com/olajoinville" target="_blank">
              <InstagramLogo
                className="fill-white hover:fill-purple-700 transition-colors"
                size={24}
              />
            </a>
            <a href="https://www.api.whatsapp.com/" target="_blank">
              <WhatsappLogo
                className="fill-white hover:fill-purple-700 transition-colors"
                size={24}
              />
            </a>
            <a href="https://www.tiktok.com/olajoinville" target="_blank">
              <TiktokLogo
                className="fill-white hover:fill-purple-700 transition-colors"
                size={24}
              />
            </a>
          </div>
        </div>
      </div>
      <div
        className={`${
          isFixed
            ? "fixed top-0 left-0 w-full z-40"
            : "fixed top-0 left-0 w-full z-40 md:static"
        } bg-olaPrimary shadow transition-all`}
      >
        <div className="container mx-auto py-2 px-4 md:px-0 flex flex-row items-center justify-between">
          <div className="w-1/3 flex justify-start">
            <Link href="/" className="flex items-center">
              <Image
                src={"/logo.png"}
                alt="logo"
                width={220}
                height={140}
                priority={false}
              ></Image>
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
                  {/*<li onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <Link
                      href="/politica"
                      passHref
                      className={
                        router.pathname === "/noticias"
                          ? "font-bold"
                          : "font-light"
                      }
                    >
                      Política
                    </Link>
                  </li>*/}
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
                        <span className="text-purple-500">Meus dados</span>
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
                          placeholder="Pesquisar"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <MagnifyingGlass
                          className="absolute top-2 right-2"
                          size={24}
                        />
                      </div>
                      <Button type="submit">Pesquisar</Button>
                    </form>
                  )}
                </ul>
              </nav>
            </div>
            <nav className="menularge justify-between w-full">
              <ul className="items-center gap-2 hidden lg:flex">
                <li>
                  <Link
                    className="!text-white hover:!text-purple-500"
                    href="/noticias?category=politica"
                  >
                    Política
                  </Link>
                </li>
                <li>
                  <Link
                    className="!text-white hover:!text-purple-500"
                    href="/noticias?category=esportes"
                  >
                    Esportes
                  </Link>
                </li>
                <li>
                  <Link
                    className="!text-white hover:!text-purple-500"
                    href="/noticias?category=cultura"
                  >
                    Cultura
                  </Link>
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
                      placeholder="Pesquisar"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <MagnifyingGlass
                      className="absolute top-2 right-2"
                      size={24}
                    />
                  </div>
                </form>
                {user && (
                  <Link
                    href="/postar"
                    className="flex gap-2 items-center py-2 px-3 border border-purple-500 rounded-lg bg-white group hover:bg-purple-500 transition-all"
                  >
                    <FilePlus
                      size={24}
                      weight="fill"
                      className="fill-purple-500 group-hover:fill-white"
                    />
                  </Link>
                )}
                {user && (
                  <span className="text-purple-500 font-bold">{user.name}</span>
                )}
                {user ? (
                  <Link
                    href="/usuario"
                    className="flex gap-2 items-center py-2 px-3 border border-purple-500 rounded-lg bg-white group hover:bg-purple-500 transition-all"
                  >
                    <User
                      weight="fill"
                      size={24}
                      className="fill-purple-500 group-hover:fill-white"
                    ></User>
                  </Link>
                ) : (
                  <Link
                    href="/entrar"
                    className="flex gap-2 items-center py-2 px-3 border border-purple-500 rounded-lg bg-white group hover:bg-purple-500 transition-all"
                  >
                    <User
                      size={24}
                      className="fill-purple-500 group-hover:fill-white"
                    ></User>
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
