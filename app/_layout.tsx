import LoadingScreen from '@/components/utils/loadingScreen';
import useStyles from '@/hooks/styles/useStyles';
import { useFonts } from '@expo-google-fonts/roboto/useFonts';
import { DrawerNavigationOptions } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { Platform, Appearance } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const styles = useStyles();
    let [fontsLoaded, error] = useFonts({
        'Merriweather-Light': require('@/assets/fonts/Merriweather-Light.ttf'),
        'Oswald-Regular': require('@/assets/fonts/Oswald-Regular.ttf'),
        'SpaceMono-Regular': require('@/assets/fonts/SpaceMono-Regular.ttf'),
    });

    SplashScreen.setOptions({
        duration: 1000,
        fade: true,
    });

    let [catShown, setCatShown] = useState(false);
    setTimeout(() => {
        setCatShown(true);
    }, 1000);

    useEffect(() => {
        if (catShown && fontsLoaded) {
            SplashScreen.hideAsync();
        } else if (error) {
            console.warn('Error loading fonts:', error);
            SplashScreen.hideAsync();
        }
    }, [catShown, fontsLoaded, error]);

    if ((!catShown || !fontsLoaded) && Platform.OS === 'web') {
        return (<LoadingScreen />);
    }
    const colorScheme = Appearance.getColorScheme();
    const darkMode = colorScheme === 'dark';
    const drawerBackground = darkMode ? '#2c2c2c' : '#2c2c2c';
    const screenOptions: DrawerNavigationOptions = {
        drawerStyle: {
            backgroundColor: drawerBackground,
            width: 250,
        },
        drawerActiveTintColor: '#4f5aff',
        drawerInactiveTintColor: '#e7e7e7',
        drawerActiveBackgroundColor: '#363636',
        drawerInactiveBackgroundColor: '#363636',
        drawerLabelStyle: {
            fontSize: 16,
            fontFamily: styles.titleText.fontFamily
        },
        drawerItemStyle: {
            marginVertical: 6,
            borderRadius: 8,
        },
        headerShown: true,
        headerStyle: {
            backgroundColor: drawerBackground,
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
            fontSize: 20,
            fontWeight: '600',
            fontFamily: styles.titleText.fontFamily
        },
    };

    return (
        <Drawer screenOptions={screenOptions}>
        <Drawer.Screen
            name="(home)/index"
            options={{
                drawerLabel: 'Home',
                title: 'Home',
            }}
        />
        <Drawer.Screen
            name="(snake)/index"
            options={{
                drawerLabel: 'S-N-A-K-E Game',
                title: 'S-N-A-K-E Game'
            }}
        />
        </Drawer>
    );
}
