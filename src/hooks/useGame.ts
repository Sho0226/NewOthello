import { useState } from 'react';

export const useGame = () => {
  const getRandomPercentageInRange = (min: number, max: number): string => {
    return `${Math.floor(Math.random() * (max - min + 1)) + min}%`;
  };

  const getRandomBorderRadius = (): string => {
    const horizontal1 = getRandomPercentageInRange(35, 65);
    const horizontal2 = getRandomPercentageInRange(35, 65);
    const horizontal3 = getRandomPercentageInRange(35, 65);
    const horizontal4 = getRandomPercentageInRange(35, 65);
    const vertical1 = getRandomPercentageInRange(45, 65);
    const vertical2 = getRandomPercentageInRange(45, 65);
    const vertical3 = getRandomPercentageInRange(45, 65);
    const vertical4 = getRandomPercentageInRange(45, 65);

    return `${horizontal1} ${horizontal2} ${horizontal3} ${horizontal4} / ${vertical1} ${vertical2} ${vertical3} ${vertical4}`;
  };

  const initialBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 1, 2, 3, 0, 0],
    [0, 0, 3, 2, 1, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0],
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

  const candidate = () => {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (newBoard[i][j] === 0) {
          for (const direction of directions) {
            const [x1, y1] = direction;
            for (let k = 1; k < 8; k++) {
              const newX = j + x1 * k;
              const newY = i + y1 * k;

              if (newBoard[newY] !== undefined && newBoard[newY][newX] !== undefined) {
                if (newBoard[newY][newX] === 0) {
                  break;
                } else if (newBoard[newY][newX] === 3) {
                  break;
                } else if (newBoard[newY][newX] !== turnColor) {
                  if (k > 1) {
                    if (newBoard[newY][newX] === newBoard[i + y1][j + x1]) {
                      break;
                    } else {
                      newBoard[i][j] = 3;
                      newBorderRadii[i][j] = borderRadii[i][j] || getRandomBorderRadius();

                      break;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  for (let a = 0; a < 8; a++) {
    for (let b = 0; b < 8; b++) {
      if (board[b][a] === 3) {
        newBoard[b][a] = 0;
      }
    }
  }
  const clickHandler = (x: number, y: number) => {
    if (board[y][x] !== 3) return;
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
            candidate();
            break;
          }
        }
      }
    }
  };

  const colors = () => {
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
    return { blackcount, whitecount };
  };

  const result = colors();

  return {
    clickHandler,
    board,
    borderRadii,
    colors,
    result,
    turnColor,
  };
};
