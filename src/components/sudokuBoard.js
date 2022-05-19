import React, { useState } from 'react'

let sudokuBoardVal;
let isNew = true;

function SudokuBoard() {
    const boardDimensions = [0, 1, 2, 3, 4, 5, 6, 7, 8]

    if (isNew) {
        sudokuBoardVal = getBoard();
        isNew = false;
    }

    const [sudokuArr, setSudokuArr] = useState(sudokuBoardVal);

    // Click action for the two buttons
    // Set a different values for the board
    const handleNewBoard = () => {
        console.log('New Board button clicked');
        sudokuBoardVal = getBoard();
        console.log(sudokuBoardVal);
        setSudokuArr(sudokuBoardVal);
    }

    // Solves the given board and gives the time taken to solve the board
    const handleSolvePuzzle = () => {
        console.log('Solve Puzzle button clicked');

        console.log('Checking if values changes');

        console.log("SudokuBoard Val");
        console.log(sudokuBoardVal);

        let startTime = performance.now();
        let solvedPuzzle = solvePuzzle(sudokuBoardVal);
        let endTime = performance.now();
        let performanceValue = parseFloat(endTime - startTime).toFixed(4);

        console.log("Start time : %f", startTime);
        console.log("End time : %f", endTime);
        console.log("Perfomance time : %f", performanceValue);

        alert("Time taken to solve the puzzle :" + performanceValue + " ms");

        setSudokuArr(structuredClone(solvedPuzzle));

        console.log('The value has been changed');
        console.log(solvedPuzzle);
    }

    // Core function that solves the given board using backtracking 
    function solvePuzzle(sudokuBoard) {
        let nextCell = getEmptyCells(sudokuBoard);
        let cellRow = nextCell[0];
        let cellColumn = nextCell[1];

        // If there are no empty cells
        if (cellRow === -1 || cellColumn === -1) {
            return sudokuBoard;
        }

        // Add number from 1 to 9 to the cell and check if they are compatible with the board validity
        for (let number = 1; number <= 9; number++) {
            if (isCheckNumberValid(sudokuBoard, cellRow, cellColumn, number)) {
                sudokuBoard[cellRow][cellColumn] = number;
                solvePuzzle(sudokuBoard);
            }
        }

        // To check if the value is added 
        if (getEmptyCells(sudokuBoard)[0] !== -1)
            sudokuBoard[cellRow][cellColumn] = -1;

        return sudokuBoard;
    }

    function getBoard() {
        let boardNumber = Math.floor(Math.random() * 7) + 1;

        // Easiest
        let board1 = [
            [-1, -1, -1, 2, 6, -1, 7, -1, 1],
            [6, 8, -1, -1, 7, -1, -1, 9, -1],
            [1, 9, -1, -1, -1, 4, 5, -1, -1],
            [8, 2, -1, 1, -1, -1, -1, 4, -1],
            [-1, -1, 4, 6, -1, 2, 9, -1, -1],
            [-1, 5, -1, -1, -1, 3, -1, 2, 8],
            [-1, -1, 9, 3, -1, -1, -1, 7, 4],
            [-1, 4, -1, -1, 5, -1, -1, 3, 6],
            [7, -1, 3, -1, 1, 8, -1, -1, -1]
        ];
        // Easiest
        let board2 = [
            [1, -1, -1, 4, 8, 9, -1, -1, 6],
            [7, 3, -1, -1, -1, -1, -1, 4, -1],
            [-1, -1, -1, -1, -1, 1, 2, 9, 5],
            [-1, -1, 7, 1, 2, -1, 6, -1, -1],
            [5, -1, -1, 7, -1, 3, -1, -1, 8],
            [-1, -1, 6, -1, 9, 5, 7, -1, -1],
            [9, 1, 4, 6, -1, -1, -1, -1, -1],
            [-1, 2, -1, -1, -1, -1, -1, 3, 7],
            [8, -1, -1, 5, 1, 2, -1, -1, 4],
        ];
        // Intermediate
        let board3 = [
            [-1, 2, -1, 6, -1, 8, -1, -1, -1],
            [5, 8, -1, -1, -1, 9, 7, -1, -1],
            [-1, -1, -1, -1, 4, -1, -1, -1, -1],
            [3, 7, -1, -1, -1, -1, 5, -1, -1],
            [6, -1, -1, -1, -1, -1, -1, -1, 4],
            [-1, -1, 8, -1, -1, -1, -1, 1, 3],
            [-1, -1, -1, -1, 2, -1, -1, -1, -1],
            [-1, -1, 9, 8, -1, -1, -1, 3, 6],
            [-1, -1, -1, 3, -1, 6, -1, 9, -1],
        ];
        // Difficult
        let board4 = [
            [-1, -1, -1, 6, -1, -1, 4, -1, -1],
            [7, -1, -1, -1, -1, 3, 6, -1, -1],
            [-1, -1, -1, -1, 9, 1, -1, 8, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, 5, -1, 1, 8, -1, -1, -1, 3],
            [-1, -1, -1, 3, -1, 6, -1, 4, 5],
            [-1, 4, -1, 2, -1, -1, -1, 6, -1],
            [9, -1, 3, -1, -1, -1, -1, -1, -1],
            [-1, 2, -1, -1, -1, -1, 1, -1, -1],
        ];
        // Difficult
        let board5 = [
            [2, -1, -1, 3, -1, -1, -1, -1, -1],
            [8, -1, 4, -1, 6, 2, -1, -1, 3],
            [-1, 1, 3, 8, -1, -1, 2, -1, -1],
            [-1, -1, -1, -1, 2, -1, 3, 9, -1],
            [5, -1, 7, -1, -1, -1, 6, 2, 1],
            [-1, 3, 2, -1, -1, 6, -1, -1, -1],
            [-1, 2, -1, -1, -1, 9, 1, 4, -1],
            [6, -1, 1, 2, 5, -1, 8, -1, 9],
            [-1, -1, -1, -1, -1, 1, -1, -1, 2],
        ];
        // Not Fun
        let board6 = [
            [-1, 2, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, 6, -1, -1, -1, -1, 3],
            [-1, 7, 4, -1, 8, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, 3, -1, -1, 2],
            [-1, 8, -1, -1, 4, -1, -1, 1, -1],
            [6, -1, -1, 5, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, 1, -1, 7, 8, -1],
            [5, -1, -1, -1, -1, 9, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, 4, -1],
        ];
        // Intermediate 
        let board7 = [
            [6, 5, 9, -1, 1, -1, 2, 8, -1],
            [1, -1, -1, -1, 5, -1, -1, 3, -1],
            [2, -1, -1, 8, -1, -1, -1, 1, -1],
            [-1, -1, -1, 1, 3, 5, -1, 7, -1],
            [8, -1, -1, 9, -1, -1, -1, -1, 2],
            [-1, -1, 3, -1, 7, 8, 6, 4, -1],
            [3, -1, 2, -1, -1, 9, -1, -1, 4],
            [-1, -1, -1, -1, -1, 1, 8, -1, -1],
            [-1, -1, 8, 7, 6, -1, -1, -1, -1],
        ];

        switch (boardNumber) {
            case 1:
                return board1;
            case 2:
                return board2;
            case 3:
                return board3;
            case 4:
                return board4;
            case 5:
                return board5;
            case 6:
                return board6;
            case 7:
                return board7;
        }
    }

    function getEmptyCells(board) {
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                if (board[x][y] === -1) {
                    // Return the x-axis and y-axis on the board
                    return [x, y];
                }
            }
        }
        return [-1, -1];
    }

    function isCheckNumberValid(board, row, column, number) {
        if (checkRowValidation(board, row, number) && checkColumnValidation(board, column, number) && checkSquareValidation(board, row, column, number)) {
            return true;
        }
        return false;
    }

    function checkRowValidation(board, row, number) {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === number) {
                return false;
            }
        }
        return true;
    }

    function checkColumnValidation(board, column, number) {
        for (let i = 0; i < 9; i++) {
            if (board[i][column] === number) {
                return false;
            }
        }
        return true;
    }

    function checkSquareValidation(board, row, column, number) {
        let rowIndex = Math.floor(row / 3) * 3;
        let columnIndex = Math.floor(column / 3) * 3;

        for (let row = 0; row < 3; row++) {
            for (let column = 0; column < 3; column++) {
                if (board[rowIndex + row][columnIndex + column] === number) {
                    return false;
                }
            }
        }

        return true;
    }

    return (
        <div>
            <h3>Sudoku Solver</h3>
            <table>
                <tbody>
                    {
                        boardDimensions.map((row, rIndex) => {
                            return <tr key={rIndex}>
                                {boardDimensions.map((column, cIndex) => {
                                    return <td key={rIndex + cIndex}>
                                        <input value={sudokuArr[row][column] === -1 ? '' : sudokuArr[row][column]} className='cell' readOnly />
                                    </td>
                                })}
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <button className='New-board-button' onClick={handleNewBoard} >
                New Board
            </button>
            <button className='Solve-puzzle-button' onClick={handleSolvePuzzle}>
                Solve Puzzle
            </button>
        </div>
    )
}

export default SudokuBoard