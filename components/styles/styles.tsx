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
  link: TextStyle;
}

const useStyles = () => {
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
  if (!stylesInit) {
    const colorScheme = Appearance.getColorScheme();
    const textStyles: TextStyle = {
      fontFamily: "Merriweather-Light",
      color: colorScheme === "dark" ? whiteTextColor : blackTextColor,
      fontSize: 16,
      textAlign: "center",
      verticalAlign: "middle",
    };

    const containerStyles: ViewStyle = {
      flex: 1,
      alignItems: "center",
      backgroundColor: colorScheme === "dark" ? blackTextColor : whiteTextColor
    };
    
    const newStyles = StyleSheet.create({
      container: containerStyles,
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
      link: {
        ...textStyles,
        color: '#285fab',
        textDecorationLine: 'underline',
        fontFamily: "Oswald-Regular",
      }
    });
    setStyles({...newStyles});
    setStylesInit(true);
  }

  return styles;
};

export default useStyles;