import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/test-utils'
import { Container } from './Container'

describe('Container', () => {
  it('should render children', () => {
    render(
      <Container>
        <div>Test Content</div>
      </Container>
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('should apply custom className when provided', () => {
    render(
      <Container className="custom-class">
        <div>Content</div>
      </Container>
    )

    const container = screen.getByText('Content').parentElement
    expect(container).toHaveClass('custom-class')
  })

  it('should handle empty children gracefully', () => {
    expect(() => render(<Container>{null}</Container>)).not.toThrow()
  })

  it('should handle undefined children gracefully', () => {
    expect(() => render(<Container>{undefined}</Container>)).not.toThrow()
  })

  it('should apply correct size hierarchy with meaningful differences', () => {
    const { rerender } = render(
      <Container size="sm">
        <div data-testid="content">Content</div>
      </Container>
    )

    const getMaxWidth = () => {
      const container = screen.getByTestId('content').parentElement
      const computedStyle = window.getComputedStyle(container!)
      return parseInt(computedStyle.maxWidth)
    }

    const smWidth = getMaxWidth()

    rerender(
      <Container size="md">
        <div data-testid="content">Content</div>
      </Container>
    )
    const mdWidth = getMaxWidth()

    rerender(
      <Container size="lg">
        <div data-testid="content">Content</div>
      </Container>
    )
    const lgWidth = getMaxWidth()

    rerender(
      <Container size="xl">
        <div data-testid="content">Content</div>
      </Container>
    )
    const xlWidth = getMaxWidth()

    // Verify size hierarchy and meaningful differences
    expect(smWidth).toBeLessThan(mdWidth)
    expect(mdWidth).toBeLessThan(lgWidth)
    expect(lgWidth).toBeLessThan(xlWidth)

    // Ensure each step up is at least 100px bigger for meaningful responsive breakpoints
    expect(mdWidth - smWidth).toBeGreaterThanOrEqual(100)
    expect(lgWidth - mdWidth).toBeGreaterThanOrEqual(100)
    expect(xlWidth - lgWidth).toBeGreaterThanOrEqual(200)
  })

  it('should handle full size as 100% width', () => {
    render(
      <Container size="full">
        <div data-testid="content">Content</div>
      </Container>
    )

    const container = screen.getByTestId('content').parentElement
    const computedStyle = window.getComputedStyle(container!)
    
    // full size should set maxWidth to none or 100%
    expect(computedStyle.maxWidth).toBe('100%')
  })
})