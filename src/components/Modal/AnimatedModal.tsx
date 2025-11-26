import { ReactNode, useEffect } from "react";

import { Button, Modal } from "@mantine/core";

import { IconX } from "@tabler/icons-react";

import { AnimatePresence, Variants, motion } from "framer-motion";

import {
  useContainerVariants,
  useFadeVariants,
  useItemVariants,
  useModalVariants,
  useWhileHover,
  useWhileTap,
} from "@/hooks/useAnimations";
import { useModal } from "@/hooks/useModal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AnimatedModalProps {
  opened: boolean;
  onClose: () => void;
  children: (props: { itemVariants: Variants }) => ReactNode;
  modalVariants?: Variants;
  contentVariants?: Variants;
  itemVariants?: Variants;
  backdrop?: boolean;
}

export const AnimatedModal = ({
  opened,
  onClose,
  children,
  modalVariants: customModalVariants,
  contentVariants: customContentVariants,
  itemVariants: customItemVariants,
  backdrop = false,
}: AnimatedModalProps) => {
  const { openModal, closeModal } = useModal();
  const shouldReduceMotion = useReducedMotion();

  // Hide scrollbars during modal animation and update global modal state
  useEffect(() => {
    if (opened) {
      document.body.style.overflow = "hidden";
      openModal();
    } else {
      document.body.style.overflow = "";
      closeModal();
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened, openModal, closeModal]);

  // Default variants using utility hooks
  const defaultModalVariants = useModalVariants();
  const defaultContentVariants = useContainerVariants();
  const defaultItemVariants = useItemVariants();
  const fadeVariants = useFadeVariants({ duration: 0.3 });

  const backdropVariants: Variants = {
    ...fadeVariants,
    exit: {
      opacity: shouldReduceMotion ? 1 : 0,
      transition: shouldReduceMotion ? {} : { duration: 0.2 },
    },
  };

  const modalVariants = customModalVariants || defaultModalVariants;
  const contentVariants = customContentVariants || defaultContentVariants;
  const itemVariants = customItemVariants || defaultItemVariants;
  const iconHover = useWhileHover({ type: "icon" });
  const tap = useWhileTap();

  return (
    <AnimatePresence>
      {opened && (
        <Modal
          opened={opened}
          onClose={onClose}
          size="xl"
          centered
          padding={0}
          radius="lg"
          withCloseButton={false}
          overlayProps={{
            backgroundOpacity: 0.6,
            blur: 8,
          }}
          zIndex={1100}
          styles={{
            body: {
              background: "transparent",
              boxShadow: "none",
              padding: 0,
              overflow: "hidden",
            },
            content: {
              background: "transparent",
              boxShadow: "none",
              overflow: "hidden",
            },
          }}
        >
          {backdrop && (
            <motion.div
              data-testid="modal-backdrop"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0, 0, 0, 0.4)",
                backdropFilter: "blur(8px)",
                zIndex: -1,
              }}
            />
          )}

          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              background: "var(--background-primary)",
              borderRadius: "1rem",
              padding: "2rem",
              maxHeight: "80vh",
              position: "relative",
              boxShadow: "0 20px 60px var(--shadow-color)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Close Button */}
            <motion.div
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                zIndex: 10,
              }}
              whileHover={iconHover}
              whileTap={tap}
            >
              <Button
                variant="subtle"
                size="sm"
                onClick={onClose}
                style={{
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  padding: 0,
                  color: "var(--text-secondary)",
                }}
              >
                <IconX size={20} />
              </Button>
            </motion.div>

            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              style={{
                flex: 1,
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {children({ itemVariants })}
            </motion.div>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};
