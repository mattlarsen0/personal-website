import { ScrollView, View, ViewStyle } from 'react-native'
import GradientBar from './livery/gradientBar';

type PageLayoutViewProps = {
    children: React.ReactElement,
    style: ViewStyle
}

export default function PageLayoutView(props: PageLayoutViewProps) {
    return (
        <ScrollView>
            <GradientBar colors={['yellow','red','black']} />
            <View style={props.style}>
                {props.children}
            </View>
        </ScrollView>
    );
}