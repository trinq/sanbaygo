import { render, screen } from '@testing-library/react';
import { HowItWorks } from '../../../src/components/Landing/HowItWorks';
import { LanguageProvider } from '../../../src/contexts/LanguageContext';

describe('HowItWorks', () => {
  it('renders 3 steps', () => {
    render(
      <LanguageProvider>
        <HowItWorks />
      </LanguageProvider>
    );
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
