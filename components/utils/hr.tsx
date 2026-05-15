import { View } from "react-native";
import useStyles from "../styles/styles";

export default function HR() {
    const styles = useStyles();
    
    return (
        <View
            style={{
                marginTop: 2,
                marginBottom: 20,
                borderBottomColor: styles.text.color,
                borderBottomWidth: 1,
            }}
        />
    );
}
