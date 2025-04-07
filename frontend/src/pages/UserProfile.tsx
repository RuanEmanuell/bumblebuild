import { useState } from "react";
import HeaderCustom from "../components/Header";
import { Plus } from "react-feather";
import { ButtonPrimary, ButtonSecondary } from "../components/Button";

//formatar data para exibir
const formatData = (isoDate: string) => {
  const data = new Date(isoDate);
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
};

export default function UserProfile() {
  //use state com dados mock para teste
  const [user, setUser] = useState({
    nome: "Millie Teste",
    email: "millie@email.com",
    createdAt: "2024-04-01T10:00:00Z",
    foto: "",
  });

  //variaveis de controle de estado
  const [previewFoto, setPreviewFoto] = useState<string | null>(null);
  const [nomeEditado, setNomeEditado] = useState(user.nome);
  const [emailEditado, setEmailEditado] = useState(user.email);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [editando, setEditando] = useState(false);
  const [editandoSenha, setEditandoSenha] = useState(false);

  //metodo para mudança de foto
  const handleFotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setPreviewFoto(imgUrl);
      setMensagem(null);
    }
  };

  //salvar alterações
  const handleSalvar = () => {
    if (novaSenha && novaSenha !== confirmarSenha) {
      setMensagem("As senhas não coincidem.");
      return;
    }

    setUser((prev) => ({
      ...prev,
      nome: nomeEditado,
      email: emailEditado,
      foto: previewFoto || prev.foto,
    }));

    setMensagem("Informações salvas com sucesso!");
    setSenhaAtual("");
    setNovaSenha("");
    setConfirmarSenha("");
    setEditando(false);
    setEditandoSenha(false);
  };

  //cancelar edição
  const handleCancelar = () => {
    setNomeEditado(user.nome);
    setEmailEditado(user.email);
    setPreviewFoto(null);
    setSenhaAtual("");
    setNovaSenha("");
    setConfirmarSenha("");
    setMensagem(null);
    setEditando(false);
    setEditandoSenha(false);
  };


  return (
    <div>
      <HeaderCustom />
      <main className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 md:px-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:items-start">
          <div className="relative w-50 h-50 sm:w-36 sm:h-36 md:w-44 md:h-44">
            {previewFoto || user.foto ? (
              //se houver foto do usuário exibe 
              <img
                src={previewFoto || user.foto}
                alt="Foto do usuário"
                className="rounded-full object-cover w-full h-full border"
              />
            ) : (
              //se não houver foto do usuário exibe icone para adicionar
              <label
                htmlFor="foto"
                className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed text-textYellow rounded-full text-center cursor-pointer hover:border-yellow-200 transition"
              >
                <Plus size={24} className="text-textYellow" />
                <span className="text-xs text-textSecondary mt-1">Adicionar imagem</span>
              </label>
            )}
            <input
              id="foto"
              type="file"
              accept="image/*"
              onChange={handleFotoChange}
              className="hidden"
            />
          </div>

          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-textPrimary">
              {user.nome}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-textPrimary">
              {user.email}
            </p>
            <p className="text-sm sm:text-base text-textSecondary">
              Desde {formatData(user.createdAt)}
            </p>
          </div>


        </div>

        <div>
          {!editando && (
            <div className="mt-6">
              <ButtonSecondary onClick={() => { setEditando(true); setMensagem(""); }}>
                Editar perfil
              </ButtonSecondary>
            </div>
          )}

          {editando && (
            <div className="w-full mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome</label>
                <input
                  type="text"
                  value={nomeEditado}
                  onChange={(e) => setNomeEditado(e.target.value)}
                  className="mt-1 w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={emailEditado}
                  onChange={(e) => setEmailEditado(e.target.value)}
                  className="mt-1 w-full border rounded p-2"
                />
              </div>
              <button
                onClick={() => setEditandoSenha(true)}
                className="text-sm text-yellow-600 hover:underline"
              >
                Alterar senha
              </button>
            </div>
          )}

          {editandoSenha && (
            <div className="w-full mt-6 space-y-4 border-t pt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Alterar senha</h3>
              <input
                type="password"
                placeholder="Senha atual"
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
                className="mt-1 w-full border rounded p-2 mb-2"
              />
              <input
                type="password"
                placeholder="Nova senha"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                className="mt-1 w-full border rounded p-2 mb-2"
              />
              <input
                type="password"
                placeholder="Confirmar nova senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                className="mt-1 w-full border rounded p-2"
              />
            </div>
          )}

          {mensagem && (
            <p className="mt-4 text-center text-sm text-yellow-600 font-medium">{mensagem}</p>
          )}

          {(editando || editandoSenha) && (
            <div className="flex gap-4 mt-4">
              <ButtonPrimary onClick={handleSalvar}>Salvar alterações</ButtonPrimary>
              <ButtonSecondary onClick={handleCancelar}>Cancelar</ButtonSecondary>
            </div>
          )}
        </div>

        <div className="my-12">
          <h1 className="font-bold text-2xl">Histórico de compras</h1>
        </div>
      </main>
    </div>
  );
}
