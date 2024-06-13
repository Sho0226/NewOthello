import styles from './Board.module.css';

type Props = {
  board: number[][];
  clickHandler: (x: number, y: number) => void;
  borderRadii: string[][];
};

export const Board = ({ board, clickHandler, borderRadii }: Props) => (
  <div className={styles.board}>
    {board.map((row, y) =>
      row.map((color, x) => (
        <div className={styles.cellstyle} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
          {color !== 0 && (
            <div
              className={`${styles.stonestyle} ${color === 3 ? styles.candidatestonestyle : ''}`}
              style={{ background: color === 1 ? '#000' : color === 2 ? '#fff' : '#241b02', borderRadius: borderRadii[y][x] }}
            />
          )}
        </div>
      )),
    )}
  </div>
);
