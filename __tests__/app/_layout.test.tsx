import LoadingScreen from '@/components/utils/loadingScreen';
import useStyles from '@/hooks/styles/useStyles';
import { useFonts } from '@expo-google-fonts/roboto/useFonts';
import { DrawerNavigationOptions } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';
import { Platform, Appearance } from 'react-native';
import RootLayout from '@/app/_layout';
import { act, render } from '@testing-library/react-native';

jest.unmock('@/app/_layout');

jest.mock('@/components/utils/loadingScreen', () => ({
    __esModule: true,
    default: jest.fn(() => (<div className='loading-screen'></div>)),
}));
jest.mock('@expo-google-fonts/roboto/useFonts', () => ({
    __esModule: true,
    useFonts: jest.fn(() => [true, null]),
}));
jest.mock('@/hooks/styles/useStyles', () => ({
    __esModule: true,
    default: jest.fn(() => ({
        titleText: {
            fontFamily: 'Oswald-Regular',
        },
    })),
}));
jest.mock('expo-splash-screen', () => ({
    __esModule: true,
    preventAutoHideAsync: jest.fn(),
    hideAsync: jest.fn(),
    setOptions: jest.fn(),
}));
jest.mock('expo-router/drawer', () => {
    const DrawerScreen = ({ children }: any) => (
        <div className="drawer-screen">{children}</div>
    );
    DrawerScreen.displayName = 'DrawerScreen';
    const Drawer = ({ children }: any) => <div className='drawer'>{children}</div>;
    Drawer.Screen = DrawerScreen;
    return {
        Drawer
    };
});
jest.mock('expo-splash-screen', () => ({
    __esModule: true,
    preventAutoHideAsync: jest.fn(),
    hideAsync: jest.fn(),
    setOptions: jest.fn(),
}));

describe('<RootLayout>', () => {
    it('should render component', async () => {
        const tree = await render(<RootLayout />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
