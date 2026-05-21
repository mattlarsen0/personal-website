import { useState } from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import useStyles from './useStyles';
import styleConstants from './styleConstants';
import useSnakeStyles from './useSnakeStyles';

jest.mock('react-native');
jest.mock('./useStyles');
jest.mock('./styleConstants');

describe('useSnakeStyles', () => {
    it('should expose a function', () => {
        expect(useSnakeStyles).toBeDefined();
    });

    it('useSnakeStyles should return expected output', () => {
    // const retValue = useSnakeStyles();
        expect(false).toBeTruthy();
    });
});
