// components/ImageCropperModal.tsx
import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../utils/cropImage";
import { ButtonSecondary, ButtonPrimary } from "./Button";

interface ImageCropperModalProps {
  image: string | null;
  onClose: () => void;
  onSave: (croppedImage: File) => void;
}

const ImageCropperModal: React.FC<ImageCropperModalProps> = ({ image, onClose, onSave }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const handleConfirm = async () => {
    if (!croppedAreaPixels || !image) return;
    try {
      const croppedBlob = await getCroppedImg(image, croppedAreaPixels);
      const croppedFile = new File([croppedBlob], "foto.jpg", { type: "image/jpeg" });
      onSave(croppedFile);
      onClose(); //fecha o modal
    } catch (err) {
      console.error("Erro ao recortar a imagem:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg max-w-md w-full">
        <div className="relative w-full h-80 bg-gray-200">
          <Cropper
            image={image || undefined}
            crop={crop}
            zoom={zoom}
            aspect={1} //proporção quadrada
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={(_, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels)}
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <ButtonSecondary onClick={onClose}>Cancelar</ButtonSecondary>
          <ButtonPrimary onClick={handleConfirm}>Confirmar</ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default ImageCropperModal;
