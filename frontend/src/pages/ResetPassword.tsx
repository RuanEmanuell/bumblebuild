import { useState } from "react";
import { LogoSecondary } from "../components/Logo";
import InputField from "../components/InputField";
import { Lock } from "react-feather";
import { ButtonPrimary } from "../components/Button";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/user/reset-password", {
        token,
        newPassword: password,
      });
      setMessage("Senha alterada com sucesso!");
      setError("");
    } catch (err: any) {
      setError("Erro ao redefinir senha.");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <div className="flex justify-center mb-6">
          <LogoSecondary size={140} />
        </div>

        <h2 className="text-xl font-semibold text-center mb-4">Nova senha</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Nova Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            icon={<Lock size={20} />}
          />

          <InputField
            label="Confirmar Senha"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            icon={<Lock size={20} />}
          />

          <ButtonPrimary type="submit">Redefinir Senha</ButtonPrimary>

          {message && <p className="text-green-600 text-sm text-center">{message}</p>}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}
