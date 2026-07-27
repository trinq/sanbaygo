import { render, screen, fireEvent } from '@testing-library/react';
import { TimePicker } from '../../../src/components/Landing/TimePicker';

describe('TimePicker', () => {
  it('renders an HTML time input pre-filled with the value', () => {
    render(<TimePicker label="Giờ đáp cánh" value="08:30" onChange={() => {}} />);
    const input = screen.getByLabelText('Giờ đáp cánh') as HTMLInputElement;
    expect(input.type).toBe('time');
    expect(input.value).toBe('08:30');
  });

  it('renders an accessible hint when provided', () => {
    render(
      <TimePicker
        label="Giờ đáp cánh"
        hint="Thời gian máy bay chạm bánh"
        value="12:00"
        onChange={() => {}}
      />,
    );
    expect(screen.getByText(/Thời gian máy bay chạm bánh/i)).toBeInTheDocument();
    const input = screen.getByLabelText(/Giờ đáp cánh/i) as HTMLInputElement;
    expect(input.getAttribute('aria-describedby')).toBe('landing-arrival-time-hint');
  });

  it('calls onChange with the new HH:mm value when the user changes the time', () => {
    const onChange = jest.fn();
    render(<TimePicker label="Giờ đáp cánh" value="12:00" onChange={onChange} />);
    const input = screen.getByLabelText('Giờ đáp cánh') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '21:30' } });
    expect(onChange).toHaveBeenCalledWith('21:30');
  });
});