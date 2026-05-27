import { useState } from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import useStyles from '@/hooks/styles/useStyles';
import styleConstants from '@/hooks/styles/styleConstants';
import useSnakeStyles from '@/hooks/styles/useSnakeStyles';
import { render } from '@testing-library/react-native';

jest.unmock('@/hooks/styles/useSnakeStyles');

const mockStyleSheet = {
    text: {
        fontSize: 16,
    },
    titleText: {
        fontFamily: 'Arial',
    },
};

const mockSnakeStyleSheet = {
    text: {
        fontSize: 16,
    }
};

jest.mock('react-native', () => ({
    Appearance: {
        getColorScheme: jest.fn(),
    },
    StyleSheet: {
        create: jest.fn((styles) => mockSnakeStyleSheet),
    }
}));
jest.mock('@/hooks/styles/useStyles', () => () => mockStyleSheet);
jest.mock('@/hooks/styles/styleConstants', () => jest.requireActual('@/hooks/styles/styleConstants'));
jest.mock('react', () => ({
    useState: jest.fn((styles) => [styles, jest.fn()]),
}));

describe('useSnakeStyles', () => {
    it('should expose a function', () => {
        expect(useSnakeStyles).toBeDefined();
    });

    it('useSnakeStyles should return expected output', () => {
        const retValue = useSnakeStyles();
        expect(retValue).toEqual(mockSnakeStyleSheet);
    });
});
