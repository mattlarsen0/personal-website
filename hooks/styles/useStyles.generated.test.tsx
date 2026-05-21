import { useState } from 'react';
import { Appearance, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import styleConstants from './styleConstants';
import useStyles from './useStyles';

jest.mock('react-native');
jest.mock('./styleConstants');

describe('useStyles', () => {
    it('should expose a function', () => {
        expect(useStyles).toBeDefined();
    });

    it('useStyles should return expected output', () => {
    // const retValue = useStyles(refreshStyles);
        expect(false).toBeTruthy();
    });
});
