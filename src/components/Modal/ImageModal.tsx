import { useEffect, useState } from "react";

import { Box, Modal } from "@mantine/core";

import { IconX } from "@tabler/icons-react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useModal } from "@/hooks/useModal";

export const ImageModal = () => {
  const { imageModalData, closeModal } = useModal();
  const { isMobile } = useMediaQuery();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [currentImageData, setCurrentImageData] =
    useState<typeof imageModalData>(null);

  useEffect(() => {
    if (imageModalData) {
      setCurrentImageData(imageModalData);
      setIsImageLoaded(false);
      setModalOpened(true);
      // Hide body scroll when modal opens
      if (typeof document !== "undefined") {
        document.body.style.overflow = "hidden";
      }
    }
  }, [imageModalData]);

  useEffect(() => {
    return () => {
      // Cleanup: restore scroll when component unmounts
      if (typeof document !== "undefined") {
        document.body.style.overflow = "unset";
      }
    };
  }, []);

  const handleClose = () => {
    setModalOpened(false);
    // Restore body scroll immediately when closing
    if (typeof document !== "undefined") {
      document.body.style.overflow = "unset";
    }
    // Delay clearing the image data until modal close animation is complete
    setTimeout(() => {
      setCurrentImageData(null);
      closeModal();
    }, 300);
  };

  if (!currentImageData) {
    return null;
  }

  return (
    <Modal
      opened={modalOpened}
      onClose={handleClose}
      size="auto"
      centered
      withCloseButton={false}
      padding={0}
      styles={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(4px)",
          zIndex: 9999,
        },
        content: {
          backgroundColor: "transparent",
          boxShadow: "none",
          maxWidth: "95vw",
          maxHeight: "95vh",
          zIndex: 10000,
        },
        body: {
          padding: 0,
        },
      }}
      zIndex={10000}
    >
      <Box
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "300px",
        }}
      >
        <button
          tabIndex={0}
          aria-label="Modal schließen"
          style={{
            position: "absolute",
            top: isMobile ? 10 : 20,
            right: isMobile ? 10 : 20,
            zIndex: 10001,
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "white",
            borderRadius: "50%",
            transition: "all 0.2s ease",
            border: 0,
            background: "transparent",
          }}
          onClick={handleClose}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleClose();
            }
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <IconX size={24} />
        </button>

        {/* Image */}
        <img
          src={currentImageData.src}
          alt={currentImageData.alt}
          onLoad={() => setIsImageLoaded(true)}
          style={{
            maxWidth: isMobile ? "90vw" : "80vw",
            maxHeight: isMobile ? "70vh" : "80vh",
            borderRadius: "12px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
            opacity: isImageLoaded ? 1 : 0,
            transition: "opacity 0.3s ease",
            display: "block",
          }}
        />
      </Box>
    </Modal>
  );
};
