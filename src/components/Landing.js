import React from "react";
import { motion } from "framer-motion";
import LandingIcon from "../images/LandingIcon2.png";

const Landing = () => {
  return (
    <div className="landing">
      <motion.div
        className="box"
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 180, 180, 0]
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1,
        }}
      >
        <img src={LandingIcon} alt="Landing Icon" />
      </motion.div>
    </div>
  );
};

export default Landing;
