import { Dimensions, DimensionValue, Image, View } from 'react-native'

type GradientBarProps = {
    colors: string[]
};
const dimensions = Dimensions.get('window');

export default function GradientBar(props: GradientBarProps) {
    const bars = props.colors.map((color, index) => {
        const leftOffset = `${10 * index}%` as DimensionValue;
        return (
            <View style={{
                zIndex: 0,
                left: leftOffset,
                top: 0,
                height: '100%',
                width: dimensions.width/4,
                position: 'absolute'
            }} key={`gradientBar-${color}-${index}`}>
                <Image
                    source={require("@/assets/images/gradient.png")}
                    style={{
                        tintColor: color,
                        resizeMode: "contain",
                        width: '100%',
                        aspectRatio: 1,
                        flex: 1,
                        left: leftOffset,
                        top: 0,
                    }}
                />
            </View>
        );
    })
    return (
        <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
            height: dimensions.height,
            width: '100%',
        }}>
            {bars}
        </View>
    );
}