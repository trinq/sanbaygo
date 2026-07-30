import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../../../src/contexts/LanguageContext';
import { Hero } from '../../../src/components/Landing/Hero';

describe('Hero', () => {
  it('renders the headline', () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <Hero />
        </LanguageProvider>
      </MemoryRouter>,
    );
    // Headline is wrapped in an <h1>; chip text is in a <div> — restrict to h1.
    const headline = screen.getByRole('heading', { level: 1 });
    expect(headline.textContent).toMatch(/Chỉ cần nhập giờ đáp/i);
  });

  it('renders the tagline pill', () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <Hero />
        </LanguageProvider>
      </MemoryRouter>,
    );
    expect(screen.getByText(/Dịch vụ xe đưa đón sân bay/i)).toBeTruthy();
  });

  it('renders 3 benefit chips', () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <Hero />
        </LanguageProvider>
      </MemoryRouter>,
    );
    // Benefit chips use capitalised titles; the headline is lowercase.
    expect(screen.getByText('Nhanh nhất')).toBeTruthy();
    expect(screen.getByText('An toàn')).toBeTruthy();
    expect(screen.getByText('Tiết kiệm')).toBeTruthy();
  });

  it('renders social proof', () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <Hero />
        </LanguageProvider>
      </MemoryRouter>,
    );
    expect(screen.getByText('Miễn phí')).toBeTruthy();
    expect(screen.getByText('Không cần tải app, không cần đăng ký')).toBeTruthy();
  });
});