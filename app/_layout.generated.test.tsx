import renderer from 'react-test-renderer';
import LoadingScreen from '@/components/utils/loadingScreen';
import useStyles from '@/hooks/styles/useStyles';
import { useFonts } from '@expo-google-fonts/roboto/useFonts';
import { DrawerNavigationOptions } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';
import { Platform, Appearance } from 'react-native';
import RootLayout from './_layout';

jest.mock('@/components/utils/loadingScreen');
jest.mock('@/hooks/styles/useStyles');
jest.mock('@expo-google-fonts/roboto/useFonts');
jest.mock('@react-navigation/drawer');
jest.mock('expo-router/drawer');
jest.mock('expo-splash-screen');
jest.mock('react-native');

const renderTree = tree => renderer.create(tree);
describe('<RootLayout>', () => {
    it('should render component', () => {
        expect(renderTree(<RootLayout
        />).toJSON()).toMatchSnapshot();
    });

});
