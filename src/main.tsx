import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider, createTheme } from '@mantine/core'
import './index.css'
import App from './App.tsx'

const theme = createTheme({
  colors: {
    orange: [
      '#fff4e6',
      '#ffe8cc',
      '#ffd09b',
      '#ffb366',
      '#ff9c39',
      '#ff8a1a',
      '#ff6b35',
      '#e55a2b',
      '#cc4e24',
      '#b8421a'
    ],
    red: [
      '#ffebee',
      '#ffcdd2',
      '#ef9a9a',
      '#e57373',
      '#ef5350',
      '#f44336',
      '#d32f2f',
      '#c62828',
      '#b71c1c',
      '#a51b1b'
    ]
  },
  primaryColor: 'orange',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </StrictMode>,
)
