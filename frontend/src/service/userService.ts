export const userService = {
  getUsers: async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/users`);
    if (!response.ok) throw new Error("Erro ao buscar usuários");
    return response.json();
  },
};
