// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');
/**
 * Helper function to read a matrix from user input.
 * @param {number} rows - Number of rows.
 * @param {number} cols - Number of columns.
 * @param {string} label - Name of the matrix for display.
 * @returns {number[][]} The constructed 2D array.
 */
function readMatrix(rows, cols, label = '') {
  const matrix = [];
  if (label) console.log(`--- Enter values for Matrix ${label} (${rows}x${cols}) ---`);
  
  for (let i = 0; i < rows; i++) {
    const input = readlineSync.question(`Enter row ${i + 1}: `);
    // Split space-separated string and convert elements to numbers
    const rowValues = input.trim().split(/\s+/).map(Number);
    
    // Fallback if user didn't enter exact number of values
    while (rowValues.length < cols) {
      rowValues.push(0);
    }
    matrix.push(rowValues.slice(0, cols));
  }
  return matrix;
}

/**
 * Displays a 2D matrix in an aligned grid format.
 * @param {number[][]} matrix - Matrix to display.
 */
function printMatrix(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    console.log(matrix[i].join('\t'));
  }
}

/**
 * PART A: Transposes an M x N matrix to an N x M matrix.
 * @param {number[][]} matrix - Input matrix.
 * @returns {number[][]} Transposed matrix.
 */
function transposeMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const transposed = [];

  for (let j = 0; j < cols; j++) {
    const newRow = [];
    for (let i = 0; i < rows; i++) {
      newRow.push(matrix[i][j]);
    }
    transposed.push(newRow);
  }
  return transposed;
}

/**
 * PART B: Adds two M x N matrices element-wise.
 * @param {number[][]} matrixA - First matrix.
 * @param {number[][]} matrixB - Second matrix.
 * @returns {number[][]} Sum matrix.
 */
function addMatrices(matrixA, matrixB) {
  const rows = matrixA.length;
  const cols = matrixA[0].length;
  const sumMatrix = [];

  for (let i = 0; i < rows; i++) {
    const newRow = [];
    for (let j = 0; j < cols; j++) {
      newRow.push(matrixA[i][j] + matrixB[i][j]);
    }
    sumMatrix.push(newRow);
  }
  return sumMatrix;
}

/**
 * PART C: Multiplies matrix A (M x N) and matrix B (N x P).
 * @param {number[][]} matrixA - Matrix A.
 * @param {number[][]} matrixB - Matrix B.
 * @returns {number[][]} Product matrix (M x P).
 */
function multiplyMatrices(matrixA, matrixB) {
  const rowsA = matrixA.length;
  const colsA = matrixA[0].length;
  const colsB = matrixB[0].length;
  const productMatrix = [];

  for (let i = 0; i < rowsA; i++) {
    const newRow = [];
    for (let j = 0; j < colsB; j++) {
      let sum = 0;
      for (let k = 0; k < colsA; k++) {
        sum += matrixA[i][k] * matrixB[k][j];
      }
      newRow.push(sum);
    }
    productMatrix.push(newRow);
  }
  return productMatrix;
}

/**
 * Main function orchestrating user interaction and matrix operations.
 */
function main() {
  console.log('=== PART A: TRANSPOSE A MATRIX ===');
  const rowsA = readlineSync.questionInt('Enter number of rows: ');
  const colsA = readlineSync.questionInt('Enter number of columns: ');
  
  if (rowsA <= 0 || colsA <= 0) {
    console.log('Error: Matrix dimensions must be positive integers.');
    return;
  }

  const matrixA = readMatrix(rowsA, colsA, 'A');
  
  console.log('\nOriginal Matrix A:');
  printMatrix(matrixA);
  
  console.log('\nTransposed Matrix A:');
  printMatrix(transposeMatrix(matrixA));

  console.log('\n=== PART B: ADD TWO MATRICES ===');
  console.log(`(Reading Matrix B with matching size: ${rowsA}x${colsA})`);
  const matrixB = readMatrix(rowsA, colsA, 'B');

  console.log('\nMatrix A + Matrix B:');
  printMatrix(addMatrices(matrixA, matrixB));

  console.log('\n=== PART C: MULTIPLY TWO MATRICES ===');
  console.log(`For matrix product A x C, Matrix C must have ${colsA} rows.`);
  const colsC = readlineSync.questionInt('Enter number of columns for Matrix C: ');

  if (colsC <= 0) {
    console.log('Error: Columns must be a positive integer.');
    return;
  }

  const matrixC = readMatrix(colsA, colsC, 'C');

  console.log('\nMatrix A x Matrix C:');
  printMatrix(multiplyMatrices(matrixA, matrixC));
}

// Execute the program
main();
