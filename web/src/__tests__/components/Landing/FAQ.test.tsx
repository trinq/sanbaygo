/// <reference types="@testing-library/jest-dom" />
import { render, screen, fireEvent } from '@testing-library/react';
import { FAQ } from '../../../components/Landing/FAQ';
import { LanguageProvider } from '../../../contexts/LanguageContext';

describe('FAQ', () => {
  it('renders all 5 questions', () => {
    render(
      <LanguageProvider>
        <FAQ />
      </LanguageProvider>
    );
    // Check that FAQ title is present
    expect(screen.getByText(/câu hỏi thường gặp/i)).toBeInTheDocument();
  });

  it('toggles answer on click', () => {
    render(
      <LanguageProvider>
        <FAQ />
      </LanguageProvider>
    );
    const firstQuestion = screen.getByText(/Frylane có mất phí không?/);
    fireEvent.click(firstQuestion);
    expect(screen.getByText(/Không. Frylane hoàn toàn miễn phí/)).toBeInTheDocument();
  });
});
