import { render } from '@testing-library/react-native';
import { userEvent } from '@testing-library/react-native';

import SnakeGame from '@/components/snake-v1/snake-game';

describe('<SnakeGame />', () => {
  test('Text renders correctly on SnakeGame', async () => {
    const { getByText } = await render(<SnakeGame />);

    getByText(/START GAME/i);
  });

  test('Can be started and not immediately crash', async () => {
    const { getByText } = await render(<SnakeGame />);
    userEvent.press(getByText(/START GAME/i));
    expect(getByText('🧇')).toBeTruthy();
  });
});
