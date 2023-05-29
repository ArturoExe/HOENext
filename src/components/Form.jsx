import React from "react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StateContext } from "../contexts/stateContext";
const FloatingForm = () => {
  const { setState } = useContext(StateContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="floating-form"
      style={{
        position: "fixed",
        top: "30%",
        background: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        zIndex: "100",
        marginLeft: "35%",
      }}
    >
      <FontAwesomeIcon
        style={{ marginLeft: "90%" }}
        icon={faXmark}
        onClick={() => {
          setState(false);
        }}
      />

      <h2>Sign Up</h2>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" />
        </div>

        <button type="submit" onClick={() => setState(false)}>
          Submit
        </button>
      </form>
    </motion.div>
  );
};

export default FloatingForm;
