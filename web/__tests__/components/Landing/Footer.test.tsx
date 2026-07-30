import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../../../src/contexts/LanguageContext';
import { Footer } from '../../../src/components/Landing/Footer';

describe('Footer (Figma Make reference)', () => {
  it('renders brand mark with "Frylane" wordmark', () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <Footer />
        </LanguageProvider>
      </MemoryRouter>,
    );
    expect(screen.getByText(/^Frylane/)).toBeTruthy();
  });

  it('exposes a link to the homepage from the footer brand mark', () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <Footer />
        </LanguageProvider>
      </MemoryRouter>,
    );
    const link = screen.getByRole('link', { name: /Frylane/ });
    expect(link.getAttribute('href')).toBe('/');
  });

  it('renders the Vietnamese slogan "Cách đơn giản nhất để di chuyển từ sân bay về trung tâm"', () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <Footer />
        </LanguageProvider>
      </MemoryRouter>,
    );
    expect(
      screen.getByText(/Cách đơn giản nhất để di chuyển từ sân bay về trung tâm/i),
    ).toBeTruthy();
  });

  it('renders 3 Vietnamese legal links: Điều khoản, Bảo mật, Hỗ trợ', () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <Footer />
        </LanguageProvider>
      </MemoryRouter>,
    );
    expect(screen.getByText('Điều khoản')).toBeTruthy();
    expect(screen.getByText('Bảo mật')).toBeTruthy();
    expect(screen.getByText('Hỗ trợ')).toBeTruthy();
  });

  it('does NOT include the English-only Privacy/Terms/Contact link trio', () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <Footer />
        </LanguageProvider>
      </MemoryRouter>,
    );
    expect(screen.queryByText('Privacy')).toBeNull();
    expect(screen.queryByText('Terms')).toBeNull();
    expect(screen.queryByText('Contact')).toBeNull();
  });

  it('renders everything inside a single horizontal row on desktop', () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <Footer />
        </LanguageProvider>
      </MemoryRouter>,
    );
    const footer = screen.getByRole('contentinfo');
    const innerRow = footer.querySelector('div');
    expect(innerRow?.className).toMatch(/md:flex-row/);
  });
});