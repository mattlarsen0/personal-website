import { Text } from 'react-native';
import useStyles from '@/hooks/styles/useStyles';
import { FlashList } from '@shopify/flash-list';

type ResumeListProps = {
  data: string[];
};

export default function ResumeList(props: ResumeListProps) {
    const styles = useStyles();
    return (
        <FlashList
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
