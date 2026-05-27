import { Text, View } from 'react-native';
import ResumeList from '@/components/resumeList';
import useStyles from '@/hooks/styles/useStyles';
import HR from '@/components/utils/hr';
import Resume from '@/components/resume/resume';
import { render } from '@testing-library/react-native';

jest.unmock('@/components/resume/resume');

describe('<Resume>', () => {
    it('should render component', async () => {
        const result = await render(<Resume
        />).toJSON();
        expect(result).toMatchSnapshot();
    });
});
