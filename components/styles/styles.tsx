import { useFonts } from '@expo-google-fonts/roboto/useFonts';
import { useState } from "react";
import { Appearance, StyleSheet, TextStyle, ViewStyle } from "react-native";
type Styles = {
  container: ViewStyle;
  text: TextStyle;
  snakeTiles: ViewStyle;
  snakeButtons: ViewStyle;
  snakeButtonText: TextStyle;
  snakeButtonSpacer: ViewStyle;
  titleText: TextStyle;
  h1: TextStyle;
  h2: TextStyle;
  h3: TextStyle;
  list: ViewStyle;
  centerText: TextStyle;
}

const useStyles = (refreshStyles?: boolean) => {
  const [stylesInit, setStylesInit] = useState(false);
  const [styles, setStyles] = useState({
    init: false, 
    container: {}, 
    text: {},
    snakeTiles: {},
    snakeButtons: {},
    snakeButtonText: {},
    snakeButtonSpacer: {},
    titleText: {},
    h1: {},
    h2: {},
    h3: {},
    list: {},
    centerText: {}
  } as Styles);

  const whiteTextColor = '#e7e7e7';
  const blackTextColor = '#030303';
  if (!stylesInit || refreshStyles) {
    const colorScheme = Appearance.getColorScheme();
    const textStyles: TextStyle = {
      fontFamily: "Merriweather-Light",
      color: colorScheme === "dark" ? whiteTextColor : blackTextColor,
      fontSize: 14,
      textAlign: "center",
      verticalAlign: "middle",
    };
    
    const newStyles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: colorScheme === "dark" ? blackTextColor : whiteTextColor,
        color: colorScheme === "dark" ? whiteTextColor : blackTextColor,
      },
      centerText: {
        ...textStyles,
        verticalAlign: 'middle'
      },
      text: {
        ...textStyles,
        textAlign: "left",
        verticalAlign: "middle",
      },
      titleText: {
        ...textStyles,
        fontFamily: "Oswald-Regular",
        fontSize: 24,
        verticalAlign: "middle",
      },
      snakeTiles: {
          height: 25,
          width: 25,
          display: "flex",
          justifyContent: "center",
          verticalAlign: "middle",
          alignItems: "center",
          fontFamily: "SpaceMono-Regular",
      },
      snakeButtons: {
        borderRadius: 2,
        borderColor: '#98f542',
        borderWidth: 2,
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        verticalAlign: 'middle'
      },
      snakeButtonText: {
        ...textStyles,
        padding: 20
      },
      snakeButtonSpacer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        borderColor: 'red', // Makes the outline visible
        borderWidth: 2,
        margin: 10,
        padding: 10
      },
      h1: {
        ...textStyles,
        fontSize: 40,
        fontWeight: '700',
        fontFamily: "Oswald-Regular",
      },
      h2: {
        ...textStyles,
        fontSize: 34,
        fontWeight: '600',
        fontFamily: "Oswald-Regular",
      },
      h3: {
        ...textStyles,
        fontSize: 22,
        fontWeight: '500',
        fontFamily: "Oswald-Regular",
      },
      list: {
        margin: 10,
      },
    });
    setStyles({...newStyles});
    setStylesInit(true);
  }

  return styles;
};

export default useStyles;