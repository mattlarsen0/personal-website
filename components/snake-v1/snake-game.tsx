import useStyles from "@/components/styles/styles";
import { Text, View, Button } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useState } from "react";

const PlayAreaSize = 30;
const goalContents = (<Text>🧇</Text>);
const startPosition = [PlayAreaSize / 2, PlayAreaSize / 2];
const xMax = PlayAreaSize;
const xMin = 0;
const yMax = PlayAreaSize;
const yMin = 0;
const initialSnakeLength = 3;
const interval = 100;
const snakeMovementSpeed = 1;
const NumberOfGoals = 1;

enum Direction {
  Up,
  Down,
  Left,
  Right,
}

enum TileType {
  Snake,
  Goal,
  Wall,
  SnakeHead,
  SnakeTail,
  Empty
}

const DeathTiles = [TileType.Wall, TileType.Snake, TileType.SnakeTail, TileType.SnakeHead];

type GameState = {
  activeTimeout: number;
  length: number;
  position: number[];  // X & Y coordinates
  direction: Direction;
  playArea: TileType[][]
}

const initGameState = () => {
  let gameState: GameState = {
    length: initialSnakeLength,
    position: startPosition,
    direction: Direction.Right,
    playArea: [],
    activeTimeout: 0
  }

  // fill top and bottom with walls
  gameState.playArea[0] = Array(PlayAreaSize).fill(TileType.Wall);
  gameState.playArea[PlayAreaSize - 1] = Array(PlayAreaSize).fill(TileType.Wall);

  // fill remaining play area
  for (let x = 1; x < PlayAreaSize - 1; x++) {
    gameState.playArea[x] = Array(PlayAreaSize).fill(TileType.Empty);
    gameState.playArea[x][0] = TileType.Wall; // Vertical wall on left
    gameState.playArea[x][PlayAreaSize - 1] = TileType.Wall; // Vertical wall on right
  }

  return gameState;
};

const startTicking = (gameState: GameState, setState: Function) => {
  let expectedTickLength = Date.now() + interval;
  const tick = () => {
    let timeElapsed = Date.now() - expectedTickLength;
    if (timeElapsed > interval) {
      onPause(gameState, setState);
      return;
    }

    onTick(gameState);

    // update state to trigger re-render
    setState(gameState);

    expectedTickLength += interval;
    gameState.activeTimeout = setTimeout(tick, Math.max(0, interval - timeElapsed)); // take into account drift
  }
  gameState.activeTimeout = setTimeout(tick, interval);
}

const onPause = (gameState: GameState, setState: Function) => {
  // stop the game loop
  clearTimeout(gameState.activeTimeout);
}

const onResume = (gameState: GameState, setState: Function) => {
  startTicking(gameState, setState);
}

const onTick = (gameState: GameState) => {
  // move snake
  switch (gameState.direction) {
    case Direction.Up:
      gameState.position[1] += snakeMovementSpeed;
      break;
    case Direction.Down:
      gameState.position[1] -= snakeMovementSpeed;
      break;
    case Direction.Left:
      gameState.position[0] -= snakeMovementSpeed;
      break;
    case Direction.Right:
      gameState.position[0] += snakeMovementSpeed;
      break;
  }

  // check for collisions
  if (gameState.position[0] < xMin || gameState.position[0] > xMax ||
    gameState.position[1] < yMin || gameState.position[1] > yMax ||
    gameState.playArea[gameState.position[0]][gameState.position[1]] in DeathTiles) {
    endGame();
    return;
  }

  // check for reward
  if (gameState.playArea[gameState.position[0]][gameState.position[1]] === TileType.Goal) {
    grantReward(gameState);
  }
}

const grantReward = (gameState: GameState) => {
  // lengthen snake
  gameState.length += 1;

  // clear old waffles (if any remain)
  gameState.playArea.forEach((column) => {
    column.forEach((tile) => {
      if (tile === TileType.Goal) {
        tile = TileType.Empty;
      }
    });
  });

  // add waffles
  for (let i = 0; NumberOfGoals > 0 && i < NumberOfGoals * 2; i++) {
    let x = Math.floor(Math.random() * (PlayAreaSize - 1)) + 1; // avoid walls when generating random coordinates
    let y = Math.floor(Math.random() * (PlayAreaSize - 1)) + 1;

    if (gameState.playArea[x][y] === TileType.Empty) {
      gameState.playArea[x][y] = TileType.Goal;
    }
  }
}

const endGame = () => {
  // end the game and show score
}

export default function SnakeGame() {
  const styles = useStyles();
  const [gameState, setGameState] = useState(initGameState);
  const tiles = gameState.playArea.map((column, columnIndex) => {
    const columnTiles = column.map((tile) => {
      switch (tile) {
        case TileType.Wall:
          return <Text>X</Text>;
        case TileType.Snake:
          return <Text>O</Text>
        case TileType.SnakeHead:
          return <Text>:D</Text>;
        case TileType.SnakeTail:
          return <Text>0</Text>;
        case TileType.Goal:
          return goalContents;
      }
    });

    return (
      <View key={columnIndex} style={{ flexDirection: "row" }}>
        <FlatList
          data={columnTiles.map((item, rowIndex) => {
            return {
              key: `row-${rowIndex}`,
              value: item
            }
          })}
          renderItem={({ item }) => <Text key={item.key}>{item.value}</Text>}
        />
      </View>
    )
  }) || [];

  return (
    <View style={styles.container}>
      <Button title="Start Game" onPress={() => startTicking(gameState, setGameState)} />
      <Button title="Pause Game" onPress={() => onPause(gameState, setGameState)} />
      <Button title="Resume Game" onPress={() => onResume(gameState, setGameState)} />
      <View style={{ flexDirection: "column" }}>
        <FlatList data={tiles} renderItem={({ item }) => item}  />
      </View>
    </View>
  );
}
