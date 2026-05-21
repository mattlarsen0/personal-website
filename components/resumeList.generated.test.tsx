import renderer from 'react-test-renderer';
import { FlatList, Text } from 'react-native';
import useStyles from '../hooks/styles/useStyles';
import ResumeList from './resumeList';

jest.mock('react-native');
jest.mock('../hooks/styles/useStyles');

const renderTree = tree => renderer.create(tree);
describe('<ResumeList>', () => {
    it('should render component', () => {
        expect(renderTree(<ResumeList
            data={/* string[] */}
        />).toJSON()).toMatchSnapshot();
    });
    it('should render component with props', () => {
        expect(renderTree(<ResumeList
            data={/* string[] */}
        />).toJSON()).toMatchSnapshot();
    });
});
