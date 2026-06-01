import { Text, View } from 'react-native';
import useStyles from '@/hooks/styles/useStyles';

type ResumeListProps = {
  data: string[];
};

export default function ResumeList(props: ResumeListProps) {
    const styles = useStyles();
    const items = props.data.map((item, index) =>
        <View key={`resumeListItem-${index}`}>
            <Text style={styles.text}>• {item}</Text>
        </View>
    );

    return (
        <View style={styles.list}>
            {items}
        </View>
    );
}
