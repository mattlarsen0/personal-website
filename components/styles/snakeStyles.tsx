import { useState } from "react";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import useStyles from "./styles";
import { red } from "react-native-reanimated/lib/typescript/Colors";

type SnakeStyles = {
  tiles: ViewStyle;
  buttons: ViewStyle;
  buttonText: TextStyle;
  buttonSpacer: ViewStyle;
}

const useSnakeStyles = (refreshStyles?: boolean) => {
  const [stylesInit, setStylesInit] = useState(false);
  const styles = useStyles();
  const [snakeStyles, setSnakeStyles] = useState({
    tiles: {},
    buttons: {},
    buttonText: {},
    buttonSpacer: {},
  } as SnakeStyles);

  if (!stylesInit || refreshStyles) {
    const newStyles = StyleSheet.create({
      tiles: {
          height: 15,
          width: 15,
          fontSize: 10,
          display: "flex",
          justifyContent: "center",
          verticalAlign: "middle",
          alignItems: "center",
          fontFamily: "SpaceMono-Regular",
      },
      buttons: {
        borderRadius: 2,
        borderColor: '#98f542',
        borderWidth: 2,
        width: 75,
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
        verticalAlign: 'middle',
        margin: 5,
        padding: 5
      },
      buttonText: {
        ...styles.text,
        padding: 20,
        color: 'red'
      },
      buttonSpacer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        borderWidth: 2,
        margin: 10,
        padding: 10
      },
    });

    setSnakeStyles({...newStyles});
    setStylesInit(true);
  }

  return snakeStyles;
};

export default useSnakeStyles;