import renderer from 'react-test-renderer';
import { View } from 'react-native';
import useStyles from '../../hooks/styles/useStyles';
import HR from './hr';

jest.mock('react-native');
jest.mock('../../hooks/styles/useStyles');

const renderTree = tree => renderer.create(tree);
describe('<HR>', () => {
    it('should render component', () => {
        expect(renderTree(<HR
        />).toJSON()).toMatchSnapshot();
    });

});
