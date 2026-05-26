import { Text, View } from 'react-native';
import { Image } from 'expo-image';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
    withRepeat,
} from 'react-native-reanimated';
import LoadingScreen from '@/components/utils/loadingScreen';
import { render } from '@testing-library/react-native';

jest.mock('react-native');
jest.mock('expo-image');
jest.mock('react-native-reanimated');

describe('<LoadingScreen>', () => {
    it('should render component', () => {
        expect(render(<LoadingScreen
        />).toJSON()).toMatchSnapshot();
    });

});
