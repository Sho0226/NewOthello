import styles from './index.module.css';
import { useGame } from '../hooks/useGame';
import { Board } from '../components/Board/Board';
const Home = () => {
  const { board, borderRadii, clickHandler, result } = useGame();

  return (
    <div className={styles.container}>
      枚数: {result.blackcount}/ 枚数: {result.whitecount}
      <Board board={board} clickHandler={clickHandler} borderRadii={borderRadii} />
    </div>
  );
};

export default Home;
