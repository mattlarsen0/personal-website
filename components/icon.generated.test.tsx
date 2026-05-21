import renderer from 'react-test-renderer';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import useStyles from '../hooks/styles/useStyles';
import Icon from './icon';

jest.mock('@expo/vector-icons/FontAwesome5');
jest.mock('../hooks/styles/useStyles');

const renderTree = tree => renderer.create(tree);
describe('<Icon>', () => {
    it('should render component', () => {
        expect(renderTree(<Icon
            name={/* string */}
        />).toJSON()).toMatchSnapshot();
    });
    it('should render component with props', () => {
        expect(renderTree(<Icon
            name={/* string */}
            size={/* number */}
            color={/* string */}
        />).toJSON()).toMatchSnapshot();
    });
});
