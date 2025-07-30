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

  it('should apply default large size', () => {
    render(
      <Container>
        <div>Content</div>
      </Container>
    )

    const container = screen.getByText('Content').parentElement
    expect(container).toHaveStyle({
      maxWidth: '1024px',
      margin: '0 auto',
      padding: '0 1rem',
      width: '100%'
    })
  })

  it('should apply small size when specified', () => {
    render(
      <Container size="sm">
        <div>Content</div>
      </Container>
    )

    const container = screen.getByText('Content').parentElement
    expect(container).toHaveStyle({
      maxWidth: '640px'
    })
  })

  it('should apply medium size when specified', () => {
    render(
      <Container size="md">
        <div>Content</div>
      </Container>
    )

    const container = screen.getByText('Content').parentElement
    expect(container).toHaveStyle({
      maxWidth: '768px'
    })
  })

  it('should apply large size when specified', () => {
    render(
      <Container size="lg">
        <div>Content</div>
      </Container>
    )

    const container = screen.getByText('Content').parentElement
    expect(container).toHaveStyle({
      maxWidth: '1024px'
    })
  })

  it('should apply extra large size when specified', () => {
    render(
      <Container size="xl">
        <div>Content</div>
      </Container>
    )

    const container = screen.getByText('Content').parentElement
    expect(container).toHaveStyle({
      maxWidth: '1280px'
    })
  })

  it('should apply full size when specified', () => {
    render(
      <Container size="full">
        <div>Content</div>
      </Container>
    )

    const container = screen.getByText('Content').parentElement
    expect(container).toHaveStyle({
      maxWidth: '100%'
    })
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

  it('should render multiple children', () => {
    render(
      <Container>
        <div>First Child</div>
        <div>Second Child</div>
        <span>Third Child</span>
      </Container>
    )

    expect(screen.getByText('First Child')).toBeInTheDocument()
    expect(screen.getByText('Second Child')).toBeInTheDocument()
    expect(screen.getByText('Third Child')).toBeInTheDocument()
  })

  it('should handle nested containers', () => {
    render(
      <Container size="xl">
        <Container size="sm">
          <div>Nested Content</div>
        </Container>
      </Container>
    )

    expect(screen.getByText('Nested Content')).toBeInTheDocument()
    
    // The outer container should have xl size
    const outerContainer = screen.getByText('Nested Content').parentElement?.parentElement
    expect(outerContainer).toHaveStyle({
      maxWidth: '1280px'
    })

    // The inner container should have sm size
    const innerContainer = screen.getByText('Nested Content').parentElement
    expect(innerContainer).toHaveStyle({
      maxWidth: '640px'
    })
  })

  it('should render with consistent styling', () => {
    render(
      <Container>
        <div>Content</div>
      </Container>
    )

    const container = screen.getByText('Content').parentElement
    expect(container).toHaveStyle({
      margin: '0 auto',
      padding: '0 1rem',
      width: '100%'
    })
  })

  it('should handle empty children gracefully', () => {
    expect(() => render(<Container>{null}</Container>)).not.toThrow()
    
    // Should render the container div
    const container = document.querySelector('div')
    expect(container).toBeInTheDocument()
  })

  it('should handle undefined children gracefully', () => {
    expect(() => render(<Container>{undefined}</Container>)).not.toThrow()
    
    // Should render the container div  
    const container = document.querySelector('div')
    expect(container).toBeInTheDocument()
  })

  it('should render with different content types', () => {
    render(
      <Container>
        <h1>Heading</h1>
        <p>Paragraph</p>
        <button>Button</button>
        <input type="text" />
      </Container>
    )

    expect(screen.getByRole('heading')).toBeInTheDocument()
    expect(screen.getByText('Paragraph')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should maintain accessibility', () => {
    render(
      <Container>
        <button>Accessible Button</button>
        <input type="text" aria-label="Test Input" />
      </Container>
    )

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByLabelText('Test Input')).toBeInTheDocument()
  })
})