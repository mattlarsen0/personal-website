import renderer from 'react-test-renderer';
import { ScrollView, View, ViewStyle } from 'react-native'
import GradientBar from './livery/gradientBar';
import useStyles from '@/hooks/styles/useStyles';
import PageLayoutView from './pageLayoutView';

jest.mock('react-native');
jest.mock('./livery/gradientBar');
jest.mock('@/hooks/styles/useStyles');

const renderTree = tree => renderer.create(tree);
describe('<PageLayoutView>', () => {
    it('should render component', () => {
        expect(renderTree(<PageLayoutView
            children={/* React.ReactElement */}
            style={/* ViewStyle */}
        />).toJSON()).toMatchSnapshot();
    });
    it('should render component with props', () => {
        expect(renderTree(<PageLayoutView
            children={/* React.ReactElement */}
            style={/* ViewStyle */}
        />).toJSON()).toMatchSnapshot();
    });
});
