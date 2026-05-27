import { FlatList, StyleProp, Text, TextStyle, View } from 'react-native';
import TechList from '@/components/techList';
import { render } from '@testing-library/react-native';

jest.unmock('@/components/techList');

const testProps = {
    data: [
        <div key='1'>Test 1</div>,
        <div key='2'>Test 2</div>,
        <div key='3'>Test 3</div>,
    ],
    style: {
        fontSize: 20,
    },
}

describe('<TechList>', () => {
    it('should render component', async () => {
        const result = await render(<TechList
            data={testProps.data}
        />).toJSON();
        expect(result).toMatchSnapshot();
    });
    it('should render component with props', async () => {
        const result = await render(<TechList
            data={testProps.data}
            style={testProps.style}
        />).toJSON();
        expect(result).toMatchSnapshot();
    });
});
