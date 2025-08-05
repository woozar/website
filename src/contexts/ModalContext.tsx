import { ReactNode, useState } from "react";

import { ImageModalData, ModalContext } from "./modal-context";

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageModalData, setImageModalData] = useState<ImageModalData | null>(
    null
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setImageModalData(null);
  };

  const openImageModal = (data: ImageModalData) => {
    setImageModalData(data);
    setIsModalOpen(true);
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        imageModalData,
        openModal,
        closeModal,
        openImageModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
