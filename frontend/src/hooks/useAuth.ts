import { useEffect, useState } from "react";
import { User } from "../models/User";

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setToken(token);
            fetch(`http://${import.meta.env.VITE_API_URL}/user/logado`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(async (res) => {
                    if (!res.ok) {
                        if (res.status === 401 || res.status === 403) {
                            localStorage.removeItem("token");
                            setUser(null);
                        }
                        return;
                    }

                    const data = await res.json();
                    if (data.nome) {
                        setUser(data);
                    }
                })
                .catch((err) => console.error("Erro ao buscar usuário:", err));
        }
    }, []);

    return { user, setUser, token };
};
