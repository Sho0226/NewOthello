import { useState } from 'react';

export const useGame = () => {
  const getRandomPercentageInRange = (min: number, max: number): string => {
    return `${Math.floor(Math.random() * (max - min + 1)) + min}%`;
  };

  const getRandomBorderRadius = (): string => {
    const horizontal1 = getRandomPercentageInRange(40, 60);
    const horizontal2 = getRandomPercentageInRange(40, 60);
    const horizontal3 = getRandomPercentageInRange(40, 60);
    const horizontal4 = getRandomPercentageInRange(40, 60);
    const vertical1 = getRandomPercentageInRange(50, 60);
    const vertical2 = getRandomPercentageInRange(50, 60);
    const vertical3 = getRandomPercentageInRange(50, 60);
    const vertical4 = getRandomPercentageInRange(50, 60);

    return `${horizontal1} ${horizontal2} ${horizontal3} ${horizontal4} / ${vertical1} ${vertical2} ${vertical3} ${vertical4}`;
  };

  const initialBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const initialBorderRadii = initialBoard.map((row) => row.map((cell) => (cell !== 0 ? getRandomBorderRadius() : '')));

  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState<number[][]>(initialBoard);
  const [borderRadii, setBorderRadii] = useState<string[][]>(initialBorderRadii);

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
  const newBorderRadii = structuredClone(borderRadii);

  const clickHandler = (x: number, y: number) => {
    if (board[y][x] !== 0) return;
    for (const direct of directions) {
      const [x_d, y_d] = direct;

      for (let i = 1; i < 8; i++) {
        if (
          board[y + y_d * i] !== undefined &&
          board[y + y_d * i][x + x_d * i] !== undefined &&
          board[y + y_d][x + x_d] !== 0 &&
          board[y + y_d][x + x_d] === 3 - turnColor
        ) {
          if (board[y + y_d * i][x + x_d * i] === turnColor) {
            Array.from({ length: i + 1 }, (_, s) => {
              newBoard[y + y_d * s][x + x_d * s] = turnColor;
              newBorderRadii[y + y_d * s][x + x_d * s] = borderRadii[y + y_d * s][x + x_d * s] || getRandomBorderRadius();
            });
            newBoard[y + y_d * i][x + x_d * i] = turnColor;
            setTurnColor(3 - turnColor);
            setBoard(newBoard);
            setBorderRadii(newBorderRadii);
            break;
          }
        }
      }
    }
  };
  let blackcount = 0;
  let whitecount = 0;
  for (let a = 0; a < 8; a++) {
    for (let b = 0; b < 8; b++) {
      if (board[a][b] === 1) {
        blackcount++;
      } else if (board[a][b] === 2) {
        whitecount++;
      }
    }
  }
  console.log('黒:', blackcount, '白:', whitecount);

  return {
    clickHandler,
    board,
    borderRadii,
  };
};
