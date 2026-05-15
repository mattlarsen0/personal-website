import useStyles from "@/components/styles/styles";
import { Text, View, Pressable } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useEffect, useRef, useState } from "react";
import { wrap } from "@/utils";

const PlayAreaSize = 30;
const goalContents = <Text>🧇</Text>;
const StartPosition = [14, 14];
const SnakeXMax = PlayAreaSize - 2; // minus 2, for walls and 0-indexing
const SnakeXMin = 1;
const SnakeYMax = PlayAreaSize - 2;
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
  playArea: TileType[][];
  snakeTailPosition: number[]; // X & Y coordinates
  gameStarted: boolean;
}

const addSnakeToPlayArea = (gameState: GameState, direction: Direction) => {
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
    switch (direction) {
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
    snakeTailPosition: [StartPosition[0] - InitialSnakeLength + 1, StartPosition[1]],
    gameStarted: false,
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
  addSnakeToPlayArea(gameState, Direction.Right);

  // add initial goals
  addGoals(gameState);

  return gameState;
};

function getTileAtPosition (gameState: GameState, position: number[]) {
  return gameState.playArea[position[0]][position[1]];
}

function setTileAtPosition (gameState: GameState, position: number[], tileType: TileType) {
  gameState.playArea[position[0]][position[1]] = tileType;
}

function wrapPosition(position: number[]) {
  return [
    wrap(position[0], SnakeXMin, SnakeXMax),
    wrap(position[1], SnakeYMin, SnakeYMax)
  ];
}

const startTicking = (gameState: GameState, setState: Function, directionRef: React.RefObject<Direction>) => {
  if (gameState.activeTimeout) {
    return;
  }

  const tick = () => {
    onTick(gameState, directionRef.current);

    gameState.activeTimeout = setTimeout(tick, GameTickInterval);
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

const onResume = (gameState: GameState, setState: Function, directionRef: React.RefObject<Direction>) => {
  startTicking(gameState, setState, directionRef);
}

const onTick = (gameState: GameState, direction: Direction) => {
  // old head to body
  setTileAtPosition(gameState, gameState.position, TileType.Snake);

  // move snake forward
  switch (direction) {
    case Direction.Up:
      gameState.position[1] -= SnakeMovementSpeed;
      break;
    case Direction.Down:
      gameState.position[1] += SnakeMovementSpeed;
      break;
    case Direction.Left:
      gameState.position[0] -= SnakeMovementSpeed;
      break;
    case Direction.Right:
      gameState.position[0] += SnakeMovementSpeed;
      break;
  }

  // wrap snake around if it goes out of bounds
  gameState.position = wrapPosition(gameState.position);

  // check for collision
  if (getTileAtPosition(gameState, gameState.position) in DeathTiles) {
    endGame();
    gameState = initGameState();
    return;
  }

  // check for reward
  if (getTileAtPosition(gameState, gameState.position) === TileType.Goal) {
    grantReward(gameState);
  } else {
    // remove tail of snake
    setTileAtPosition(gameState, gameState.snakeTailPosition, TileType.Empty);

    // find old end of body
    const possibleBodyPositions = [
      wrapPosition([gameState.snakeTailPosition[0] + 1, gameState.snakeTailPosition[1]]),
      wrapPosition([gameState.snakeTailPosition[0] - 1, gameState.snakeTailPosition[1]]),
      wrapPosition([gameState.snakeTailPosition[0], gameState.snakeTailPosition[1] + 1]),
      wrapPosition([gameState.snakeTailPosition[0], gameState.snakeTailPosition[1] - 1]),
    ];

    const newTailPosition = possibleBodyPositions.find((position) => {
      if (getTileAtPosition(gameState, position) === TileType.Snake) {
        return position;
      }
    })
    
    if (!newTailPosition) {
      throw new Error("Failed to find new tail position");
    }

    // set new tail position
    gameState.snakeTailPosition = newTailPosition;
    setTileAtPosition(gameState, gameState.snakeTailPosition, TileType.SnakeTail);
  }

  // new head position
  setTileAtPosition(gameState, gameState.position, TileType.SnakeHead);
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
  const directionRef = useRef(Direction.Right);

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
    if (directionRef.current === Direction.Up && newDirection === Direction.Down) {
      return;
    }
    if (directionRef.current === Direction.Down && newDirection === Direction.Up) {
      return;
    }
    if (directionRef.current === Direction.Left && newDirection === Direction.Right) {
      return;
    }
    if (directionRef.current === Direction.Right && newDirection === Direction.Left) {
      return;
    }

    directionRef.current = newDirection;
  };
  
  let gameStatusButton;
  if (!gameState) {
    gameStatusButton = (
      <Pressable onPressOut={() => startTicking(gameState, setGameState, directionRef)}>+
        <Text>Start Game</Text>
      </Pressable>
    )
  } else if (gameState.activeTimeout) {
    gameStatusButton = (
      <Pressable onPressOut={() => onPause(gameState, setGameState)}>
        <Text>Pause Game</Text>
      </Pressable>
    )
  } else {
    gameStatusButton = (
      <Pressable onPressOut={() => onResume(gameState, setGameState, directionRef)}>
        <Text>Resume Game</Text>
      </Pressable>
    )
  }

  var zeroWidthSpace = "\u200B";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {gameStatusButton}
      <View style={{ flexDirection: "row" }}>
        <FlatList data={tiles} renderItem={({ item }) => item} horizontal={true} />
      </View>
      <View style={{ flexDirection: "row", alignContent: "center" }}>  
        <View style={styles.snakeButtonSpacer}>
          <Text>{zeroWidthSpace}</Text>
        </View>
        <Pressable onPressIn={() => changeDirection(Direction.Up)} style={styles.snakeButtons}>
          <Text>Up</Text>
        </Pressable>
      </View>
      <View style={{ flexDirection: "row", alignContent: "center" }}>
        <Pressable onPressIn={() => changeDirection(Direction.Left)} style={styles.snakeButtons}>
          <Text>Left</Text>
        </Pressable>
        <View style={styles.snakeButtonSpacer}>
          <Text>{zeroWidthSpace}</Text>
        </View>
        <Pressable onPressIn={() => changeDirection(Direction.Right)} style={styles.snakeButtons}>
          <Text>Right</Text>
        </Pressable>
      </View>
      <View style={{ display: "flex", flexDirection: "row", alignContent: "center" }}>  
        <View style={styles.snakeButtonSpacer}>
          <Text>test</Text>
        </View>
        <Pressable onPressIn={() => changeDirection(Direction.Down)} style={styles.snakeButtons}>
          <Text>Down</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}