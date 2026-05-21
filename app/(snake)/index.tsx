import SnakeGame from "@/components/snake-v1/snake-game";
import useStyles from "@/hooks/styles/useStyles";
import PageLayoutView from "@/components/pageLayoutView";

export default function Snake3d() {
  const styles = useStyles();
  return (
    <PageLayoutView
      style={styles.containerWithBackground}
    >
      <SnakeGame />
    </PageLayoutView>
  );
}
