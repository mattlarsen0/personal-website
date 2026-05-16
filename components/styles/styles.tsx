import { useFonts } from '@expo-google-fonts/roboto/useFonts';
import { useState } from "react";
import { Appearance, StyleSheet, TextStyle, ViewStyle } from "react-native";
type Styles = {
  container: ViewStyle;
  text: TextStyle;
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
    container: {}, 
    text: {},
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