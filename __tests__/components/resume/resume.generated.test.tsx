import { Text, View } from 'react-native';
import ResumeList from '@/components/resumeList';
import useStyles from '@/hooks/styles/useStyles';
import HR from '@/components/utils/hr';
import Resume from '@/components/resume/resume';
import { render } from '@testing-library/react-native';

jest.mock('react-native');
jest.mock('../resumeList');
jest.mock('../../hooks/styles/useStyles');
jest.mock('../utils/hr');

describe('<Resume>', () => {
    it('should render component', () => {
        expect(render(<Resume
        />).toJSON()).toMatchSnapshot();
    });

});
