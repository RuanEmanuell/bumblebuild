const API_BASE_URL = "http://localhost:3000";

export const userService = {
  getUsers: async () => {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error("Erro ao buscar usuários");
    return response.json();
  },
};
