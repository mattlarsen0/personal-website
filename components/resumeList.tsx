import { FlatList, Text } from "react-native";

type ResumeListProps = {
  data: string[];
};

export default function ResumeList(props: ResumeListProps) {
  return (
        <FlatList
            data={props.data.map(item => {
                return {
                    key: item
                }
            })}
            renderItem={({item}) => <Text>• {item.key}</Text>}
            style={{ margin: 10 }}
        />
  );
}
