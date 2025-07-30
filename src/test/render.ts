import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { AllTheProviders } from './providers'

export const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })