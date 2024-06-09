import styles from '../../pages/index.module.css';

type Props = {
  board: number[][];
  clickHandler: (x: number, y: number) => void;
  borderRadii: string[][];
};

export const Board = ({ board, clickHandler, borderRadii }: Props) => (
  <div>
    {board.map((row, y) =>
      row.map((color, x) => (
        <div className={styles.cellstyle} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
          {color !== 0 && (
            <div className={styles.stonestyle} style={{ background: color === 1 ? '#000' : '#fff', borderRadius: borderRadii[y][x] }} />
          )}
        </div>
      )),
    )}
  </div>
);