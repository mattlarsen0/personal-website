import { Roboto_400Regular } from '@expo-google-fonts/roboto/400Regular';
import { useFonts } from '@expo-google-fonts/roboto/useFonts';
import { Drawer } from "expo-router/drawer";
import { setOptions } from 'expo-splash-screen';

export default function RootLayout() {
  let [fontsLoaded] = useFonts({
      Roboto_400Regular
  });

  // Set the animation options. This is optional.
  setOptions({
    duration: 1000,
    fade: true,
  });
    
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
