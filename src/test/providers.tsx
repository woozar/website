import React from 'react'
import { MantineProvider } from '@mantine/core'

export const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider>
      {children}
    </MantineProvider>
  )
}