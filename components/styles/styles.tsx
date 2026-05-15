import { useFonts } from '@expo-google-fonts/roboto/useFonts';
import { useState } from "react";
import { Appearance, StyleSheet, TextStyle, ViewStyle } from "react-native";
type Styles = {
  container: ViewStyle;
  text: TextStyle;
  snakeTiles: ViewStyle;
}

const useStyles = (refreshStyles?: boolean) => {
  const [styles, setStyles] = useState({ container: {}, text: {}, snakeTiles: {} } as Styles);

  const whiteTextColor = '#e7e7e7';
  const blackTextColor = '#030303';
  let [fontsLoaded] = useFonts({
      'Merriweather-VariableFont': require('@/assets/fonts/Merriweather-VariableFont.ttf'),
      'Oswald-VariableFont': require('@/assets/fonts/Oswald-VariableFont.ttf'),
      'SpaceMono-Regular': require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!styles.text || refreshStyles) {
    const colorScheme = Appearance.getColorScheme();
    
    const newStyles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colorScheme === "dark" ? blackTextColor : whiteTextColor,
      },
      text: {
        fontFamily: fontsLoaded ? "Oswald-VariableFont" : "Arial",
        color: colorScheme === "dark" ? whiteTextColor : blackTextColor,
        fontSize: 12,
        textAlign: "center",
        verticalAlign: "middle",
      },
      titleText: {
        fontFamily: fontsLoaded ? "Merriweather-VariableFont" : "Arial",
        color: colorScheme === "dark" ? whiteTextColor : blackTextColor,
        fontSize: 24,
        textAlign: "center",
        verticalAlign: "middle",
      },
      snakeTiles: {
          height: 25,
          width: 25,
          display: "flex",
          justifyContent: "center",
          verticalAlign: "middle",
          alignItems: "center",
          fontFamily: fontsLoaded ? "SpaceMono-Regular" : "Arial",
      }
    });
    setStyles({...newStyles});
  }

  return styles;
};

export default useStyles;