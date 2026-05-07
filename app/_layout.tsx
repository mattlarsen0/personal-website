import { Drawer } from "expo-router/drawer";

export default function RootLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Home',
          title: 'Home',
        }}
      />
      <Drawer.Screen
        name="(snake3d)/index"
        options={{
          drawerLabel: 'Snake 3D',
          title: 'Snake 3D',
          label: 'TEST!!!'
        }}
      />
    </Drawer>
  );
}
