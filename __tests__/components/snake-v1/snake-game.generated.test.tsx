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

jest.mock('@/hooks/styles/useStyles');
jest.mock('react-native');
jest.mock('react-native-gesture-handler');
jest.mock('@/utils');
jest.mock('../../hooks/styles/useSnakeStyles');
jest.mock('@/components/icon');
jest.mock('expo-router');

describe('<SnakeGame>', () => {
    it('should render component', () => {
        expect(render(<SnakeGame
        />).toJSON()).toMatchSnapshot();
    });

});
