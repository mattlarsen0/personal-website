import { FlashList } from '@shopify/flash-list';
import { StyleProp, Text, TextStyle } from 'react-native';

type TechListProps = {
  data: React.ReactNode[];
  style?: StyleProp<TextStyle>;
};

export default function TechList(props: TechListProps) {
    return (
        <FlashList
            data={props.data}
            renderItem={({item}) => <Text style={props.style}>{item}</Text>}
            style={{margin: 10}}
        />
    );
}
