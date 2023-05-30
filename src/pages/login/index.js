import React from "react";
import loginLogo from "../../../public/assets/loginLogo.png";
import { useForm } from "react-hook-form";
import Image from "next/image";

const Login = () => {
  const { register, handleSubmit } = useForm();

  function handleLogin({ email, password }) {
    console.log(email, password);

    //if password is valid then login
  }

  return (
    <>
      <main style={{ padding: "0" }}>
        <div className="login-form-container">
          <div>
            <form onSubmit={handleSubmit(handleLogin)} className="login-form">
              <div>
                {/* <img src={loginLogo} alt="Login Logo" /> */}
                <Image src={loginLogo} alt="Login Logo" />
              </div>
              <div className="flex-column">
                <h2 style={{ marginBottom: "1rem" }}>Ingresa a tu cuenta</h2>
                <input type="text" placeholder="Correo Electrónico" {...register("email", { required: true })} />
                <input type="password" placeholder="Contraseña" {...register("password", { required: true })} />
                <button className="btn" style={{ padding: "0.8rem 2rem", marginTop: "1rem" }}>
                  <p className="accent-font">Iniciar Sesión</p>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
