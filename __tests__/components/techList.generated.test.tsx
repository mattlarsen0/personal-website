import { FlatList, StyleProp, Text, TextStyle, View } from 'react-native';
import TechList from '@/components/techList';
import { render } from '@testing-library/react-native';

jest.mock('react-native');

const testProps = {
    data: [<View />],
    style: {/* StyleProp<TextStyle> */} as StyleProp<TextStyle>,
}

describe('<TechList>', () => {
    it('should render component', () => {
        expect(render(<TechList
            data={testProps.data}
        />).toJSON()).toMatchSnapshot();
    });
    it('should render component with props', () => {
        expect(render(<TechList
            data={testProps.data}
            style={testProps.style}
        />).toJSON()).toMatchSnapshot();
    });
});
