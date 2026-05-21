import renderer from 'react-test-renderer';
import SnakeGame from '@/components/snake-v1/snake-game';
import useStyles from '@/hooks/styles/useStyles';
import PageLayoutView from '@/components/pageLayoutView';
import Snake3d from './index';

jest.mock('@/components/snake-v1/snake-game');
jest.mock('@/hooks/styles/useStyles');
jest.mock('@/components/pageLayoutView');

const renderTree = tree => renderer.create(tree);
describe('<Snake3d>', () => {
    it('should render component', () => {
        expect(renderTree(<Snake3d
        />).toJSON()).toMatchSnapshot();
    });

});
