import LoadingScreen from '@/components/utils/loadingScreen';
import { render } from '@testing-library/react-native';

jest.unmock('@/components/utils/loadingScreen');

jest.mock('expo-image', () => {
    return {
        Image: jest.fn().mockImplementation(() => {
            return null;
        }),
    };
});
jest.mock('react-native-reanimated', () => {
    const mockTiming = 360;
    const mockEasing = {
        linear: 'test-easing',
    }
    const mockAnimationConfig = { duration: 2000, easing: mockEasing }
    const mockWithTimingResult = {
        data: 'test-timing-result',
    }
    const mockWithRepeatResult = {
        data: 'test-repeat-result',
    }
    const mockAnimatedStyleResult = {
        transform: [{ rotateZ: '5deg' }],
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    };

    return {
        __esModule: true,
        default: {
            View: jest.fn().mockImplementation(() => {
                return <div className="animated-view"></div>;
            }),
            Text: jest.fn().mockImplementation(() => {
                return <div className="animated-text"></div>;
            }),
        },
        useAnimatedStyle: jest.fn().mockReturnValue(mockAnimatedStyleResult),
        useSharedValue: jest.fn().mockImplementation((rotation) => {
            if (rotation === 0) {
                return {
                    value: 0,
                };
            }
        }),
        withTiming: jest.fn().mockImplementation((timing, animation) => {
            if (timing === mockTiming && animation.duration === mockAnimationConfig.duration && animation.easing === mockAnimationConfig.easing) {
                return mockWithTimingResult;
            }
        }),
        withRepeat: jest.fn().mockImplementation((timing, repeatCount) => {
            if (timing === mockWithRepeatResult && repeatCount === -1) {
                return ;
            }
        }),
        Easing: mockEasing
    };
});

describe('<LoadingScreen>', () => {
    it('should render component', async () => {
        const result = await render(<LoadingScreen
        />).toJSON();
        expect(result).toMatchSnapshot();
    });

});
