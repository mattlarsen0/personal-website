import { useEffect, useState } from "react";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import useStyles from "./styles";

type SnakeStyles = {
  tiles: ViewStyle;
  buttonText: TextStyle;
  buttonSpacer: ViewStyle;
  controlButtons: ViewStyle;
  gameStatusButtons: ViewStyle;
  gameOver: ViewStyle;
  gameOverText: TextStyle;
  scoreText: TextStyle;
  gameStatusButtonText: TextStyle;
}

const gradiusBlue = '#285fab';

const initStyles = (styles: ReturnType<typeof useStyles>) => {
    return StyleSheet.create({
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
        borderRadius: 6,
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
      gameStatusButtonText: {
        ...styles.text,
        color: gradiusBlue,
        fontFamily: styles.titleText.fontFamily,
      },
      controlButtons: {
        borderRadius: 6,
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
        color: '#141414',
      },
      buttonSpacer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        borderWidth: 2,
        margin: 10,
        padding: 10
      },
      gameOver: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        zIndex: 1,
      },
      gameOverText: {
        ...styles.text,
        padding: 20,
        backgroundColor: '#001452',
        borderRadius: 6,
        borderWidth: 4,
        borderColor: gradiusBlue,
        fontFamily: styles.titleText.fontFamily,
      },
      scoreText: {
        fontFamily: styles.titleText.fontFamily,
        color: gradiusBlue,
        flex: 1,
        paddingRight: 5
      }
    });
}

const useSnakeStyles = () => {
  const [, setStylesInit] = useState(false);
  const styles = useStyles();
  const [snakeStyles, setSnakeStyles] = useState({
    tiles: {},
    buttonText: {},
    buttonSpacer: {},
  } as SnakeStyles);

  useEffect(() => {
    setSnakeStyles({...initStyles(styles)});
    setStylesInit(true);
  }, [styles])

  return snakeStyles;
};

export default useSnakeStyles;