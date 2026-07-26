import { render, screen, fireEvent } from '@testing-library/react';
import { AirportPicker } from '../../../src/components/Landing/AirportPicker';

const noop = () => {};

const renderPicker = (overrides = {}) =>
  render(<AirportPicker value={null} onChange={noop} {...overrides} />);

describe('AirportPicker', () => {
  it('renders placeholder when no airport selected', () => {
    renderPicker();
    expect(screen.getByText('Chọn sân bay')).toBeTruthy();
  });

  it('opens dropdown and shows both airports', () => {
    renderPicker();
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Sân bay Nội Bài')).toBeTruthy();
    expect(screen.getByText('Sân bay Tân Sơn Nhất')).toBeTruthy();
  });

  it('calls onChange with the selected airport id', () => {
    const onChange = jest.fn();
    renderPicker({ onChange });
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Sân bay Tân Sơn Nhất'));
    expect(onChange).toHaveBeenCalledWith('tan-son-nhat');
  });
});
