import React from 'react';
import { render } from '@testing-library/react-native';
import { ResultCard } from '../../primitives/ResultCard';
import { ds } from '../../tokens';

describe('<ResultCard /> (RN)', () => {
  it('renders tier 1 background by default', () => {
    const { getByTestId } = render(<ResultCard testID="card">x</ResultCard>);
    const view = getByTestId('card');
    const flat = JSON.stringify(view.props.style);
    expect(flat).toContain(ds.glass['1'].background);
  });

  it('renders tier 3 background when tier={3}', () => {
    const { getByTestId } = render(<ResultCard tier={3} testID="card">x</ResultCard>);
    const view = getByTestId('card');
    const flat = JSON.stringify(view.props.style);
    expect(flat).toContain(ds.glass['3'].background);
  });

  it('applies border color and radius', () => {
    const { getByTestId } = render(<ResultCard testID="card">x</ResultCard>);
    const flat = JSON.stringify(getByTestId('card').props.style);
    expect(flat).toContain(String(ds.radius.lg));
    expect(flat).toContain(ds.semantic.borderGlass);
  });
});
