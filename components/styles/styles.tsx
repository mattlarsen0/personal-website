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

const initStyles = (): Styles => {
  const whiteTextColor = '#e7e7e7';
  const blackTextColor = '#030303';
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
  
  return StyleSheet.create({
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
}

const useStyles = (refreshStyles?: boolean) => {
  const [styles, setStyles] = useState(initStyles());

  if (refreshStyles) {
    setStyles({...initStyles()});
  }

  return styles;
};

export default useStyles;