import renderer from 'react-test-renderer';
import useStyles from '@/hooks/styles/useStyles';
import { Text, View, Pressable, AppState } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useEffect, useRef, useState } from 'react';
import utils from '@/utils';
import useSnakeStyles from '../../hooks/styles/useSnakeStyles';
import Icon from '@/components/icon';
import { Link } from 'expo-router';
import SnakeGame from './snake-game';

jest.mock('@/hooks/styles/useStyles');
jest.mock('react-native');
jest.mock('react-native-gesture-handler');
jest.mock('@/utils');
jest.mock('../../hooks/styles/useSnakeStyles');
jest.mock('@/components/icon');
jest.mock('expo-router');

const renderTree = tree => renderer.create(tree);
describe('<SnakeGame>', () => {
    it('should render component', () => {
        expect(renderTree(<SnakeGame
        />).toJSON()).toMatchSnapshot();
    });

});
