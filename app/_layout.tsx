import useStyles from '@/components/styles/styles';
import { useFonts } from '@expo-google-fonts/roboto/useFonts';
import { Drawer } from "expo-router/drawer";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View, Text, Platform } from 'react-native';

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

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    } else if (error) {
      console.warn('Error loading fonts:', error);
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && Platform.OS === 'web') {
    return (
      <View>
        <Text>LOADING</Text>
      </View>
    )
  }

  return (
    <Drawer>
      <Drawer.Screen
        name="(home)/index"
        options={{
          drawerLabel: 'Home',
          title: 'Home',
        }}
      />
      <Drawer.Screen
        name="(snake3d)/index"
        options={{
          drawerLabel: 'Snake 3D',
          title: 'Snake 3D'
        }}
      />
    </Drawer>
  );
}
