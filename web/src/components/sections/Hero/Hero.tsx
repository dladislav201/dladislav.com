import { TerminalTyping, Wrapper } from "@/components";
import Image from "next/image";
import "./Hero.scss";

export const Hero = () => {
  return (
    <Wrapper>
      <div className="hero">
        <div className="hero__avatar">
          <Image
            src={"/avatar.png"}
            className="hero__avatar--img"
            width={100}
            height={100}
            priority={true}
            alt="Vlad Avatar Image"
          ></Image>
        </div>
        <div className="hero__copy">
          <h1 className="hero__title">
            <span>Hi there</span>, I&apos;m Vlad.
          </h1>
          <TerminalTyping
            message={`By day (and often late into the night), I build things on the web with React, Vue, TypeScript, and Node.js. Frontend by heart, fullstack when needed. \n\nChess enthusiast on a mission to become a grandmaster. Also passionate about designing and engineering great UI/UX experiences.`}
            className="hero__intro"
          />
        </div>
      </div>
    </Wrapper>
  );
};
