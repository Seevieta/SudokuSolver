import React, { useState } from 'react'

function SudokuBoard() {
    const boardDimensions = [0,1,2,3,4,5,6,7,8]

    const sudokuBoardVal = [
        [-1, 5, -1, 9, -1, -1, -1, -1, -1],
        [8, -1, -1, -1, 4, -1, 3, -1, 7],
        [-1, -1, -1, 2, 8, -1, -1, 9, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, 3, -1, -1, 7, -1],
    ]

    const [sudokuArr, setSudokuArr] = useState(sudokuBoardVal);

    // Set the default Board Values
    const handleNewBoard = () => {
        console.log('New Board button clicked');
        setSudokuArr(sudokuBoardVal);
    }

    // Set a different values for the board
    const handleSolvePuzzle = () => {
        console.log('Solve Puzzle button clicked');

        console.log('Checking if values changes');
        const newBoardValue = [
            [-1, 5, -1, 9, -1, -1, -1, -1, -1],
            [8, -1, -1, -1, 4, -1, 3, -1, 7],
            [-1, -1, -1, 2, 8, -1, -1, 9, -1],
            [5, 3, 8, 6, -1, 7, 9, 4, -1],
            [-1, 2, -1, 3, -1, 1, -1, -1, -1],
            [1, -1, 9, 8, -1, 4, 6, 2, 3],
            [9, -1, 7, 4, -1, -1, -1, -1, -1],
            [-1, 4, 5, -1, -1, -1, 2, -1, 9],
            [-1, -1, -1, -1, 3, -1, -1, 7, -1],
        ]
        setSudokuArr(newBoardValue);
        console.log('The value has been changed');
        alert("Time to solve the puzzle : 7 seconds");
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
                                    <input value={sudokuArr[row][column] === -1 ? '' : sudokuArr[row][column]} className='cell' readOnly/>
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