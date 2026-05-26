import { useState } from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import useStyles from '@/hooks/styles/useStyles';
import styleConstants from '@/hooks/styles/styleConstants';
import useSnakeStyles from '@/hooks/styles/useSnakeStyles';
import { render } from '@testing-library/react-native';

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
