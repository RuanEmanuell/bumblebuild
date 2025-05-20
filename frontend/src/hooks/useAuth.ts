import { useEffect, useState } from "react";
import { User } from "../models/User";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const apiUrl = import.meta.env.VITE_API_URL;

    console.log("🔍 VITE_API_URL:", apiUrl);
    console.log("📦 Token encontrado:", token);

    if (token && apiUrl) {
      setToken(token);

      fetch(`${apiUrl}/user/logado`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(async (res) => {
          const contentType = res.headers.get("content-type");
          const responseText = await res.text();

          console.log("📨 Resposta da API:", responseText);

          if (!res.ok) {
            console.warn("❌ Requisição falhou. Status:", res.status);
            if (res.status === 401 || res.status === 403) {
              localStorage.removeItem("token");
              setUser(null);
            }
            return;
          }

          if (contentType && contentType.includes("application/json")) {
            const data = JSON.parse(responseText);
            console.log("✅ Usuário logado:", data);
            if (data.name) {
              setUser(data);
            }
          } else {
            console.error("❌ A resposta não é JSON válida");
          }
        })
        .catch((err) => console.error("❗ Erro ao buscar usuário:", err));
    }
  }, []);

  return { user, setUser, token };
};
