import useStyles from "@/components/styles/styles";
import { Text, View, Button } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const playAreaSize = 100;
const goalContents = (<Text>🧇</Text>);
const startPosition = [playAreaSize / 2, playAreaSize / 2];
const xMax = playAreaSize;
const xMin = 0;
const yMax = playAreaSize;
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
  gameState.playArea[0] = Array(playAreaSize).fill(TileType.Wall);
  gameState.playArea[playAreaSize - 1] = Array(playAreaSize).fill(TileType.Wall);

  // fill remaining play area
  for (let x = 1; x < playAreaSize - 1; x++) {
    gameState.playArea[x] = Array(playAreaSize).fill(TileType.Empty);
    gameState.playArea[x][0] = TileType.Wall; // Vertical wall on left
    gameState.playArea[x][playAreaSize - 1] = TileType.Wall; // Vertical wall on right
  }

  return gameState;
};

const startTicking = (gameState: GameState) => {
  let expectedTickLength = Date.now() + interval;
  const tick = () => {
    let timeElapsed = Date.now() - expectedTickLength;
    if (timeElapsed > interval) {
      onPause(gameState);
      return;
    }

    onTick(gameState);

    expectedTickLength += interval;
    gameState.activeTimeout = setTimeout(tick, Math.max(0, interval - timeElapsed)); // take into account drift
  }
  gameState.activeTimeout = setTimeout(tick, interval);
}

const onPause = (gameState: GameState) => {
  // stop the game loop
  clearTimeout(gameState.activeTimeout);
}

const onResume = (gameState: GameState) => {
  startTicking(gameState);
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
    let x = Math.floor(Math.random() * (playAreaSize - 1)) + 1; // avoid walls when generating random coordinates
    let y = Math.floor(Math.random() * (playAreaSize - 1)) + 1;

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
  const gameState = initGameState();

  const tiles = gameState.playArea.map((column) => {
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

      return (
        <FlatList
          key={`column-${columnTiles}`}
          data={columnTiles.map((item, index) => {
            return {
              key: index.toString(),
              value: item
            }
          })}
          renderItem={({ item }) => <Text key={item.key}>{item.value}</Text>}
        />
      )
    });

    return (
      <View key="snake-game" style={styles.container}>
        <Button title="Start Game" onPress={() => startTicking(gameState)} />
        <Button title="Pause Game" onPress={() => onPause(gameState)} />
        <Button title="Resume Game" onPress={() => onResume(gameState)} />
        {tiles}
      </View>
    );
  });
}
