import React from "react";

import { MantineProvider } from "@mantine/core";

import { BrowserRouter } from "react-router-dom";

import { ModalProvider } from "../contexts/ModalContext";

export const AllTheProviders = ({
  children,
  noRouter = false,
}: {
  children: React.ReactNode;
  noRouter?: boolean;
}) => {
  // Create portal containers for Mantine if they don't exist
  React.useEffect(() => {
    const createPortalContainer = (id: string) => {
      if (!document.getElementById(id) && document.body) {
        const container = document.createElement("div");
        container.setAttribute("id", id);
        try {
          document.body.appendChild(container);
        } catch (error) {
          // Silently handle DOM manipulation errors in tests
          console.warn(`Failed to create portal container ${id}:`, error);
        }
      }
    };

    createPortalContainer("portal-root");
    createPortalContainer("mantine-modals-container");
  }, []);

  const content = (
    <MantineProvider defaultColorScheme="light">
      <ModalProvider>{children}</ModalProvider>
    </MantineProvider>
  );

  if (noRouter) {
    return content;
  }

  return <BrowserRouter>{content}</BrowserRouter>;
};
