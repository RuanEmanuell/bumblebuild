import { useEffect, useState } from "react";
import { User } from "../models/User";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const apiUrl = import.meta.env.VITE_API_URL;

    if (token && apiUrl) {
      setToken(token);

      fetch(`${apiUrl}/users/logado`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(async (res) => {
          const contentType = res.headers.get("content-type");
          const responseText = await res.text();

          if (!res.ok) {
            console.warn("Requisição falhou. Status:", res.status);
            if (res.status === 401 || res.status === 403) {
              localStorage.removeItem("token");
              setUser(null);
            }
            return;
          }

          if (contentType && contentType.includes("application/json")) {
            const data = JSON.parse(responseText);
            if (data.name) {
              setUser(data);
            }
          } else {
            console.error("A resposta não é JSON válida");
          }
        })
        .catch((err) => console.error("Erro ao buscar usuário:", err));
    }
  }, []);

  const logout = async () => {
    const token = localStorage.getItem("token");
    const apiUrl = import.meta.env.VITE_API_URL;

    if (token && apiUrl) {
      try {
        await fetch(`${apiUrl}/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (err) {
        console.warn("⚠️ Falha ao chamar /logout, prosseguindo com logout local.");
      }
    }

    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    window.location.replace("/login"); 
  };

  return { user, setUser, token, logout };
};
