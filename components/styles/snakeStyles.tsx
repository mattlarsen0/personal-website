import { useState } from "react";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import useStyles from "./styles";

type SnakeStyles = {
  tiles: ViewStyle;
  buttonText: TextStyle;
  buttonSpacer: ViewStyle;
  controlButtons: ViewStyle;
  gameStatusButtons: ViewStyle;
}

const useSnakeStyles = (refreshStyles?: boolean) => {
  const [stylesInit, setStylesInit] = useState(false);
  const styles = useStyles();
  const [snakeStyles, setSnakeStyles] = useState({
    tiles: {},
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
      gameStatusButtons: {
        borderRadius: 3,
        borderColor: '#285fab',
        backgroundColor: '#fcca0d',
        borderWidth: 4,
        width: 150,
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
        verticalAlign: 'middle',
        margin: 5,
        padding: 5
      },
      controlButtons: {
        borderRadius: 3,
        borderWidth: 4,
        borderColor: '#838383',
        backgroundColor: '#B3B3B3',
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