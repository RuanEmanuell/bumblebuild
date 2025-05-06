import { useEffect, useState } from "react";
import HeaderCustom from "../components/Header";
import { Plus, User } from "react-feather";
import { ButtonPrimary, ButtonSecondary } from "../components/Button";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import ImageCropper from "../components/ImageCropper";

//formatar data para exibir
const formatData = (isoDate?: string | Date) => {
  if (!isoDate) return "Data desconhecida";

  const data = new Date(isoDate);
  if (isNaN(data.getTime())) return "Data inválida";

  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
};


export default function UserProfile() {
  //variaveis de controle de estado
  const { user, token } = useAuth();
  const [previewFoto, setPreviewFoto] = useState<string | null>(null);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [editando, setEditando] = useState(false);
  const [editandoSenha, setEditandoSenha] = useState(false);
  const [nomeEditado, setNomeEditado] = useState("");
  const [emailEditado, setEmailEditado] = useState("");
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [cropperModal, setCropperModal] = useState(false);

  //atualiza os dados quando o user for carregado
  useEffect(() => {
    if (user) {
      setNomeEditado(user.nome ?? "");
      setEmailEditado(user.email ?? "");
    }
  }, [user]);

  //metodo para mudança de foto
  const handleFotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setPreviewFoto(imgUrl);
      setFotoFile(file);
      setCropperModal(true);
    }
  };

  const handleSaveCroppedImage = (croppedImage: File) => {
    const imgUrl = URL.createObjectURL(croppedImage);
    setPreviewFoto(imgUrl);
    setFotoFile(croppedImage); //salva a imagem recortada
  };

  const handleCloseModal = () => {
    setCropperModal(false); //fecha o modal
  };

  //salvar alterações
  const handleSalvar = async () => {
    try {
      if (novaSenha && novaSenha !== confirmarSenha) {
        setMensagem("As senhas não coincidem.");
        return;
      }

      const id = user?.id;
      if (!id) {
        setMensagem("Usuário não identificado.");
        return;
      }

      const formData = new FormData();
      formData.append("nome", nomeEditado);
      formData.append("email", emailEditado);
      if (novaSenha) {
        formData.append("senha", novaSenha);
      }
      if (fotoFile) {
        formData.append("foto", fotoFile);
      }

      const response = await axios.put(
        `http://localhost:3000/user/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMensagem("Informações salvas com sucesso!");
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");
      setEditando(false);
      setEditandoSenha(false);
      setFotoFile(null);

      return response.data;
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao salvar alterações.");
    }
  };


  const handleCancelar = () => {
    setNomeEditado(user?.nome || "");
    setEmailEditado(user?.email || "");
    setPreviewFoto(user?.fotoPerfilUrl || null);
    setSenhaAtual("");
    setNovaSenha("");
    setConfirmarSenha("");
    setMensagem(null);
    setEditando(false);
    setEditandoSenha(false);
  };



  return (
    <div className="min-h-screen flex flex-col">
      <HeaderCustom />
      <main className="flex-grow max-w-4xl mx-auto mt-10 px-4 sm:px-6 md:px-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:items-start">
          {/*div para a foto*/}
          <div className="relative w-50 h-50 sm:w-36 sm:h-36 md:w-44 md:h-44">
            {editando ? (
              <>
                <label
                  htmlFor="foto"
                  className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-yellow-400 text-textYellow rounded-full text-center cursor-pointer hover:border-yellow-300 transition relative overflow-hidden"
                >
                  {previewFoto || user?.fotoPerfilUrl ? (
                    <img
                      src={previewFoto || `http://localhost:3000/uploads/${user?.fotoPerfilUrl}`}
                      alt="Foto do usuário"
                      className="absolute top-0 left-0 w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <>
                      <Plus size={24} className="text-textYellow" />
                      <span className="text-xs text-textSecondary mt-1">Adicionar imagem</span>
                    </>
                  )}
                </label>
                <input
                  id="foto"
                  type="file"
                  accept="image/*"
                  onChange={handleFotoChange}
                  className="hidden"
                />
              </>
            ) : previewFoto || user?.fotoPerfilUrl ? (
              <img
                src={previewFoto || `http://localhost:3000/uploads/${user?.fotoPerfilUrl}`}
                alt="Foto do usuário"
                className="rounded-full object-cover w-full h-full border"
              />
            ) : (
              <div className="w-full h-full rounded-full border border-black flex items-center justify-center">
                <User size={150} />
              </div>
            )}


          </div>

          {cropperModal && (
            <ImageCropper
              image={previewFoto}
              onClose={handleCloseModal}
              onSave={handleSaveCroppedImage}
            />
          )}

          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-textPrimary">
              {user?.nome}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-textPrimary">
              {user?.email}
            </p>
            <p className="text-sm sm:text-base text-textSecondary">
              Desde {formatData(user?.createdAt)}
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
      <Footer />
    </div>
  );
}
