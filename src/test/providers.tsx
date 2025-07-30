import React from 'react'
import { MantineProvider } from '@mantine/core'
import { ModalProvider } from '../contexts/ModalContext'

export const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider>
      <ModalProvider>
        {children}
      </ModalProvider>
    </MantineProvider>
  )
}