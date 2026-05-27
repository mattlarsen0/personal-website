import { DimensionValue, useWindowDimensions, View } from 'react-native'
import GradientBar from '@/components/livery/gradientBar';
import { render } from '@testing-library/react-native';

jest.mock('@/assets/images/svg/gradientMin.svg', () => ({
    __esModule: true,
    default: jest.fn(() => (<div className='svg'></div>)),
}));

describe('<GradientBar>', () => {
    it('should render component with one color', () => {
        const result = render(<GradientBar
            colors={['red']}
        />).toJSON();
        expect(result).toMatchSnapshot();
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
