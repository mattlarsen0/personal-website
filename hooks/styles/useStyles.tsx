import { useState } from 'react';
import { Appearance, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import styleConstants from './styleConstants';

type Styles = {
  background: ViewStyle;
  container: ViewStyle;
  text: TextStyle;
  titleText: TextStyle;
  h1: TextStyle;
  h2: TextStyle;
  h3: TextStyle;
  h4: TextStyle;
  list: ViewStyle;
  centerContainer: ViewStyle;
  link: TextStyle;
  containerWithBackground: ViewStyle;
  titleLink: TextStyle;
}

const initStyles = (): Styles => {
    const whiteTextColor = '#e7e7e7';
    const blackTextColor = '#030303';
    const transparentWhiteTextColor = 'rgba(231, 231, 231, 0.7)';
    const transparentBlackTextColor = 'rgba(3, 3, 3, 0.7)';
    const colorScheme = Appearance.getColorScheme();
    const textStyles: TextStyle = {
        fontFamily: 'Merriweather-Light',
        color: colorScheme === 'dark' ? whiteTextColor : blackTextColor,
        fontSize: 16,
        textAlign: 'center',
        verticalAlign: 'middle',
    };

    const containerStyles: ViewStyle = {
        zIndex: styleConstants.zIndex.content,
        flex: 1,
        alignItems: 'center',
    };

    const linkStyles: TextStyle = {
        ...textStyles,
        color: '#285fab',
        textDecorationLine: 'underline',
        fontFamily: 'Oswald-Regular',
        fontSize: undefined, // "inherit" text size from parent
    }

    const titleTextStyles: TextStyle = {
        ...textStyles,
        fontFamily: 'Oswald-Regular',
        fontSize: 24,
    }

    return StyleSheet.create({
        background: {
            ...containerStyles,
            zIndex: styleConstants.zIndex.background,
            backgroundColor: colorScheme === 'dark' ? blackTextColor : whiteTextColor
        },
        container: containerStyles,
        containerWithBackground: {
            ...containerStyles,
            backgroundColor: colorScheme === 'dark' ? transparentBlackTextColor : transparentWhiteTextColor,
        },
        centerContainer: {
            ...containerStyles,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            ...textStyles,
            textAlign: 'left',
        },
        titleText: titleTextStyles,
        h1: {
            ...textStyles,
            fontSize: 40,
            fontWeight: '700',
            fontFamily: 'Oswald-Regular',
        },
        h2: {
            ...textStyles,
            fontSize: 34,
            fontWeight: '600',
            fontFamily: 'Oswald-Regular',
        },
        h3: {
            ...textStyles,
            fontSize: 22,
            fontWeight: '500',
            fontFamily: 'Oswald-Regular',
        },
        h4: {
            ...textStyles,
            fontSize: 18,
            fontWeight: '500',
            fontFamily: 'Oswald-Regular',
        },
        list: {
            margin: 10
        },
        link: linkStyles,
        titleLink: {
            ...linkStyles,
            fontSize: titleTextStyles.fontSize
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
