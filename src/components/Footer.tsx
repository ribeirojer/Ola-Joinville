import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();

  return (
    <footer
      className={`${
        router.pathname === "/" && "md:snap-center"
      } text-white fill-white z-10 relative flex flex-col bg-[#621eeb]`}
    >
      <section className="gap-4 md:gap-0 flex flex-wrap items-center py-4 md:pt-8 lg:pt-12">
        <div className="w-full px-4 md:w-1/2 lg:w-1/3 flex flex-col gap-4 items-center">
          <h3 className="font-bold text-xl text-center">Entre em Contato</h3>
          <a
            target="_blank"
            rel="external"
            href="https://api.whatsapp.com/send?phone=554797868892&amp;text=Olá,%20tudo%20bem?%20eu%20tenho%20interesse%20em%20um%20serviço%20da%20ferrata"
            className="flex gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-white"
            >
              <path d="M17.707 12.293a.999.999 0 0 0-1.414 0l-1.594 1.594c-.739-.22-2.118-.72-2.992-1.594s-1.374-2.253-1.594-2.992l1.594-1.594a.999.999 0 0 0 0-1.414l-4-4a.999.999 0 0 0-1.414 0L3.581 5.005c-.38.38-.594.902-.586 1.435.023 1.424.4 6.37 4.298 10.268s8.844 4.274 10.269 4.298h.028c.528 0 1.027-.208 1.405-.586l2.712-2.712a.999.999 0 0 0 0-1.414l-4-4.001zm-.127 6.712c-1.248-.021-5.518-.356-8.873-3.712-3.366-3.366-3.692-7.651-3.712-8.874L7 4.414 9.586 7 8.293 8.293a1 1 0 0 0-.272.912c.024.115.611 2.842 2.271 4.502s4.387 2.247 4.502 2.271a.991.991 0 0 0 .912-.271L17 14.414 19.586 17l-2.006 2.005z"></path>
            </svg>
            (47) 9786-8892
          </a>
          <a
            href="mailto:contatof3rratagroup@gmail.com"
            target="_blank"
            className="flex gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-white"
            >
              <path d="m18.73 5.41-1.28 1L12 10.46 6.55 6.37l-1.28-1A2 2 0 0 0 2 7.05v11.59A1.36 1.36 0 0 0 3.36 20h3.19v-7.72L12 16.37l5.45-4.09V20h3.19A1.36 1.36 0 0 0 22 18.64V7.05a2 2 0 0 0-3.27-1.64z"></path>
            </svg>
            contato@olajoinville.com
          </a>
        </div>
        <div className="w-full px-4 md:w-1/2 lg:w-1/3 flex flex-col gap-4 items-center">
          <Link href="/" className="inline-block">
            <Image
              src="/logo.png"
              alt="logo"
              className="w-full rounded-full"
              width={140}
              height={30}
            />
          </Link>
          <p className="text-center text-base font-bold md:text-lg">
            Olá Joinville{" "}
          </p>
          <div className="footer_svgs flex gap-4 mb-4">
            <a href="https://www.facebook.com" target={"_blank"}>
              <FacebookLogo size={32} className="fill-white" />
            </a>
            <a href="https://www.linkedin.com" target={"_blank"}>
              <LinkedinLogo size={32} className="fill-white" />
            </a>
            <a href="https://www.instagram.com/f3rrata/" target={"_blank"}>
              <InstagramLogo size={32} className="fill-white" />
            </a>
          </div>
        </div>
        <div className="hidden md:flex w-full px-4 md:w-1/2 lg:w-1/3 flex-col gap-4 items-center">
          <h3 className="text-xl font-bold">Atendimento</h3>
          <p>Segunda à Sábado</p>
          <p>
            <span>08:00 </span> às <span> 17:00</span>
          </p>
        </div>
      </section>
      <div className="hidden md:flex w-full justify-center pt-8 pb-8">
        {/* <p className="text-center text-sm text-gray-300">
          &copy; F3RRATA GROUP - Todos os direitos reservados.
        </p> */}
      </div>
    </footer>
  );
};

export default Footer;
