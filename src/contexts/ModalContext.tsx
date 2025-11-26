import { ReactNode, useCallback, useMemo, useState } from "react";

import { ImageModalData, ModalContext } from "./modal-context";

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageModalData, setImageModalData] = useState<ImageModalData | null>(
    null
  );

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setImageModalData(null);
  }, []);

  const openImageModal = useCallback((data: ImageModalData) => {
    setImageModalData(data);
    setIsModalOpen(true);
  }, []);

  const contextValue = useMemo(
    () => ({
      isModalOpen,
      imageModalData,
      openModal,
      closeModal,
      openImageModal,
    }),
    [isModalOpen, imageModalData, openModal, closeModal, openImageModal]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};
