import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const directions = [
    [0, 1], // Down
    [1, 1], // Down-right
    [1, 0], // Right
    [1, -1], // Up-right
    [0, -1], // Up
    [-1, -1], // Up-left
    [-1, 0], // Left
    [-1, 1], // Down-left
  ];

  const newBoard = structuredClone(board);

  const clickHandler = (x: number, y: number) => {
    for (const direct of directions) {
      const [x_d, y_d] = direct;
      if (board[y][x] === 0) {
        for (let i = 1; i < 8; i++) {
          if (board[y + y_d * i] !== undefined && board[y + y_d * i][x + x_d * i] !== undefined) {
            if (board[y + y_d][x + x_d] === 3 - turnColor)
              if (board[y + y_d * i][x + x_d * i] === turnColor) {
                if (board[y + y_d * i][x + x_d * i] !== board[y + y_d][x + x_d]) {
                  for (let s = i; s >= 0; s--) {
                    newBoard[y + y_d * s][x + x_d * s] = turnColor;
                  }
                  newBoard[y + y_d * i][x + x_d * i] = turnColor;
                  setTurnColor(3 - turnColor);
                  setBoard(newBoard);
                  break;
                }
              }
          }
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.boardstyle}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cellstyle} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stonestyle}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
