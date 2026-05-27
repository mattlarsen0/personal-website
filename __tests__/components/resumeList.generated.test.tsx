import { FlatList, StyleProp, Text, TextStyle, View } from 'react-native';
import useStyles from '@/hooks/styles/useStyles';
import ResumeList from '@/components/resumeList';
import { render } from '@testing-library/react-native';

jest.unmock('@/components/resumeList');

const testProps = {
    data: [
        'Test 1',
        'Test 2',
        'Test 3',
    ]
}

describe('<ResumeList>', () => {
    it('should render component', () => {
        expect(render(<ResumeList
            data={testProps.data}
        />).toJSON()).toMatchSnapshot();
    });
    it('should render component with props', () => {
        expect(render(<ResumeList
            data={testProps.data}
        />).toJSON()).toMatchSnapshot();
    });
});
