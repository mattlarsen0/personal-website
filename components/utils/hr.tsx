import { View } from 'react-native';
import useStyles from '../../hooks/styles/useStyles';

export default function HR() {
    const styles = useStyles();

    return (
        <View
            style={{
                marginTop: 2,
                marginBottom: 10,
                borderBottomColor: styles.text.color,
                borderBottomWidth: 1,
            }}
        />
    );
}
