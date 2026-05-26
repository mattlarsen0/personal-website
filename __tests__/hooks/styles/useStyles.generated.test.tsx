import { useState } from 'react';
import { Appearance, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import useStyles from '@/hooks/styles/useStyles';

const mockStyleSheet = {
    text: {
        fontSize: 16,
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
        create: jest.fn((styles) => mockStyleSheet),
    }
}));

jest.mock('@/hooks/styles/styleConstants', () => jest.requireActual('@/hooks/styles/styleConstants'));

describe('useStyles', () => {
    it('should expose a function', () => {
        expect(useStyles).toBeDefined();
    });

    it('useStyles should return expected output', () => {
        const retValue = useStyles();
        expect(retValue).toEqual(mockStyleSheet);
    });
});
