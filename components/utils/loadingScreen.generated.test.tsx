import renderer from 'react-test-renderer';
import { Text, View } from 'react-native';
import { Image } from 'expo-image';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
    withRepeat,
} from 'react-native-reanimated';
import LoadingScreen from './loadingScreen';

jest.mock('react-native');
jest.mock('expo-image');
jest.mock('react-native-reanimated');

const renderTree = tree => renderer.create(tree);
describe('<LoadingScreen>', () => {
    it('should render component', () => {
        expect(renderTree(<LoadingScreen
        />).toJSON()).toMatchSnapshot();
    });

});
