import { FlatList, Text } from 'react-native';
import useStyles from '@/hooks/styles/useStyles';

type ResumeListProps = {
  data: string[];
};

export default function ResumeList(props: ResumeListProps) {
    const styles = useStyles();
    return (
        <FlatList
            data={props.data.map((item, index) => {
                return {
                    key: index,
                    value: item
                }
            })}
            renderItem={({item}) => <Text style={styles.text}>• {item.value}</Text>}
            style={styles.list}
        />
    );
}
