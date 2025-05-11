import { useEffect, useState } from "react";
import HeaderCustom from "../components/Header";
import { Plus, User } from "react-feather";
import { ButtonPrimary, ButtonSecondary } from "../components/Button";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import ImageCropper from "../components/ImageCropper";

//formatar data para exibir
const formatDate = (isoDate?: string | Date) => {
  if (!isoDate) return "Data desconhecida";

  const date = new Date(isoDate);
  if (isNaN(date.getTime())) return "Data inválida";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};


export default function UserProfile() {
  //variaveis de controle de estado
  const { user, token } = useAuth();
  const [previewPic, setPreviewPic] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [PicFile, setPicFile] = useState<File | null>(null);
  const [cropperModal, setCropperModal] = useState(false);

  //atualiza os dados quando o user for carregado
  useEffect(() => {
    if (user) {
      setEditedName(user.name ?? "");
      setEditedEmail(user.email ?? "");
    }
  }, [user]);

  //metodo para mudança de Pic
  const handlePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setPreviewPic(imgUrl);
      setPicFile(file);
      setCropperModal(true);
    }
  };

  const handleSaveCroppedImage = (croppedImage: File) => {
    const imgUrl = URL.createObjectURL(croppedImage);
    setPreviewPic(imgUrl);
    setPicFile(croppedImage); //salva a imagem recortada
  };

  const handleCloseModal = () => {
    setCropperModal(false); //fecha o modal
  };

  //salvar alterações
  const handleSave = async () => {
    try {
      if (newPassword && newPassword !== confirmPassword) {
        setMessage("As senhas não coincidem.");
        return;
      }

      const id = user?.id;
      if (!id) {
        setMessage("Usuário não identificado.");
        return;
      }

      const formData = new FormData();
      formData.append("nome", editedName);
      formData.append("email", editedEmail);
      if (newPassword) {
        formData.append("senha", newPassword);
      }
      if (PicFile) {
        formData.append("Pic", PicFile);
      }

      const response = await axios.put(
        `http://${import.meta.env.VITE_API_URL}/user/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Informações salvas com sucesso!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsEditing(false);
      setIsEditingPassword(false);
      setPicFile(null);

      return response.data;
    } catch (error) {
      console.error(error);
      setMessage("Erro ao salvar alterações.");
    }
  };


  const handleCancelar = () => {
    setEditedName(user?.name || "");
    setEditedEmail(user?.email || "");
    setPreviewPic(user?.profilePictureUrl || null);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setMessage(null);
    setIsEditing(false);
    setIsEditingPassword(false);
  };



  return (
    <div className="min-h-screen flex flex-col">
      <HeaderCustom />
      <main className="flex-grow max-w-4xl mx-auto mt-10 px-4 sm:px-6 md:px-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:items-start">
          {/*div para a Pic*/}
          <div className="relative w-50 h-50 sm:w-36 sm:h-36 md:w-44 md:h-44">
            {isEditing ? (
              <>
                <label
                  htmlFor="Pic"
                  className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-yellow-400 text-textYellow rounded-full text-center cursor-pointer hover:border-yellow-300 transition relative overflow-hidden"
                >
                  {previewPic || user?.profilePictureUrl ? (
                    <img
                      src={previewPic || `http://${import.meta.env.VITE_API_URL}/uploads/${user?.profilePictureUrl}`}
                      alt="Pic do usuário"
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
                  id="Pic"
                  type="file"
                  accept="image/*"
                  onChange={handlePicChange}
                  className="hidden"
                />
              </>
            ) : previewPic || user?.profilePictureUrl ? (
              <img
                src={previewPic || `http://${import.meta.env.VITE_API_URL}/uploads/${user?.profilePictureUrl}`}
                alt="Pic do usuário"
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
              image={previewPic}
              onClose={handleCloseModal}
              onSave={handleSaveCroppedImage}
            />
          )}

          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-textPrimary">
              {user?.name}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-textPrimary">
              {user?.email}
            </p>
            <p className="text-sm sm:text-base text-textSecondary">
              Desde {formatDate(user?.createdAt)}
            </p>
          </div>


        </div>

        <div>
          {!isEditing && (
            <div className="mt-6">
              <ButtonSecondary onClick={() => { setIsEditing(true); setMessage(""); }}>
                Editar perfil
              </ButtonSecondary>
            </div>
          )}

          {isEditing && (
            <div className="w-full mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome</label>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="mt-1 w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                  className="mt-1 w-full border rounded p-2"
                />
              </div>
              <button
                onClick={() => setIsEditingPassword(true)}
                className="text-sm text-yellow-600 hover:underline"
              >
                Alterar senha
              </button>
            </div>
          )}

          {isEditingPassword && (
            <div className="w-full mt-6 space-y-4 border-t pt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Alterar senha</h3>
              <input
                type="password"
                placeholder="Senha atual"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1 w-full border rounded p-2 mb-2"
              />
              <input
                type="password"
                placeholder="Nova senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 w-full border rounded p-2 mb-2"
              />
              <input
                type="password"
                placeholder="Confirmar nova senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 w-full border rounded p-2"
              />
            </div>
          )}

          {message && (
            <p className="mt-4 text-center text-sm text-yellow-600 font-medium">{message}</p>
          )}

          {(isEditing || isEditingPassword) && (
            <div className="flex gap-4 mt-4">
              <ButtonPrimary onClick={handleSave}>Salvar alterações</ButtonPrimary>
              <ButtonSecondary onClick={handleCancelar}>Cancelar</ButtonSecondary>
            </div>
          )}
        </div>

        <div className="my-12">
          <h1 className="font-bold text-2xl">Histórico de Montagens</h1>
        </div>

      </main>
      <Footer />
    </div>
  );
}
