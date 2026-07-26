import { fireEvent, render } from '@testing-library/react-native';
import { AirportPicker } from '../AirportPicker';

const labels = {
  'noi-bai': 'Sân bay Nội Bài',
  'tan-son-nhat': 'Sân bay Tân Sơn Nhất',
} as const;

const renderPicker = (overrides: Partial<React.ComponentProps<typeof AirportPicker>> = {}) =>
  render(
    <AirportPicker
      value={null}
      onChange={() => {}}
      label="Sân bay khởi hành"
      placeholder="Chọn sân bay"
      airportLabels={labels}
      {...overrides}
    />,
  );

describe('AirportPicker (RN)', () => {
  it('renders placeholder when no airport is selected', () => {
    const { getByText } = renderPicker();
    expect(getByText('Chọn sân bay')).toBeTruthy();
  });

  it('opens the dropdown and lists all airports', () => {
    const { getByText, queryByText } = renderPicker();

    expect(queryByText('Sân bay Nội Bài')).toBeNull();
    expect(queryByText('Sân bay Tân Sơn Nhất')).toBeNull();

    fireEvent.press(getByText('Chọn sân bay'));

    expect(getByText('Sân bay Nội Bài')).toBeTruthy();
    expect(getByText('Sân bay Tân Sơn Nhất')).toBeTruthy();
  });

  it('calls onChange with the selected airport id and closes the dropdown', () => {
    const onChange = jest.fn();
    const { getByText, queryByText } = renderPicker({ onChange });

    fireEvent.press(getByText('Chọn sân bay'));
    fireEvent.press(getByText('Sân bay Tân Sơn Nhất'));

    expect(onChange).toHaveBeenCalledWith('tan-son-nhat');
    expect(queryByText('Sân bay Nội Bài')).toBeNull();
  });
});
