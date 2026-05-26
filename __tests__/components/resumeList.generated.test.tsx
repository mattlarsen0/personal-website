import { FlatList, Text, View } from 'react-native';
import useStyles from '@/hooks/styles/useStyles';
import ResumeList from '@/components/resumeList';
import { render } from '@testing-library/react-native';

jest.mock('react-native');
jest.mock('@/hooks/styles/useStyles');

const testProps = {
    data: ['test']
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
