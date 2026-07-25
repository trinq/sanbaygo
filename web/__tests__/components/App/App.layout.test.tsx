import { render } from '@testing-library/react';
import { LanguageProvider } from '../../../src/contexts/LanguageContext';
import App from '../../../src/App';

describe('App layout', () => {
  it('does not render a sidebar element on desktop', () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 1280,
    });

    const { container } = render(
      <LanguageProvider>
        <App />
      </LanguageProvider>,
    );

    expect(container.querySelector('aside')).toBeNull();
    expect(container.querySelector('input[type="search"]')).toBeNull();
  });
});
