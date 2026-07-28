import { render } from '@testing-library/react';
import { LanguageProvider } from '../../../src/contexts/LanguageContext';
import { LandingPage } from '../../../src/components/Landing/LandingPage';

const noop = () => {};

describe('Landing layout (footer at page bottom)', () => {
  it('outer page wrapper uses min-h-screen + flex + flex-col so the footer can sit at the bottom', () => {
    const { container } = render(
      <LanguageProvider>
        <LandingPage onSearch={noop} />
      </LanguageProvider>,
    );
    const outer = container.firstElementChild;
    expect(outer).toBeTruthy();
    const cls = outer?.className ?? '';
    expect(cls).toMatch(/min-h-screen/);
    expect(cls).toMatch(/\bflex\b/);
    expect(cls).toMatch(/flex-col/);
  });

  it('main content area uses flex-1 so it pushes the footer to the bottom on short pages', () => {
    const { container } = render(
      <LanguageProvider>
        <LandingPage onSearch={noop} />
      </LanguageProvider>,
    );
    const main = container.querySelector<HTMLElement>('main, [data-testid="landing-main"]');
    expect(main).toBeTruthy();
    const cls = main?.className ?? '';
    expect(cls).toMatch(/flex-1/);
  });

  it('footer is rendered as a normal flow element at the bottom of the page (NOT fixed / NOT absolute)', () => {
    const { container } = render(
      <LanguageProvider>
        <LandingPage onSearch={noop} />
      </LanguageProvider>,
    );
    const footer = container.querySelector('footer');
    expect(footer).toBeTruthy();
    const cls = footer?.className ?? '';
    expect(cls).not.toMatch(/\bfixed\b/);
    expect(cls).not.toMatch(/\babsolute\b/);
  });
});