import { createContext } from "react";

export interface ImageModalData {
  src: string;
  alt: string;
}

export interface ModalContextType {
  isModalOpen: boolean;
  imageModalData: ImageModalData | null;
  openModal: () => void;
  closeModal: () => void;
  openImageModal: (data: ImageModalData) => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);
