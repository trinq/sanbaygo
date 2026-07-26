import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider } from '../../../src/contexts/LanguageContext';
import { SearchCard } from '../../../src/components/Landing/SearchCard';

const noop = () => {};

const renderCard = (overrides = {}) => render(
  <LanguageProvider>
    <SearchCard
      departure={null}
      destination={null}
      people={1}
      carryOn={0}
      checked={0}
      onDepartureChange={noop}
      onDestinationChange={noop}
      onPeopleChange={noop}
      onCarryOnChange={noop}
      onCheckedChange={noop}
      onSubmit={noop}
      {...overrides}
    />
  </LanguageProvider>,
);

describe('SearchCard', () => {
  it('renders the departure label', () => {
    renderCard();
    expect(screen.getByText(/Sân bay khởi hành/i)).toBeTruthy();
  });

  it('CTA is disabled when fields are empty', () => {
    renderCard();
    expect(screen.getByRole('button', { name: /Tìm phương tiện/i })).toHaveProperty('disabled', true);
  });

  it('CTA is enabled when both fields are set', () => {
    renderCard({ departure: 'noi-bai', destination: 'old-quarter' });
    expect(screen.getByRole('button', { name: /Tìm phương tiện/i })).toHaveProperty('disabled', false);
  });

  it('calls onSubmit when CTA is clicked', () => {
    const onSubmit = jest.fn();
    renderCard({ departure: 'noi-bai', destination: 'old-quarter', onSubmit });
    fireEvent.click(screen.getByRole('button', { name: /Tìm phương tiện/i }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});