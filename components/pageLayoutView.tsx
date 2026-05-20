import { ScrollView, View, ViewStyle } from 'react-native'
import GradientBar from './livery/gradientBar';
import useStyles from '@/hooks/styles/useStyles';

type PageLayoutViewProps = {
    children: React.ReactElement,
    style: ViewStyle
}

const allowedColors = ['#ff1100','#ffd000','#00970d', '#6e7dff', '#940080', '#32e7ff'];
const colors: string[] = [];
for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * allowedColors.length);
    const randomColor = allowedColors[randomIndex];
    allowedColors.splice(randomIndex, 1);

    colors.push(randomColor);
}
    
export default function PageLayoutView(props: PageLayoutViewProps) {
    const styles = useStyles();
    return (
        <View style={styles.background}>
            <GradientBar colors={colors} />
            <ScrollView>
                <View style={props.style}>
                    {props.children}
                </View>
            </ScrollView>
        </View>
    );
}