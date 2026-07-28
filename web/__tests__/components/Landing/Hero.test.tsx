import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../../../src/contexts/LanguageContext';
import { Hero } from '../../../src/components/Landing/Hero';

describe('Hero', () => {
  it('renders the headline', () => {
    render(
      <LanguageProvider>
        <Hero />
      </LanguageProvider>,
    );
    // Headline is wrapped in an <h1>; chip text is in a <div> — restrict to h1.
    const headline = screen.getByRole('heading', { level: 1 });
    expect(headline.textContent).toMatch(/Chỉ cần nhập giờ đáp/i);
  });

  it('renders the tagline pill', () => {
    render(
      <LanguageProvider>
        <Hero />
      </LanguageProvider>,
    );
    expect(screen.getByText(/Dịch vụ xe đưa đón sân bay/i)).toBeTruthy();
  });

  it('renders 3 benefit chips', () => {
    render(
      <LanguageProvider>
        <Hero />
      </LanguageProvider>,
    );
    // Benefit chips use capitalised titles; the headline is lowercase.
    expect(screen.getByText('Nhanh nhất')).toBeTruthy();
    expect(screen.getByText('An toàn')).toBeTruthy();
    expect(screen.getByText('Tiết kiệm')).toBeTruthy();
  });

  it('renders social proof', () => {
    render(
      <LanguageProvider>
        <Hero />
      </LanguageProvider>,
    );
    // "4.9" appears both in the rating <span> and inside the socialProof string.
    // Target the rating specifically by its parent container.
    expect(screen.getByText('4.9')).toBeTruthy();
  });

  it('renders the footer', () => {
    render(
      <LanguageProvider>
        <Hero />
      </LanguageProvider>,
    );
    expect(screen.getByText(/Cách đơn giản nhất/i)).toBeTruthy();
    expect(screen.getByText('Điều khoản')).toBeTruthy();
    expect(screen.getByText('Bảo mật')).toBeTruthy();
    expect(screen.getByText('Hỗ trợ')).toBeTruthy();
  });
});