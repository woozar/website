import React from 'react'
import { MantineProvider } from '@mantine/core'
import { ModalProvider } from '../contexts/ModalContext'

export const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  // Create portal containers for Mantine if they don't exist
  React.useEffect(() => {
    const createPortalContainer = (id: string) => {
      if (!document.getElementById(id) && document.body) {
        const container = document.createElement('div')
        container.setAttribute('id', id)
        try {
          document.body.appendChild(container)
        } catch (error) {
          // Silently handle DOM manipulation errors in tests
          console.warn(`Failed to create portal container ${id}:`, error)
        }
      }
    }
    
    createPortalContainer('portal-root')
    createPortalContainer('mantine-modals-container')
  }, [])

  return (
    <MantineProvider defaultColorScheme="light">
      <ModalProvider>
        {children}
      </ModalProvider>
    </MantineProvider>
  )
}