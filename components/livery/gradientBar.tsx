import { View, ViewStyle, useWindowDimensions } from 'react-native'
import useStyles from '@/hooks/styles/useStyles';

type GradientBarProps = {
    colors: string[]
};

export default function GradientBar(props: GradientBarProps) {
    const styles = useStyles();
    const dimensions = useWindowDimensions();
    const barWidth = Math.min(dimensions.width / 20, 100);
    const barPadding = 50;
    const sharedStyles: ViewStyle = {
        borderWidth: 2,
        borderColor: '#000000',
        width: barWidth,
        position: 'relative',
    };

    const bars = props.colors.map((color, index) => {
        const left = (barWidth * index) + (barPadding * index);
        const angledBarHeight = index * Math.min(dimensions.width / 10, 100);
        const barContainer: ViewStyle = {
            flexDirection: 'row',
            position: 'absolute',
            top: 0,
            left: 0
        };

        return (
            <View key={`gradientBar-${color}-${index}`}>
                <View style={barContainer}>
                    <View style={{
                        ...sharedStyles,
                        backgroundColor: color,
                        transform: [{
                            rotate: '-45deg'
                        }],
                        borderWidth: 1,
                        borderColor: styles.titleText.color,
                        height: angledBarHeight,
                        left: left,
                        top: 0
                    }}/>
                </View>
                <View style={barContainer}>
                    <View style={{
                        ...sharedStyles,
                        backgroundColor: color,
                        height: dimensions.height,
                        transform: [{
                            rotate: '0deg'
                        }],
                        left: left,
                        top: angledBarHeight/2
                    }}/>
                </View>
            </View>
        );

    })
    return (
        <View style={{
            position: 'absolute',
            height: '100%',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1
        }}>
           {bars} 
        </View>
    );
}