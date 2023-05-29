import React, { useContext } from "react";
import { motion } from "framer-motion";
import { StateContext } from "@/contexts/stateContext";
import womenImage from "../../public/assets/womenImage.png";

const Hero = () => {
  const { setState } = useContext(StateContext);
  function handleForm() {
    setState(true);
  }
  return (
    <div className="hero-container">
      <div className="hero-text-container">
        <motion.h1
          animate={{ x: [-500, 0] }}
          transition={{ ease: "easeOut", duration: 1 }}
        >
          House of Elegance
        </motion.h1>
        <motion.h4
          animate={{ x: [-500, 0] }}
          transition={{ ease: "easeOut", duration: 2 }}
        >
          Siéntete radiante y confiado reservando una cita hoy
        </motion.h4>

        <motion.button
          className="green-button"
          whileHover={{ scale: 1.1 }}
          onClick={() => handleForm()}
        >
          Agendar Cita
        </motion.button>
      </div>

      <motion.img
        src={womenImage}
        alt="mujer"
        animate={{ opacity: [0, 100] }}
        transition={{ duration: 2 }}
      />
    </div>
  );
};

export default Hero;
