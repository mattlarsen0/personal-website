import { DimensionValue, useWindowDimensions, View } from 'react-native'
import GradientBar from '@/components/livery/gradientBar';
import { render } from '@testing-library/react-native';

jest.unmock('@/components/livery/gradientBar');

jest.mock('@/assets/images/svg/gradientMin.svg', () => ({
    __esModule: true,
    default: jest.fn(() => (<div className='svg'></div>)),
}));

describe('<GradientBar>', () => {
    it('should render component with one color', async () => {
        const result = await render(<GradientBar
            colors={['red']}
        />).toJSON();
        expect(result).toMatchSnapshot();
    });
    it('should render component with two colors', async () => {
        const result = await render(<GradientBar
            colors={['red', 'white']}
        />).toJSON();
        expect(result).toMatchSnapshot();
    });
    it('should render component with three colors', async () => {
        const result = await render(<GradientBar
            colors={['red','white', 'blue']}
        />).toJSON();
        expect(result).toMatchSnapshot();
    });
});
