import { FlatList, Text } from "react-native";
import useStyles from "./styles/styles";

type ResumeListProps = {
  data: string[];
};

export default function ResumeList(props: ResumeListProps) {
  const styles = useStyles();
  return (
        <FlatList
            data={props.data.map(item => {
                return {
                    key: item
                }
            })}
            renderItem={({item}) => <Text style={styles.text}>• {item.key}</Text>}
            style={styles.list}
        />
  );
}
