import { DimensionValue, useWindowDimensions, View } from 'react-native'
import Gradient from '@/assets/images/svg/gradientMin.svg';
type GradientBarProps = {
    colors: string[]
};

export default function GradientBar(props: GradientBarProps) {
    const { width } = useWindowDimensions();
    const bars = props.colors.map((color, index) => {
        const leftOffset = `${3 * index}%` as DimensionValue;
        return (
            <View style={{
                left: leftOffset,
                top: 0,
                height: '100%',
                width: width/3,
                position: 'absolute',
                minWidth: 250
            }} key={`gradientBar-${color}-${index}`}>
                <Gradient
                    width='100%'
                    height='100%'
                    fill={color}
                />
            </View>
        );
    })
    return (
        <View style={{
            zIndex: 0,
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
        }}>
            {bars}
        </View>
    );
}
