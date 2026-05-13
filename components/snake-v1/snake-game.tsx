import useStyles from "@/components/styles/styles";
import { Text, View } from "react-native";

export default function SnakeGame() {
  const styles = useStyles();
  return (
    <View style={styles.container}></View>
  );
}

const playAreaSize = 100;
const goalContents = (<Text>🧇</Text>);
const playArea = [playAreaSize][playAreaSize];
const startPosition = [playArea/2, playArea/2];
const initalSnakeLength = 3;
const interval = 100;
const DIRECTIONS = {
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right"
};

type GameState = {
  length: number;
  position: number[];  // X & Y coordinates
  direction: string;
}

const startGame = () => {
  var gameState: GameState = {
    length: initalSnakeLength,
    position: startPosition,
    direction: DIRECTIONS.RIGHT,
  }
  var expected = Date.now() + interval;

  const tick = () => {
      var dt = Date.now() - expected; // the drift (positive for overshooting)
      if (dt > interval) {
          onPause();
          return;
      }

      onTick(gameState);

      expected += interval;
      setTimeout(tick, Math.max(0, interval - dt)); // take into account drift
  }
  setTimeout(tick, interval);
};

const onPause = () => {
  // stop the game loop
}

const onResume = () => {

}

const onTick = (gameState) => {
  // move snake
  switch (gameState.direction) {
    case DIRECTIONS.UP:
      gameState.position[1] += 1;
      break;
    case DIRECTIONS.DOWN:
      gameState.position[1] -= 1;
      break;
    case DIRECTIONS.LEFT:
      gameState.position[0] -= 1;
      break;
    case DIRECTIONS.RIGHT:
      gameState.position[0] += 1;
      break;
  }

  // check for collisions

  // check for waffles

}
