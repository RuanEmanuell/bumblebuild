import { useEffect, useState } from "react";
import { ButtonPrimary } from "../components/Button";
import InputField from "../components/InputField";
import { Mail, Lock, User } from "react-feather";
import { LogoSecondary } from "../components/Logo";
import CustomCheckbox from "../components/CustomCheckbox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [logoSize, setLogoSize] = useState(window.innerWidth < 768 ? 120 : 190);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setLogoSize(window.innerWidth < 768 ? 120 : 190);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //verificando se o usuario ja esta logado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      setErrorMessage(null);
      const response: any = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, {
        email: email,
        password: password,
      });

      const { token } = response.data;

      //salavndo token no localStorage
      localStorage.setItem("token", token);
      navigate("/");
      return response.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.error || "Erro ao fazer login. Tente novamente.";
      setErrorMessage(message);
      setIsLoading(false);
      throw error;
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem");
      return;
    }
    console.log({
      name: name,
      email: email,
      password: password,
    })
    try {
      setErrorMessage(null);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/create`, {
        name: name,
        email: email,
        password: password,
      });

      console.log("User created:", response.data);

      setIsLogin(true);
      setIsLoading(false);
      return response.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.error || "Erro ao criar conta. Tente novamente.";
      setErrorMessage(message);
      setIsLoading(false);
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
      {isLoading && <Loading/>}
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
              value={name}
              onChange={(e) => setname(e.target.value)}
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
              label="Confirmar senha"
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

          {errorMessage && (
            <div className="text-red-600 text-center font-medium text-sm">
              {errorMessage}
            </div>
          )}

          <div className="flex flex-col items-center space-y-4">
            <ButtonPrimary type="submit">{isLogin ? "Login" : "Cadastrar"}</ButtonPrimary>
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
