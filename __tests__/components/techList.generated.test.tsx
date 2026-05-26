import { FlatList, StyleProp, Text, TextStyle, View } from 'react-native';
import TechList from '@/components/techList';
import { render } from '@testing-library/react-native';

const testProps = {
    data: ['test'],
    style: {},
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
