import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider } from '../../../src/contexts/LanguageContext';
import { SearchCard } from '../../../src/components/Landing/SearchCard';

const noop = () => {};

const baseProps = {
  departure: null as string | null,
  destination: null as string | null,
  people: 1,
  carryOn: false,
  checked: false,
  onDepartureChange: noop,
  onDestinationChange: noop,
  onPeopleChange: noop,
  onCarryOnChange: noop,
  onCheckedChange: noop,
  onSubmit: noop,
};

describe('SearchCard baggage — toggle chips (no stepper)', () => {
  it('renders two toggle buttons: "Hành lý xách tay" and "Hành lý ký gửi"', () => {
    render(
      <LanguageProvider>
        <SearchCard {...baseProps} />
      </LanguageProvider>,
    );
    expect(screen.getByRole('button', { name: /Hành lý xách tay/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /Hành lý ký gửi/i })).toBeTruthy();
  });

  it('does NOT render any + or − buttons for baggage', () => {
    render(
      <LanguageProvider>
        <SearchCard {...baseProps} />
      </LanguageProvider>,
    );
    expect(screen.queryByRole('button', { name: /Hành lý xách tay tăng/i })).toBeNull();
    expect(screen.queryByRole('button', { name: /Hành lý xách tay giảm/i })).toBeNull();
    expect(screen.queryByRole('button', { name: /Hành lý ký gửi tăng/i })).toBeNull();
    expect(screen.queryByRole('button', { name: /Hành lý ký gửi giảm/i })).toBeNull();
  });

  it('carry-on chip is unpressed by default', () => {
    render(
      <LanguageProvider>
        <SearchCard {...baseProps} />
      </LanguageProvider>,
    );
    const chip = screen.getByRole('button', { name: /Hành lý xách tay/i });
    expect(chip.getAttribute('aria-pressed')).toBe('false');
  });

  it('checked chip is unpressed by default', () => {
    render(
      <LanguageProvider>
        <SearchCard {...baseProps} />
      </LanguageProvider>,
    );
    const chip = screen.getByRole('button', { name: /Hành lý ký gửi/i });
    expect(chip.getAttribute('aria-pressed')).toBe('false');
  });

  it('clicking carry-on chip toggles it on (aria-pressed=true) via the carry-on setter', () => {
    const onCarryOnChange = jest.fn();
    render(
      <LanguageProvider>
        <SearchCard {...baseProps} onCarryOnChange={onCarryOnChange} />
      </LanguageProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: /Hành lý xách tay/i }));
    expect(onCarryOnChange).toHaveBeenCalledWith(true);
  });

  it('clicking carry-on chip a second time toggles it off (setter receives false)', () => {
    const onCarryOnChange = jest.fn();
    render(
      <LanguageProvider>
        <SearchCard {...baseProps} carryOn={true} onCarryOnChange={onCarryOnChange} />
      </LanguageProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: /Hành lý xách tay/i }));
    expect(onCarryOnChange).toHaveBeenCalledWith(false);
  });

  it('checked chip is independent — clicking carry-on does not call onCheckedChange', () => {
    const onCarryOnChange = jest.fn();
    const onCheckedChange = jest.fn();
    render(
      <LanguageProvider>
        <SearchCard
          {...baseProps}
          onCarryOnChange={onCarryOnChange}
          onCheckedChange={onCheckedChange}
        />
      </LanguageProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: /Hành lý xách tay/i }));
    expect(onCarryOnChange).toHaveBeenCalledTimes(1);
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('user can select BOTH chips simultaneously (multi-select)', () => {
    const onCarryOnChange = jest.fn();
    const onCheckedChange = jest.fn();
    render(
      <LanguageProvider>
        <SearchCard
          {...baseProps}
          carryOn={true}
          checked={true}
          onCarryOnChange={onCarryOnChange}
          onCheckedChange={onCheckedChange}
        />
      </LanguageProvider>,
    );
    const carry = screen.getByRole('button', { name: /Hành lý xách tay/i });
    const checked = screen.getByRole('button', { name: /Hành lý ký gửi/i });
    expect(carry.getAttribute('aria-pressed')).toBe('true');
    expect(checked.getAttribute('aria-pressed')).toBe('true');
  });

  it('reflects active state visually: active chip has primary background, inactive has white', () => {
    render(
      <LanguageProvider>
        <SearchCard {...baseProps} carryOn={true} checked={false} />
      </LanguageProvider>,
    );
    const carry = screen.getByRole('button', { name: /Hành lý xách tay/i });
    const checked = screen.getByRole('button', { name: /Hành lý ký gửi/i });
    expect(carry.className).toMatch(/bg-primary/);
    expect(checked.className).not.toMatch(/bg-primary/);
  });
});