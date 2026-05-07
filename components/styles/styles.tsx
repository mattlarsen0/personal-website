import { Roboto_400Regular } from '@expo-google-fonts/roboto/400Regular';
import { useFonts } from '@expo-google-fonts/roboto/useFonts';
import { useState } from "react";
import { Appearance, StyleSheet, TextStyle, ViewStyle } from "react-native";
type Styles = {
  container: ViewStyle;
  text: TextStyle;
}

const useStyles = (refreshStyles?: boolean) => {
  const [styles, setStyles] = useState({ container: {}, text: {} } as Styles);

  const whiteTextColor = '#e7e7e7';
  const blackTextColor = '#030303';
  let [fontsLoaded] = useFonts({
      Roboto_400Regular
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
        fontFamily: fontsLoaded ? "Roboto_400Regular" : "Arial",
        color: colorScheme === "dark" ? whiteTextColor : blackTextColor,
        fontSize: 12,
        textAlign: "center",
        verticalAlign: "middle",
      }
    });
    setStyles({
      container: newStyles.container,
      text: newStyles.text
    });
  }

  return styles;
};

export default useStyles;