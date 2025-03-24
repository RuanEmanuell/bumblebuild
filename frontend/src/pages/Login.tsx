import { useEffect, useState } from "react";
import { ButtonPrimary } from "../components/Button";
import GoogleLoginButton from "../components/GoogleLoginButton";
import InputField from "../components/InputField";
import { Mail, Lock, User } from "react-feather";
import { LogoSecondary } from "../components/Logo";
import CustomCheckbox from "../components/CustomCheckbox";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false); //estado do checkbox
  const [logoSize, setLogoSize] = useState(window.innerWidth < 768 ? 120 : 190);

  useEffect(() => {
    const handleResize = () => {
      setLogoSize(window.innerWidth < 768 ? 120 : 190);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }
  };

  //atualizar o estado do checkbox
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary p-4 sm:p-0">
      <div className="w-full max-w-md md:max-w-lg p-6 md:p-8 bg-white rounded-2xl shadow-lg">
        <div className="flex justify-center mb-6">
          <LogoSecondary size={logoSize} />
        </div>

        {/*alternador Login/Cadastro */}
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
              onChange={(e) => setName(e.target.value)}
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
              checked={isChecked} //passando o estado do checkbox
              onChange={handleCheckboxChange} //função de alteração do estado
            />
          )}

          <div className="flex flex-col items-center space-y-4">
            <ButtonPrimary>{isLogin ? "Login" : "Cadastrar"}</ButtonPrimary>
            <GoogleLoginButton />
          </div>

          {/*link "esqueci minha senha" */}
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
