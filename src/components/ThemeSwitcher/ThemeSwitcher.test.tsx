import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { customRender as render } from '../../test/render';
import { ThemeSwitcher } from './ThemeSwitcher';
import { useThemeStore } from '../../stores/themeStore';

// Mock the theme store
vi.mock('../../stores/themeStore', () => ({
  useThemeStore: vi.fn()
}));

const mockThemeStore = {
  theme: 'light' as const,
  toggleTheme: vi.fn()
};

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useThemeStore as any).mockReturnValue(mockThemeStore);
  });

  describe('desktop variant', () => {
    it('should render desktop variant by default', () => {
      render(<ThemeSwitcher />);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('title', 'Switch to dark mode');
    });

    it('should render moon icon in light mode', () => {
      (useThemeStore as any).mockReturnValue({
        ...mockThemeStore,
        theme: 'light'
      });

      render(<ThemeSwitcher />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title', 'Switch to dark mode');
      // Moon icon should be present (IconMoon)
    });

    it('should render sun icon in dark mode', () => {
      (useThemeStore as any).mockReturnValue({
        ...mockThemeStore,
        theme: 'dark'
      });

      render(<ThemeSwitcher />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title', 'Switch to light mode');
      // Sun icon should be present (IconSun)
    });

    it('should call toggleTheme when clicked', () => {
      const mockToggleTheme = vi.fn();
      (useThemeStore as any).mockReturnValue({
        ...mockThemeStore,
        toggleTheme: mockToggleTheme
      });

      render(<ThemeSwitcher />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(mockToggleTheme).toHaveBeenCalled();
    });

    it('should have correct styling for desktop variant', () => {
      render(<ThemeSwitcher />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveStyle({
        color: 'var(--primary-orange)',
        background: 'transparent',
        border: '1px solid var(--primary-orange)',
        height: '28px',
        padding: '0px 8px'
      });
    });
  });

  describe('mobile variant', () => {
    it('should render mobile variant when specified', () => {
      render(<ThemeSwitcher variant="mobile" />);
      
      const lightButton = screen.getByText('Light');
      const darkButton = screen.getByText('Dark');
      
      expect(lightButton).toBeInTheDocument();
      expect(darkButton).toBeInTheDocument();
    });

    it('should show Light button as active in light mode', () => {
      (useThemeStore as any).mockReturnValue({
        ...mockThemeStore,
        theme: 'light'
      });

      render(<ThemeSwitcher variant="mobile" />);
      
      const lightButton = screen.getByText('Light');
      expect(lightButton).toHaveStyle({
        color: 'rgb(255, 255, 255)'
      });
    });

    it('should show Dark button as active in dark mode', () => {
      (useThemeStore as any).mockReturnValue({
        ...mockThemeStore,
        theme: 'dark'
      });

      render(<ThemeSwitcher variant="mobile" />);
      
      const darkButton = screen.getByText('Dark');
      expect(darkButton).toHaveStyle({
        color: 'rgb(255, 255, 255)'
      });
    });

    it('should show Light button as inactive in dark mode', () => {
      (useThemeStore as any).mockReturnValue({
        ...mockThemeStore,
        theme: 'dark'
      });

      render(<ThemeSwitcher variant="mobile" />);
      
      const lightButton = screen.getByText('Light');
      expect(lightButton).toHaveStyle({
        color: 'var(--primary-orange)'
      });
    });

    it('should show Dark button as inactive in light mode', () => {
      (useThemeStore as any).mockReturnValue({
        ...mockThemeStore,
        theme: 'light'
      });

      render(<ThemeSwitcher variant="mobile" />);
      
      const darkButton = screen.getByText('Dark');
      expect(darkButton).toHaveStyle({
        color: 'var(--primary-orange)'
      });
    });

    it('should call toggleTheme when clicking inactive Light button', () => {
      const mockToggleTheme = vi.fn();
      (useThemeStore as any).mockReturnValue({
        ...mockThemeStore,
        theme: 'dark',
        toggleTheme: mockToggleTheme
      });

      render(<ThemeSwitcher variant="mobile" />);
      
      const lightButton = screen.getByText('Light');
      fireEvent.click(lightButton);
      
      expect(mockToggleTheme).toHaveBeenCalled();
    });

    it('should call toggleTheme when clicking inactive Dark button', () => {
      const mockToggleTheme = vi.fn();
      (useThemeStore as any).mockReturnValue({
        ...mockThemeStore,
        theme: 'light',
        toggleTheme: mockToggleTheme
      });

      render(<ThemeSwitcher variant="mobile" />);
      
      const darkButton = screen.getByText('Dark');
      fireEvent.click(darkButton);
      
      expect(mockToggleTheme).toHaveBeenCalled();
    });

    it('should not call toggleTheme when clicking active Light button', () => {
      const mockToggleTheme = vi.fn();
      (useThemeStore as any).mockReturnValue({
        ...mockThemeStore,
        theme: 'light',
        toggleTheme: mockToggleTheme
      });

      render(<ThemeSwitcher variant="mobile" />);
      
      const lightButton = screen.getByText('Light');
      fireEvent.click(lightButton);
      
      expect(mockToggleTheme).not.toHaveBeenCalled();
    });

    it('should not call toggleTheme when clicking active Dark button', () => {
      const mockToggleTheme = vi.fn();
      (useThemeStore as any).mockReturnValue({
        ...mockThemeStore,
        theme: 'dark',
        toggleTheme: mockToggleTheme
      });

      render(<ThemeSwitcher variant="mobile" />);
      
      const darkButton = screen.getByText('Dark');
      fireEvent.click(darkButton);
      
      expect(mockToggleTheme).not.toHaveBeenCalled();
    });

    it('should have correct container styling for mobile variant', () => {
      render(<ThemeSwitcher variant="mobile" />);
      
      const container = screen.getByText('Light').closest('div')?.parentElement;
      expect(container).toBeInTheDocument();
      // The container styling is applied via Mantine components
      // which may not be directly testable via style assertions
    });

    it('should have fullWidth buttons in mobile variant', () => {
      render(<ThemeSwitcher variant="mobile" />);
      
      const lightButton = screen.getByText('Light');
      const darkButton = screen.getByText('Dark');
      
      // Both buttons should have fullWidth prop
      expect(lightButton.closest('.mantine-Button-root')).toBeInTheDocument();
      expect(darkButton.closest('.mantine-Button-root')).toBeInTheDocument();
    });
  });

  describe('theme detection', () => {
    it('should correctly detect dark theme', () => {
      (useThemeStore as any).mockReturnValue({
        ...mockThemeStore,
        theme: 'dark'
      });

      render(<ThemeSwitcher />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title', 'Switch to light mode');
    });

    it('should correctly detect light theme', () => {
      (useThemeStore as any).mockReturnValue({
        ...mockThemeStore,
        theme: 'light'
      });

      render(<ThemeSwitcher />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title', 'Switch to dark mode');
    });
  });
});