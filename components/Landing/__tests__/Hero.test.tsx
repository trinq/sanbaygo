import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Hero } from '../Hero';

describe('Hero (RN)', () => {
  it('renders the headline text', () => {
    const { getByText } = render(
      <Hero>
        <Text>child</Text>
      </Hero>,
    );

    expect(getByText(/Cách nhanh nhất/)).toBeTruthy();
  });

  it('renders 3 benefit chips', () => {
    const { getByText } = render(
      <Hero>
        <Text>child</Text>
      </Hero>,
    );

    expect(getByText('Nhanh nhất')).toBeTruthy();
    expect(getByText('An toàn')).toBeTruthy();
    expect(getByText('Tiết kiệm')).toBeTruthy();
  });

  it('renders children', () => {
    const { getByText } = render(
      <Hero>
        <Text>search-card-child</Text>
      </Hero>,
    );

    expect(getByText('search-card-child')).toBeTruthy();
  });
});
