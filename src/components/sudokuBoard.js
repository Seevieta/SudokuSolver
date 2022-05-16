import React, { useState } from 'react'

function SudokuBoard() {
    const boardDimensions = [0,1,2,3,4,5,6,7,8]

    // const sudokuBoardVal = [
    //     [-1, 5, -1, 9, -1, -1, -1, -1, -1],
    //     [8, -1, -1, -1, 4, -1, 3, -1, 7],
    //     [-1, -1, -1, 2, 8, -1, -1, 9, -1],
    //     [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    //     [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    //     [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    //     [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    //     [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    //     [-1, -1, -1, -1, 3, -1, -1, 7, -1],
    // ]

    const sudokuBoardVal = [
        [-1, 3, -1, -1, 5, -1 , 2, -1, 8],
        [-1, -1, 4, -1, -1, -1, 9, -1, -1],
        [-1, -1, -1, 6, -1, -1, -1, 1, -1],
        [-1, 6, 7, 5,-1, -1, 1, -1, -1],
        [-1, -1, -1, -1, 8, -1, -1, -1, -1],
        [-1, -1, 1, -1, -1, 9, 8, 4, -1],
        [-1, 7, -1, -1, -1, 6, -1, -1, -1],
        [-1, -1, 8, -1, -1, -1, 3, -1, -1],
        [1, -1, 2, -1, 4, -1, -1, 8, -1],
    ]

    // const sudokuBoardVal = [
    //     [-1, 5, -1, 9, -1, -1, -1, -1, -1],
    //     [8, -1, -1, -1, 4, -1, 3, -1, 7],
    //     [-1, -1, -1, 2, 8, -1, -1, 9, -1],
    //     [5, 3, 8, 6, -1, 7, 9, 4, -1],
    //     [-1, 2, -1, 3, -1, 1, -1, -1, -1],
    //     [1, -1, 9, 8, -1, 4, 6, 2, 3],
    //     [9, -1, 7, 4, -1, -1, -1, -1, -1],
    //     [-1, 4, 5, -1, -1, -1, 2, -1, 9],
    //     [-1, -1, -1, -1, 3, -1, -1, 7, -1],
    // ]

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

        const solvedPuzzle = solvePuzzle(sudokuBoardVal);

        setSudokuArr(newBoardValue);

        console.log('The value has been changed');
        console.log(solvedPuzzle);
        //alert("Time to solve the puzzle : 7 seconds");
    }

     function solvePuzzle(sudokuBoard){
        let nextCell = getEmptyCells(sudokuBoard);
        let cellRow = nextCell[0];
        let cellColumn = nextCell[1];
        
        // If there are no empty cells
        if(cellRow === -1 || cellColumn === -1){
            return sudokuBoard;
        }

        for(let number=1; number<=9; number++){
            if(checkNumber(sudokuBoard, cellRow, cellColumn, number)){
                sudokuBoard[cellRow][cellColumn] = number;
                solvePuzzle(sudokuBoard);
            }
        }

        if(getEmptyCells(sudokuBoard)[0] !== -1)
            sudokuBoard[cellRow][cellColumn] = -1;


        return sudokuBoard;
        // for(let cellValue = 1; cellValue <=9; cellValue++){
        //     if()
        // }

        // // If the cell is empty
        // if(sudokuBoard[row][column] == -1){
        //     rowIndex = row;
        //     columIndex = column;

        //     isBoardEmpty = false;
        // }
        
    }

    function getEmptyCells(board){
        for(let x=0; x<9; x++){
            for(let y=0; y<9; y++){
                if(board[x][y]===-1){
                    // Return the x-axis and y-axis on the board
                    return [x,y];
                }
            }
        }
        return[-1,-1];
    }

    function checkNumber(board, row, column, number){
        if(checkRow(board,row,number) && checkColumn(board, column, number) && checkSquare(board, row, column, number)){
            return true;
        }
        return false;
    }

    function checkRow(board, row, number){
        for(let i=0; i<9; i++){
            if(board[row][i] === number){
                return false;
            }
        }
        return true;
    }

    function checkColumn(board, column, number){
        for(let i=0; i<9; i++){
            if(board[i][column] === number){
                return false;
            }
        }
        return true;
    } 

    function checkSquare(board, row, column, number){
        let rowIndex = Math.floor(row / 3) * 3;
        let columnIndex = Math.floor(column / 3) * 3;

        for(let row=0; row<3; row++){
            for(let column=0; column<3; column++){
                if(board[rowIndex + row][columnIndex + column] === number){
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