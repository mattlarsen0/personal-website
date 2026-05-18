import useStyles from "@/components/styles/styles";
import { Text, View, Pressable } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useEffect, useRef, useState } from "react";
import { wrap } from "@/utils";
import useSnakeStyles from "../styles/snakeStyles";
import Icon from "@/components/icon";

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

enum GameStatus {
  Running,
  Win,
  Lost,
  Paused,
  Initiated
}

const PlayAreaSize = 20;
const goalContents = <Text>🧇</Text>;
const StartPosition = [10, 10];
const SnakeXMax = PlayAreaSize - 2; // minus 2, for walls and 0-indexing
const SnakeXMin = 1;
const SnakeYMax = PlayAreaSize - 2;
const SnakeYMin = 1;
const InitialSnakeLength = 3;
const GameTickInterval = 500;
const SnakeMovementSpeed = 1;
const NumberOfGoals = 1;
const DefaultDirection = Direction.Right;
const MattHighScore = 5;
const TickTimeModifier = 10; // ms
const MinimumSpeed = 100; // ms
const DeathTiles = [TileType.Snake, TileType.SnakeTail, TileType.SnakeHead];
const WinTiles = [TileType.Wall, TileType.Snake, TileType.SnakeTail, TileType.SnakeHead];

type GameState = {
  activeTimeout: number;
  playArea: TileType[][];
  snakeBody: number[][]; // Array of XY coordinates
  status: GameStatus,
  score: number,
  highScore: number,
  currentDirection: Direction
}

const addSnakeToPlayArea = (gameState: GameState, direction: Direction) => {
  for (let i = 0; i < InitialSnakeLength; i++) {
    let tile;
    if (i === 0) {
      tile = TileType.SnakeHead;
    } else if (i === InitialSnakeLength - 1) {
      tile = TileType.SnakeTail;
    } else {
      tile = TileType.Snake;
    }

    let x, y;
    const snakeHeadPosition = i === 0 ? StartPosition : gameState.snakeBody[0];
    switch (direction) {
      case Direction.Up:
        x = snakeHeadPosition[0];
        y = snakeHeadPosition[1] + i;
        break;
      case Direction.Down:
        x = snakeHeadPosition[0];
        y = snakeHeadPosition[1] - i;
        break;
      case Direction.Left:
        x = snakeHeadPosition[0] + i;
        y = snakeHeadPosition[1];
        break;
      case Direction.Right:
        x = snakeHeadPosition[0] - i;
        y = snakeHeadPosition[1];
        break;
    }

    x = wrap(x, SnakeXMin, SnakeXMax);
    y = wrap(y, SnakeYMin, SnakeYMax);

    gameState.playArea[x][y] = tile;
    gameState.snakeBody.push([x, y]);
  }
}

const addGoals = (gameState: GameState) => {
  let goalsAdded = 0;
  for (let i = 0; goalsAdded < NumberOfGoals && i < NumberOfGoals * 2; i++) {
    const emptyX = Math.floor(Math.random() * (PlayAreaSize - 1)) + 1; // avoid walls when generating random coordinates
    const emptyY = Math.floor(Math.random() * (PlayAreaSize - 1)) + 1;

    if (gameState.playArea[emptyX][emptyY] === TileType.Empty) {
      setTileAtPosition(gameState, [emptyX, emptyY], TileType.Goal);
      goalsAdded++;
    }
  }

  if (goalsAdded < NumberOfGoals) {
    // scan for first empty tile
    for (let i = 0; goalsAdded < NumberOfGoals && i < NumberOfGoals; i++) {
      let emptyX, emptyY;
      const foundTile = gameState.playArea.find((x, xIndex) => {
        return x.find((y, yIndex) => {
          if (y === TileType.Empty)
          {
            emptyX = xIndex;
            emptyY = yIndex;
            return y;
          }
        });
      })

      if (foundTile && emptyX && emptyY) {
        setTileAtPosition(gameState, [emptyX, emptyY], TileType.Goal);
        goalsAdded++
      }
    }
  }
}

const initGameState = () => {
  let gameState: GameState = {
    playArea: [],
    activeTimeout: 0,
    snakeBody: [],
    status: GameStatus.Initiated,
    score: 0,
    highScore: MattHighScore,
    currentDirection: DefaultDirection
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
  addSnakeToPlayArea(gameState, DefaultDirection);

  // add initial goals
  addGoals(gameState);

  return gameState;
};

function getTileAtPosition(gameState: GameState, position: number[]) {
  return gameState.playArea[position[0]][position[1]];
}

function setTileAtPosition(gameState: GameState, position: number[], tileType: TileType) {
  gameState.playArea[position[0]][position[1]] = tileType;
}

function wrapPosition(position: number[]) {
  return [
    wrap(position[0], SnakeXMin, SnakeXMax),
    wrap(position[1], SnakeYMin, SnakeYMax)
  ];
}

const getTickSpeed = (gameState: GameState) => {
  return Math.max(GameTickInterval - ((gameState.snakeBody.length - InitialSnakeLength) * TickTimeModifier), MinimumSpeed);
}

const startTicking = (gameState: GameState, setState: Function, directionRef: React.RefObject<Direction>) => {
  if (gameState.activeTimeout) {
    return;
  }

  gameState.status = GameStatus.Running;

  const tick = () => {
    const tickSpeed = getTickSpeed(gameState);
    onTick(gameState, directionRef.current);

    if (gameState.status === GameStatus.Running) {
      gameState.activeTimeout = setTimeout(tick, tickSpeed);
    }
    setState({ ...gameState });
  }
  gameState.activeTimeout = setTimeout(tick, GameTickInterval);
}

const onPause = (gameState: GameState, setState: Function) => {
  // stop the game loop
  clearTimeout(gameState.activeTimeout);
  gameState.activeTimeout = 0;
  gameState.status = GameStatus.Paused;
  setState({ ...gameState });
}

const onResume = (gameState: GameState, setState: Function, directionRef: React.RefObject<Direction>) => {
  startTicking(gameState, setState, directionRef);
}

const onTick = (gameState: GameState, direction: Direction) => {
  const snakeHeadPosition = gameState.snakeBody[0];

  // old head to body
  setTileAtPosition(gameState, snakeHeadPosition, TileType.Snake);

  // move snake forward
  let newSnakeHeadPosition = [...snakeHeadPosition]
  switch (direction) {
    case Direction.Up:
      newSnakeHeadPosition[1] -= SnakeMovementSpeed;
      break;
    case Direction.Down:
      newSnakeHeadPosition[1] += SnakeMovementSpeed;
      break;
    case Direction.Left:
      newSnakeHeadPosition[0] -= SnakeMovementSpeed;
      break;
    case Direction.Right:
      newSnakeHeadPosition[0] += SnakeMovementSpeed;
      break;
  }

  // wrap snake around if it goes out of bounds
  newSnakeHeadPosition = wrapPosition(newSnakeHeadPosition);

  const newTile = getTileAtPosition(gameState, newSnakeHeadPosition);

  // check for collision
  if (DeathTiles.includes(newTile)) {
    endGame(gameState, GameStatus.Lost);
    return;
  }

  // check for reward
  if (newTile === TileType.Goal) {
    gameState.score++;
    moveRewards(gameState);
  } else {
    const snakeTailPosition = gameState.snakeBody[gameState.snakeBody.length - 1];
    // remove tail of snake
    setTileAtPosition(gameState, snakeTailPosition, TileType.Empty);
    gameState.snakeBody.pop();

    // set old "end of body" to tail
    const newSnakeTailPosition = gameState.snakeBody[gameState.snakeBody.length - 1];
    setTileAtPosition(gameState, newSnakeTailPosition, TileType.SnakeTail);
  }

  // check for win
  if (gameState.playArea.every(x => x.every(y => WinTiles.includes(y)))) {
    endGame(gameState, GameStatus.Win);
  }

  // new head position
  setTileAtPosition(gameState, newSnakeHeadPosition, TileType.SnakeHead);
  gameState.snakeBody.unshift(newSnakeHeadPosition);
  gameState.currentDirection = direction;
}
  
const clearRewards = (gameState: GameState) => {
  gameState.playArea.forEach((column) => {
    column.forEach((tile) => {
      if (tile === TileType.Goal) {
        tile = TileType.Empty;
      }
    });
  });
}

const moveRewards = (gameState: GameState) => {
  clearRewards(gameState);

  // add waffles
  addGoals(gameState);
}

const endGame = (gameState: GameState, status: GameStatus) => {
  clearTimeout(gameState.activeTimeout);
  gameState.status = status;
  if (gameState.score > gameState.highScore) {
    // Inconceivable!
    gameState.highScore = gameState.score
  }
}

function renderTiles(gameState: GameState, snakeStyles: ReturnType<typeof useSnakeStyles>) {
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
        value: <View style={snakeStyles.tiles}>{tileContents}</View>
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
  const snakeStyles = useSnakeStyles();
  const [gameState, setGameState] = useState({} as GameState);
  const [isLoading, setIsLoading] = useState(true);
  const [tiles, setTiles] = useState([] as React.ReactElement[]);
  const directionRef = useRef(DefaultDirection);

  useEffect(() => {
    setGameState(initGameState());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setTiles(renderTiles(gameState, snakeStyles));
  }, [gameState, snakeStyles]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>LOADING</Text>
      </View>
    );
  }

  const changeDirection = (gameState: GameState, newDirection: Direction) => {
    // prevent snake from reversing
    if (gameState.currentDirection === Direction.Up && newDirection === Direction.Down) {
      return;
    }
    if (gameState.currentDirection === Direction.Down && newDirection === Direction.Up) {
      return;
    }
    if (gameState.currentDirection === Direction.Left && newDirection === Direction.Right) {
      return;
    }
    if (gameState.currentDirection === Direction.Right && newDirection === Direction.Left) {
      return;
    }
    directionRef.current = newDirection;
  };
  const upTouch = () => changeDirection(gameState, Direction.Up);
  const downTouch = () => changeDirection(gameState, Direction.Down);
  const rightTouch = () => changeDirection(gameState, Direction.Right);
  const leftTouch = () => changeDirection(gameState, Direction.Left);

  let gameStatusText;
  let gameStatusAction;
  if (gameState.status === GameStatus.Initiated) {
    gameStatusText = "START GAME";
    gameStatusAction = () => startTicking(gameState, setGameState, directionRef)
  } else if (gameState.status === GameStatus.Running) {
    gameStatusText = "PAUSE GAME";
    gameStatusAction = () => onPause(gameState, setGameState);
  } else if (gameState.status === GameStatus.Paused) {
    gameStatusText = "RESUME GAME";
    gameStatusAction = () => onResume(gameState, setGameState, directionRef);
  } else if (gameState.status === GameStatus.Lost) {
    gameStatusText = "RESTART GAME";
    gameStatusAction = () => {
      const newGameState = initGameState();
      setGameState(newGameState);
      directionRef.current = DefaultDirection;
      startTicking(newGameState, setGameState, directionRef);
    };
  }
  
  let gameStatusScreen;
  if (gameState.status === GameStatus.Lost) {
    gameStatusScreen = (
      <View style={snakeStyles.postGameStatus}>
        <Text style={snakeStyles.postGameText}>GAME OVER</Text>
      </View>
    )
  } else if (gameState.status === GameStatus.Win) {
    gameStatusScreen = (
      <View style={snakeStyles.postGameStatus}>
        <Text style={snakeStyles.postGameText}>WIN!</Text>
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={{ ...styles.container, flexDirection: 'column' }}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.h1}>S-N-A-K-E-3-D</Text>
        <Text style={styles.h3}>Collect the WAFFLES to grow longer! Touch or hover to change direction! Can YOU beat Matt&apos;s HIGH SCORE?</Text>
      </View>
      <View style={{ flexDirection: "row", width: '100%', justifyContent: 'center' }}>
        <Pressable onPressOut={gameStatusAction}>
          <View style={snakeStyles.gameStatusButtons}>
            <Text style={snakeStyles.gameStatusButtonText}>{gameStatusText}</Text>
          </View>
        </Pressable>
        <View style={{ justifyContent: "center" }}>
          <View style={{flexDirection: 'row' }}>
            <Text style={snakeStyles.scoreText}>SCORE</Text>
            <Text style={snakeStyles.scoreValue}>{`${gameState.score}`.padStart(7, '0')}</Text>          
          </View>
          <View style={{flexDirection: 'row' }}>
            <Text style={snakeStyles.scoreText}>HI</Text>
            <Text style={snakeStyles.scoreValue}>{`${gameState.highScore}`.padStart(7, '0')}</Text>
          </View>
          <View style={{flexDirection: 'row' }}>
            <Text style={snakeStyles.scoreText}>SPEED</Text>
            <Text style={snakeStyles.scoreValue}>{5 * (gameState.snakeBody.length - InitialSnakeLength + 1)} MPH</Text>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "row", padding: 20 }}>
        {gameStatusScreen}
        <Text style={styles.centerText}>
          <FlatList data={tiles} renderItem={({ item }) => item} horizontal={true} />
        </Text>
      </View>
      <View style={{ flexDirection: "column" }}>
        <View style={{ flexDirection: "row" }}>
          <View style={snakeStyles.buttonSpacer} />
          <Pressable onHoverIn={upTouch} onPress={upTouch} style={snakeStyles.controlButtons}>
            <Text style={snakeStyles.buttonText}><Icon name="arrow-circle-up"/></Text>
          </Pressable>
          <View style={snakeStyles.buttonSpacer} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Pressable onHoverIn={leftTouch} onPress={leftTouch} style={snakeStyles.controlButtons}>
            <Text style={snakeStyles.buttonText}><Icon name="arrow-circle-left"/></Text>
          </Pressable>
          <View style={snakeStyles.buttonSpacer} />
          <Pressable onHoverIn={rightTouch} onPress={rightTouch} style={snakeStyles.controlButtons}>
            <Text style={snakeStyles.buttonText}><Icon name="arrow-circle-right"/></Text>
          </Pressable>
        </View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={snakeStyles.buttonSpacer} />
          <Pressable onHoverIn={downTouch} onPress={downTouch} style={snakeStyles.controlButtons}>
            <Text style={snakeStyles.buttonText}><Icon name="arrow-circle-down"/></Text>
          </Pressable>
          <View style={snakeStyles.buttonSpacer} />
        </View>
      </View>
    </ScrollView>
  );
}