import renderer from 'react-test-renderer';
import { Text, View } from 'react-native';
import ResumeList from '../resumeList';
import useStyles from '../../hooks/styles/useStyles';
import HR from '../utils/hr';
import Resume from './resume';

jest.mock('react-native');
jest.mock('../resumeList');
jest.mock('../../hooks/styles/useStyles');
jest.mock('../utils/hr');

const renderTree = tree => renderer.create(tree);
describe('<Resume>', () => {
    it('should render component', () => {
        expect(renderTree(<Resume
        />).toJSON()).toMatchSnapshot();
    });

});
