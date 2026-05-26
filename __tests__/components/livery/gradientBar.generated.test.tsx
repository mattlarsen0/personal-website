import { DimensionValue, useWindowDimensions, View } from 'react-native'
const Gradient = require('@/assets/images/svg/gradientMin.svg');
import GradientBar from '@/components/livery/gradientBar';
import { render } from '@testing-library/react-native';

jest.mock('react-native');
jest.mock('@/assets/images/svg/gradientMin.svg');

describe('<GradientBar>', () => {
    it('should render component with one color', () => {
        expect(render(<GradientBar
            colors={['red']}
        />).toJSON()).toMatchSnapshot();
    });
    it('should render component with two colors', () => {
        expect(render(<GradientBar
            colors={['red', 'white']}
        />).toJSON()).toMatchSnapshot();
    });
    it('should render component with three colors', () => {
        expect(render(<GradientBar
            colors={['red','white', 'blue']}
        />).toJSON()).toMatchSnapshot();
    });
});
