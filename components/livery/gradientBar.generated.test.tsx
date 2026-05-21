import renderer from 'react-test-renderer';
import { DimensionValue, useWindowDimensions, View } from 'react-native'
import Gradient from '../../assets/images/svg/gradientMin.svg';
import GradientBar from './gradientBar';

jest.mock('react-native');
jest.mock('../../assets/images/svg/gradientMin.svg');

const renderTree = tree => renderer.create(tree);
describe('<GradientBar>', () => {
    it('should render component with one color', () => {
        expect(renderTree(<GradientBar
            colors={['red']}
        />).toJSON()).toMatchSnapshot();
    });
    it('should render component with two colors', () => {
        expect(renderTree(<GradientBar
            colors={['red', 'white']}
        />).toJSON()).toMatchSnapshot();
    });
    it('should render component with three colors', () => {
        expect(renderTree(<GradientBar
            colors={['red','white', 'blue']}
        />).toJSON()).toMatchSnapshot();
    });
});
