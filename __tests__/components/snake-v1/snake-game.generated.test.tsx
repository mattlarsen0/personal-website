import useStyles from '@/hooks/styles/useStyles';
import { Text, View, Pressable, AppState } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useEffect, useRef, useState } from 'react';
import utils from '@/utils';
import useSnakeStyles from '@/hooks/styles/useSnakeStyles';
import Icon from '@/components/icon';
import { Link } from 'expo-router';
import SnakeGame from '@/components/snake-v1/snake-game';
import { render } from '@testing-library/react-native';

jest.unmock('@/components/snake-v1/snake-game');

jest.mock('@/hooks/styles/useSnakeStyles', () => ({
    __esModule: true,
    default: jest.fn(() => ({
        container: {},
        gameContainer: {},
        gameOverContainer: {},
        gameOverText: {},
        scoreText: {},
        buttonContainer: {},
        buttonText: {},
    })),
}));

describe('<SnakeGame>', () => {
    it('should render component', () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.5);
        expect(render(<SnakeGame/>).toJSON()).toMatchSnapshot();
    });
});
