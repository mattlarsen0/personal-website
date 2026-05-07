import { FlatList, StyleProp, Text, TextStyle } from "react-native";

type TechListProps = {
  data: React.ReactNode[];
  style?: StyleProp<TextStyle>;
};

export default function TechList(props: TechListProps) {
  return (
        <FlatList
            data={props.data}
            renderItem={({item}) => <Text style={props.style}>{item}</Text>}
            style={{margin: 10}}
        />
  );
}
