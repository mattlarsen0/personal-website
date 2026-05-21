import { Text, View } from 'react-native';
import { Image } from 'expo-image';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
    withRepeat,
} from 'react-native-reanimated';

export default function LoadingScreen() {
    const rotation = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotateZ: `${rotation.value}deg` }],
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
        }
    });

    rotation.value = withRepeat(withTiming(360, { duration: 2000, easing: Easing.linear }), -1);
    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#808080' }}>
            <Animated.View style={animatedStyle}>
                <Image
                    source={require('@/assets/images/applesauce.png')}
                    style={{ flex: 1, width: '100%', aspectRatio: 1}}
                    contentFit='none'
                />
            </Animated.View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <Text style={{ fontSize: 24, color: '#e7e7e7', fontFamily: 'Arial' }}>Loading...</Text>
            </View>
        </View>
    )
};
