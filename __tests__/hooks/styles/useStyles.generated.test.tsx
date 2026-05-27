import { useState } from 'react';
import { Appearance, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import useStyles from '@/hooks/styles/useStyles';

jest.unmock('@/hooks/styles/useStyles');

const expectedStyleSheet = {
    text: {
        color: '#000000',
    }
};

jest.mock('react', () => ({
    useState: jest.fn((styles) => [styles, jest.fn()]),
}));

jest.mock('react-native', () => ({
    Appearance: {
        getColorScheme: jest.fn(),
    },
    StyleSheet: {
        create: jest.fn((styles) => expectedStyleSheet),
    }
}));

describe('useStyles', () => {
    it('should expose a function', () => {
        expect(useStyles).toBeDefined();
    });

    it('useStyles should return expected output', () => {
        const retValue = useStyles();
        expect(retValue).toEqual(expectedStyleSheet);
    });
});
