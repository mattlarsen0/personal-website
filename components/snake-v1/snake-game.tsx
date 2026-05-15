import useStyles from "@/components/styles/styles";
import { Text, View, Button } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { wrap } from "@/utils";

const PlayAreaSize = 30;
const goalContents = <Text>🧇</Text>;
const StartPosition = [14, 14];
const SnakeXMax = PlayAreaSize - 1;
const SnakeXMin = 1;
const SnakeYMax = PlayAreaSize - 1;
const SnakeYMin = 1;
const InitialSnakeLength = 3;
const GameTickInterval = 1000;
const SnakeMovementSpeed = 1;
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

const DeathTiles = [TileType.Snake, TileType.SnakeTail, TileType.SnakeHead];

type GameState = {
  activeTimeout: number;
  snakeLength: number;
  position: number[];  // X & Y coordinates
  playArea: TileType[][],
  snakeTailPosition: number[]; // X & Y coordinates
  direction: Direction
}

const addSnakeToPlayArea = (gameState: GameState) => {
  for (let i = 0; i < gameState.snakeLength; i++) {
    let tile;
    if (i === 0) {
      tile = TileType.SnakeHead;
    } else if (i === gameState.snakeLength - 1) {
      tile = TileType.SnakeTail;
    } else {
      tile = TileType.Snake;
    }

    let x, y;
    switch (gameState.direction) {
      case Direction.Up:
        x = gameState.position[0];
        y = gameState.position[1] + i;
        break;
      case Direction.Down:
        x = gameState.position[0];
        y = gameState.position[1] - i;
        break;
      case Direction.Left:
        x = gameState.position[0] + i;
        y = gameState.position[1];
        break;
      case Direction.Right:
        x = gameState.position[0] - i;
        y = gameState.position[1];
        break;
    }

    x = wrap(x, SnakeXMin, SnakeXMax);
    y = wrap(y, SnakeYMin, SnakeYMax);

    gameState.playArea[x][y] = tile;
  }
}

const removeSnakeFromPlayArea = (gameState: GameState) => {
  for (let i = 0; i < gameState.snakeLength; i++) {
    let x, y;
    switch (gameState.direction) {
      case Direction.Up:
        x = gameState.position[0];
        y = gameState.position[1] + i;
        break;
      case Direction.Down:
        x = gameState.position[0];
        y = gameState.position[1] - i;
        break;
      case Direction.Left:
        x = gameState.position[0] + i;
        y = gameState.position[1];
        break;
      case Direction.Right:
        x = gameState.position[0] - i;
        y = gameState.position[1];
        break;
    }

    x = wrap(x, SnakeXMin, SnakeXMax);
    y = wrap(y, SnakeYMin, SnakeYMax);
    gameState.playArea[x][y] = TileType.Empty;
  }
}

const addGoals = (gameState: GameState) => {
  let goalsAdded = 0;
  for (let i = 0; goalsAdded < NumberOfGoals && i < NumberOfGoals * 10; i++) {
    const x = Math.floor(Math.random() * (PlayAreaSize - 1)) + 1; // avoid walls when generating random coordinates
    const y = Math.floor(Math.random() * (PlayAreaSize - 1)) + 1;

    if (gameState.playArea[x][y] === TileType.Empty) {
      gameState.playArea[x][y] = TileType.Goal;
      goalsAdded++;
    }
  }
}

const initGameState = () => {
  let gameState: GameState = {
    snakeLength: InitialSnakeLength,
    position: StartPosition,
    playArea: [],
    activeTimeout: 0,
    direction: Direction.Right,
    snakeTailPosition: [StartPosition[0] - InitialSnakeLength + 1, StartPosition[1]]
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

  // add initial snake
  addSnakeToPlayArea(gameState);

  // add initial goals
  addGoals(gameState);

  return gameState;
};

const startTicking = (gameState: GameState, setState: Function) => {
  if (gameState.activeTimeout) {
    return;
  }

  let expectedTickLength = Date.now() + GameTickInterval;
  const tick = () => {
    let timeElapsed = Date.now() - expectedTickLength;
    if (timeElapsed > GameTickInterval) {
      onPause(gameState, setState);
      return;
    }

    onTick(gameState);

    expectedTickLength += GameTickInterval;
    gameState.activeTimeout = setTimeout(tick, Math.max(0, GameTickInterval - timeElapsed)); // take into account drift
    setState({ ...gameState });
  }
  gameState.activeTimeout = setTimeout(tick, GameTickInterval);
}

const onPause = (gameState: GameState, setState: Function) => {
  // stop the game loop
  clearTimeout(gameState.activeTimeout);
  gameState.activeTimeout = 0;
  setState({ ...gameState });
}

const onResume = (gameState: GameState, setState: Function) => {
  startTicking(gameState, setState);
}

const onTick = (gameState: GameState) => {
  // change old end of body to new tail
  switch (gameState.direction) {
    case Direction.Up:
      gameState.playArea[gameState.snakeTailPosition[0]][gameState.snakeTailPosition[1] + 1] = TileType.SnakeTail;
      break;
    case Direction.Down:
      gameState.playArea[gameState.snakeTailPosition[0]][gameState.snakeTailPosition[1] - 1] = TileType.SnakeTail;
      break;
    case Direction.Left:
      gameState.playArea[gameState.snakeTailPosition[0] + 1][gameState.snakeTailPosition[1]] = TileType.SnakeTail;
      break;
    case Direction.Right:
      gameState.playArea[gameState.snakeTailPosition[0] - 1][gameState.snakeTailPosition[1]] = TileType.SnakeTail;
      break;
  }

  // old head to body
  gameState.playArea[gameState.position[0]][gameState.position[1]] = TileType.Snake;

  // move snake forward
  switch (gameState.direction) {
    case Direction.Up:
      gameState.position[1] += SnakeMovementSpeed;
      break;
    case Direction.Down:
      gameState.position[1] -= SnakeMovementSpeed;
      break;
    case Direction.Left:
      gameState.position[0] -= SnakeMovementSpeed;
      break;
    case Direction.Right:
      gameState.position[0] += SnakeMovementSpeed;
      break;
  }

  // wrap snake around if it goes out of bounds
  gameState.position[0] = wrap(gameState.position[0], SnakeXMin, SnakeXMax);
  gameState.position[1] = wrap(gameState.position[1], SnakeYMin, SnakeYMax);

  // check for collision
  if (gameState.playArea[gameState.position[0]][gameState.position[1]] in DeathTiles) {
    endGame();
    return;
  }

  // check for reward
  if (gameState.playArea[gameState.position[0]][gameState.position[1]] === TileType.Goal) {
    grantReward(gameState);
  } else {
    // remove tail of snake
    gameState.playArea[gameState.snakeTailPosition[0]][gameState.snakeTailPosition[1]] = TileType.Empty;
  }
}

const grantReward = (gameState: GameState) => {
  // lengthen snake
  gameState.snakeLength += 1;

  // clear old waffles (if any remain)
  gameState.playArea.forEach((column) => {
    column.forEach((tile) => {
      if (tile === TileType.Goal) {
        tile = TileType.Empty;
      }
    });
  });

  // add waffles
  addGoals(gameState);
}

const endGame = () => {
  // end the game and show score
}

function renderTiles(gameState: GameState, styles: ReturnType<typeof useStyles>) {
  const tiles = gameState?.playArea?.map((column, columnIndex) => {
    const columnTiles = column.map((tile, rowIndex) => {
      const key = `tile-${columnIndex}-${rowIndex}`;
      let tileContents;
      switch (tile) {
        case TileType.Wall:
          tileContents = <Text>X</Text>;
          break;
        case TileType.Snake:
          tileContents = <Text>O</Text>;
          break;
        case TileType.SnakeHead:
          tileContents = <Text>:D</Text>;
          break;
        case TileType.SnakeTail:
          tileContents = <Text>0</Text>;
          break;
        case TileType.Goal:
          tileContents = goalContents;
          break;
        case TileType.Empty:
          tileContents = <Text>.</Text>;
          break;
        default:
          throw new Error(`Unexpected tile type ${tile} at coordinates (${columnIndex}, ${rowIndex})`);
      }

      return {
        key: key,
        value: <View style={styles.snakeTiles}>{tileContents}</View>
      };
    });

    return (
      <View key={`column-view-${columnIndex}`} style={{ display: "flex", flexDirection: "column" }}>
        <FlatList
          data={columnTiles}
          renderItem={({ item }) => item.value}
        />
      </View>
    )
  });

  return tiles;
}

export default function SnakeGame() {
  const styles = useStyles();
  const [gameState, setGameState] = useState({} as GameState);
  const [isLoading, setIsLoading] = useState(true);
  const [tiles, setTiles] = useState([] as React.ReactElement[]);

  useEffect(() => {
    setGameState(initGameState());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setTiles(renderTiles(gameState, styles));
  }, [gameState, styles]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>LOADING</Text>
      </View>
    );
  }

  const changeDirection = (newDirection: Direction) => {
    // prevent snake from reversing
    if (gameState.direction === Direction.Up && newDirection === Direction.Down) {
      return;
    }
    if (gameState.direction === Direction.Down && newDirection === Direction.Up) {
      return;
    }
    if (gameState.direction === Direction.Left && newDirection === Direction.Right) {
      return;
    }
    if (gameState.direction === Direction.Right && newDirection === Direction.Left) {
      return;
    }

    setGameState({ ...gameState, direction: newDirection });
  };

  return (
    <ScrollView style={styles.container}>
      <Button title="Start Game" onPress={() => startTicking(gameState, setGameState)} />
      <Button title="Pause Game" onPress={() => onPause(gameState, setGameState)} />
      <Button title="Resume Game" onPress={() => onResume(gameState, setGameState)} />
      <Button title="Up" onPress={() => changeDirection(Direction.Up)} />
      <Button title="Down" onPress={() => changeDirection(Direction.Down)} />
      <Button title="Left" onPress={() => changeDirection(Direction.Left)} />
      <Button title="Right" onPress={() => changeDirection(Direction.Right)} />
      <View style={{ display: "flex", flexDirection: "row" }}>
        <FlatList data={tiles} renderItem={({ item }) => item} horizontal={true} />
      </View>
    </ScrollView>
  );
}