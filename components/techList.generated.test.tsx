import renderer from 'react-test-renderer';
import { FlatList, StyleProp, Text, TextStyle } from 'react-native';
import TechList from './techList';

jest.mock('react-native');

const renderTree = tree => renderer.create(tree);
describe('<TechList>', () => {
    it('should render component', () => {
        expect(renderTree(<TechList
            data={/* React.ReactNode[] */}
        />).toJSON()).toMatchSnapshot();
    });
    it('should render component with props', () => {
        expect(renderTree(<TechList
            data={/* React.ReactNode[] */}
            style={/* StyleProp<TextStyle> */}
        />).toJSON()).toMatchSnapshot();
    });
});
