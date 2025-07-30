import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/test-utils'
import { Section } from './Section'

describe('Section', () => {
  it('should render children', () => {
    render(
      <Section>
        <div>Test Content</div>
      </Section>
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('should render as section element by default', () => {
    render(
      <Section>
        <div>Content</div>
      </Section>
    )

    const section = screen.getByText('Content').closest('section')
    expect(section).toBeInTheDocument()
  })

  it('should apply custom id when provided', () => {
    render(
      <Section id="custom-section">
        <div>Content</div>
      </Section>
    )

    const section = screen.getByText('Content').closest('section')
    expect(section).toHaveAttribute('id', 'custom-section')
  })

  it('should apply custom className when provided', () => {
    render(
      <Section className="custom-class">
        <div>Content</div>
      </Section>
    )

    const section = screen.getByText('Content').closest('section')
    expect(section).toHaveClass('custom-class')
  })

  it('should apply no padding by default', () => {
    render(
      <Section>
        <div>Content</div>
      </Section>
    )

    const section = screen.getByText('Content').closest('section')
    expect(section).toHaveStyle({
      padding: '0'
    })
  })

  it('should apply small padding when specified', () => {
    render(
      <Section paddingY="sm">
        <div>Content</div>
      </Section>
    )

    const section = screen.getByText('Content').closest('section')
    expect(section).toHaveStyle({
      padding: '2rem 0'
    })
  })

  it('should apply medium padding when specified', () => {
    render(
      <Section paddingY="md">
        <div>Content</div>
      </Section>
    )

    const section = screen.getByText('Content').closest('section')
    expect(section).toHaveStyle({
      padding: '3rem 0'
    })
  })

  it('should apply large padding when specified', () => {
    render(
      <Section paddingY="lg">
        <div>Content</div>
      </Section>
    )

    const section = screen.getByText('Content').closest('section')
    expect(section).toHaveStyle({
      padding: '4rem 0'
    })
  })

  it('should apply extra large padding when specified', () => {
    render(
      <Section paddingY="xl">
        <div>Content</div>
      </Section>
    )

    const section = screen.getByText('Content').closest('section')
    expect(section).toHaveStyle({
      padding: '6rem 0'
    })
  })

  it('should include Container component by default', () => {
    render(
      <Section>
        <div>Content</div>
      </Section>
    )

    // The content should be wrapped in a container with centered styling
    const container = screen.getByText('Content').parentElement
    expect(container).toHaveStyle({
      maxWidth: '1024px',
      margin: '0 auto'
    })
  })

  it('should render multiple children', () => {
    render(
      <Section>
        <h1>Title</h1>
        <p>Paragraph</p>
        <div>Content</div>
      </Section>
    )

    expect(screen.getByRole('heading')).toBeInTheDocument()
    expect(screen.getByText('Paragraph')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('should handle nested sections', () => {
    render(
      <Section id="outer" paddingY="xl">
        <Section id="inner" paddingY="sm">
          <div>Nested Content</div>
        </Section>
      </Section>
    )

    const outerSection = document.getElementById('outer')
    const innerSection = document.getElementById('inner')

    expect(outerSection).toBeInTheDocument()
    expect(innerSection).toBeInTheDocument()
    expect(screen.getByText('Nested Content')).toBeInTheDocument()

    expect(outerSection).toHaveStyle({
      padding: '6rem 0'
    })

    expect(innerSection).toHaveStyle({
      padding: '2rem 0'
    })
  })

  it('should render with semantic structure', () => {
    render(
      <Section id="about">
        <h2>About Section</h2>
        <p>Section content</p>
      </Section>
    )

    // Mantine Box with component="section" doesn't get role="region" by default
    const section = document.getElementById('about')
    expect(section).toBeInTheDocument()
    expect(section?.tagName.toLowerCase()).toBe('section')
  })

  it('should handle empty children gracefully', () => {
    render(<Section>{null}</Section>)
    
    const section = document.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('should handle undefined children gracefully', () => {
    render(<Section>{undefined}</Section>)
    
    const section = document.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('should apply both id and className together', () => {
    render(
      <Section id="test-section" className="test-class" paddingY="md">
        <div>Content</div>
      </Section>
    )

    const section = screen.getByText('Content').closest('section')
    expect(section).toHaveAttribute('id', 'test-section')
    expect(section).toHaveClass('test-class')
    expect(section).toHaveStyle({
      padding: '3rem 0'
    })
  })

  it('should render with consistent width and centering', () => {
    render(
      <Section>
        <div>Content</div>
      </Section>
    )

    const section = screen.getByText('Content').closest('section')
    expect(section).toBeInTheDocument()

    const container = screen.getByText('Content').parentElement
    expect(container).toHaveStyle({
      margin: '0 auto'
    })
  })

  it('should work with different content types', () => {
    render(
      <Section>
        <header>Header Content</header>
        <main>Main Content</main>
        <footer>Footer Content</footer>
      </Section>
    )

    expect(screen.getByText('Header Content')).toBeInTheDocument()
    expect(screen.getByText('Main Content')).toBeInTheDocument()
    expect(screen.getByText('Footer Content')).toBeInTheDocument()
  })
})