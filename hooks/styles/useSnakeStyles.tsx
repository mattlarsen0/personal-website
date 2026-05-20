import { useState } from "react";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import useStyles from "./useStyles";
import styleConstants from "./styleConstants";

type SnakeStyles = {
  tiles: ViewStyle;
  buttonText: TextStyle;
  buttonSpacer: ViewStyle;
  controlButtons: ViewStyle;
  gameStatusButtons: ViewStyle;
  postGameStatus: ViewStyle;
  postGameText: TextStyle;
  scoreText: TextStyle;
  gameStatusButtonText: TextStyle;
  scoreValue: TextStyle;
  buttonContainer: ViewStyle;
}

const gradiusBlue = '#285fab';

const initStyles = (styles: ReturnType<typeof useStyles>): SnakeStyles => {
    const scoreText =  {
      fontFamily: styles.titleText.fontFamily,
      color: gradiusBlue,
      flex: 1,
      paddingRight: 5,
    };

    return StyleSheet.create({
      tiles: {
          height: 15,
          width: 15,
          fontSize: 10,
          display: "flex",
          justifyContent: "center",
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
        margin: 5,
        padding: 5,
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
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonText: {
        ...styles.text,
        color: '#141414',
      },
      buttonSpacer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        margin: 10,
        padding: 10
      },
      postGameStatus: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        zIndex: styleConstants.zIndex.modal,
      },
      postGameText: {
        ...styles.text,
        padding: 20,
        backgroundColor: '#001452',
        borderRadius: 6,
        borderWidth: 4,
        borderColor: gradiusBlue,
        fontFamily: styles.titleText.fontFamily,
      },
      scoreText: scoreText,
      scoreValue: {
        ...scoreText,
        paddingRight: 0,
        textAlign: 'right'
      },
      buttonContainer: {
        margin: 5
      }
    });
}

const useSnakeStyles = () => {
  const styles = useStyles();
  const [snakeStyles] = useState({...initStyles(styles)})

  return snakeStyles;
};

export default useSnakeStyles;