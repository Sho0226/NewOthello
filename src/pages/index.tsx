import styles from './index.module.css';
import { useGame } from '../hooks/useGame';
const Home = () => {
  const {} = useGame();

  return (
    <div className={styles.container}>
      <div className={styles.boardstyle} />
      <Board />
    </div>
  );
};

export default Home;
