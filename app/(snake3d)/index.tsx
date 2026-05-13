import SnakeGame from "@/components/snake-v1/snake-game";
import { View } from "react-native";

export default function Snake3d() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SnakeGame />
    </View>
  );
}
