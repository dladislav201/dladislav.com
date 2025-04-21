import { motion } from "framer-motion";
import "./Curtain.scss";

interface CurtainProps {
  onClick: () => void;
}

export const Curtain = ({ onClick }: CurtainProps) => {
  return (
    <motion.div
      className="curtain"
      initial={{
        display: "none",
        backdropFilter: "blur(0px)",
        WebkitBackdropFilter: "blur(0px)",
        backgroundColor: "rgba(0, 0, 0, 0)",
      }}
      animate={{
        display: "block",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      }}
      exit={{
        display: "none",
        backdropFilter: "blur(0px)",
        WebkitBackdropFilter: "blur(0px)",
        backgroundColor: "rgba(0, 0, 0, 0)",
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onClick={onClick}
    />
  );
};
