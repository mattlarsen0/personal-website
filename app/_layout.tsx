import { useFonts } from '@expo-google-fonts/roboto/useFonts';
import { Drawer } from "expo-router/drawer";
import { setOptions } from 'expo-splash-screen';
import { View, Text } from 'react-native';

export default function RootLayout() {
  let [fontsLoaded] = useFonts({
      'Merriweather-VariableFont': require('@/assets/fonts/Merriweather-VariableFont.ttf'),
      'Oswald-VariableFont': require('@/assets/fonts/Oswald-VariableFont.ttf'),
      'SpaceMono-Regular': require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Set the animation options. This is optional.
  setOptions({
    duration: 1000,
    fade: true,
  });

  if (!fontsLoaded) {
    return <View><Text>LOADING</Text></View>;
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
