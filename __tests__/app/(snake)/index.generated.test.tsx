import SnakeGame from '@/components/snake-v1/snake-game';
import useStyles from '@/hooks/styles/useStyles';
import PageLayoutView from '@/components/pageLayoutView';
import Snake3d from '@/app/(snake)/index';
import { render } from '@testing-library/react-native';

jest.mock('@/components/snake-v1/snake-game');
jest.mock('@/hooks/styles/useStyles');
jest.mock('@/components/pageLayoutView');

describe('<Snake3d>', () => {
    it('should render component', () => {
        expect(render(<Snake3d
        />).toJSON()).toMatchSnapshot();
    });

});
