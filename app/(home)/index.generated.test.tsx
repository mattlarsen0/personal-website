import renderer from 'react-test-renderer';
import Icon from '@/components/icon';
import Resume from '@/components/resume/resume';
import useStyles from '@/hooks/styles/useStyles';
import TechList from '@/components/techList';
import { Link } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import PageLayoutView from '@/components/pageLayoutView';
import Index from './index';

jest.mock('@/components/icon');
jest.mock('@/components/resume/resume');
jest.mock('@/hooks/styles/useStyles');
jest.mock('@/components/techList');
jest.mock('expo-router');
jest.mock('react-native');
jest.mock('@/components/pageLayoutView');

const renderTree = tree => renderer.create(tree);
describe('<Index>', () => {
    it('should render component', () => {
        expect(renderTree(<Index
        />).toJSON()).toMatchSnapshot();
    });

});
