import Icon from '@/components/icon';
import Resume from '@/components/resume/resume';
import useStyles from '@/hooks/styles/useStyles';
import TechList from '@/components/techList';
import { Link } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import PageLayoutView from '@/components/pageLayoutView';
import Index from '@/app/(home)/index';
import { render } from '@testing-library/react-native';

jest.mock('@/components/resume/resume');
jest.mock('@/components/techList');
jest.mock('expo-router');
jest.mock('@/components/pageLayoutView');

describe('<Index>', () => {
    it('should render component', () => {
        expect(render(<Index
        />).toJSON()).toMatchSnapshot();
    });

});
