import { useEffect, useState } from "react";
import { ButtonPrimary } from "../components/Button";
import GoogleLoginButton from "../components/GoogleLoginButton";
import InputField from "../components/InputField";
import { Mail, Lock, User } from "react-feather";
import { LogoSecondary } from "../components/Logo";
import CustomCheckbox from "../components/CustomCheckbox";
import axios from "axios";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [logoSize, setLogoSize] = useState(window.innerWidth < 768 ? 120 : 190);

  useEffect(() => {
    const handleResize = () => {
      setLogoSize(window.innerWidth < 768 ? 120 : 190);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogin = async () => {
    console.log("Realizando login com:", { email, password });
    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        email: email,
        senha: password,
    });
      console.log("User logged in:", response.data);
      alert("Usuário fez login!");
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }
    console.log({
      nome: name,
      email: email,
      senha: password,
    })
    console.log("User created:", { nome, email, password });
    try {
      const response = await axios.post("http://localhost:3000/user/create", {
        nome: nome,
        email: email,
        senha: password,
        tipo_usuario: "padrao"
      });

      console.log("User created:", response.data);
      alert("Usuário criado!");
      return response.data;
      
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary p-4 sm:p-0">
      <div className="w-full max-w-md md:max-w-lg p-6 md:p-8 bg-white rounded-2xl shadow-lg">
        <div className="flex justify-center mb-6">
          <LogoSecondary size={logoSize} />
        </div>

        <div className="flex justify-between bg-secondary p-1 rounded-full mb-6">
          <button
            className={`w-1/2 py-2 font-bold rounded-full cursor-pointer transition ${isLogin ? "bg-primary font-bold text-white" : "text-textPrimary"
              }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 font-bold rounded-full cursor-pointer transition ${!isLogin ? "bg-primary font-bold text-white" : "text-textPrimary"
              }`}
            onClick={() => setIsLogin(false)}
          >
            Cadastro
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <InputField
              label="Nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              icon={<User size={20} />}
            />
          )}

          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            icon={<Mail size={20} />}
          />

          <InputField
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            icon={<Lock size={20} />}
          />

          {!isLogin && (
            <InputField
              label="Confirmar Senha"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              icon={<Lock size={20} />}
            />
          )}

          {!isLogin && (
            <CustomCheckbox
              id="terms"
              label="Aceito os termos"
              required
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
          )}

          <div className="flex flex-col items-center space-y-4">
            <ButtonPrimary type="submit">{isLogin ? "Login" : "Cadastrar"}</ButtonPrimary>
            <GoogleLoginButton />
          </div>

          {isLogin && (
            <div className="text-center mt-4">
              <a href="/forgot-password" className="text-primary hover:underline">
                Esqueci minha senha
              </a>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
