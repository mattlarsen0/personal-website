import SnakeGame from "@/components/snake-v1/snake-game";
import { View } from "react-native";
import useStyles from "@/hooks/styles/useStyles";

export default function Snake3d() {
  const styles = useStyles();
  return (
    <View
      style={styles.container}
    >
      <SnakeGame />
    </View>
  );
}
