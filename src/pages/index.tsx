import styles from './index.module.css';
import { useGame } from '../hooks/useGame';
import { Board } from '../components/Board/Board';
const Home = () => {
  const { board, borderRadii, clickHandler } = useGame();

  return (
    <div className={styles.container}>
      <Board board={board} clickHandler={clickHandler} borderRadii={borderRadii} />
    </div>
  );
};

export default Home;
