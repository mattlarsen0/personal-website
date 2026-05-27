import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import useStyles from '@/hooks/styles/useStyles';
import Icon from '@/components/icon';
import { render } from '@testing-library/react-native';

jest.unmock('@/components/icon');

const testProps = {
    name: 'test-icon',
    size: 24,
    color: '#000000',
}

describe('<Icon>', () => {
    it('should render component', () => {
        expect(render(<Icon
            name={testProps.name}
        />).toJSON()).toMatchSnapshot();
    });
    it('should render component with props', () => {
        expect(render(<Icon
            name={testProps.name}
            size={testProps.size}
            color={testProps.color}
        />).toJSON()).toMatchSnapshot();
    });
});
