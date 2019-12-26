class Matrix {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.data = new Array(rows);
    for (let i = 0; i < rows; i++) {
      this.data[i] = new Array(columns);
      for (let j = 0; j < columns; j++) {
        this.data[i][j] = 0;
      }
    }
  }
  //Randomizer to test functions
  randomize() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.data[i][j] = Math.random() * 2 - 1; // Random b/w -1 and 1
      }
    }
  }
  static transpose(m) {
    var temp = new Matrix(m.columns, m.rows);
    for (let i = 0; i < m.rows; i++) {
      for (let j = 0; j < m.columns; j++) {
        temp.data[j][i] = m.data[i][j];
      }
    }
    return temp;
  }
  static multiply(m1, n) {
    if (arguments.length === 2) {
      //matrix multiplication is not commutative i.e A*B != B*A

      if (m1.columns != n.rows) {
        console.log(
          "Error Columns of matrix 1 does not match rows of matrix 2"
        );
        return undefined;
      }
      let result = new Matrix(m1.rows, n.columns);
      let sum = 0;
      for (let i = 0; i < m1.rows; i++) {
        for (let j = 0; j < n.columns; j++) {
          sum = 0;
          for (let k = 0; k < m1.columns; k++) {
            sum = sum + m1.data[i][k] * n.data[k][j];
          }
          result.data[i][j] = sum;
        }
      }
      return result;
    }
    //rare cases if one ever needs a hadamard or elementwise multiplication
    if (
      arguments.length === 3 &&
      (arguments[2] == "Hadamard" || arguments[2] == "elementwise")
    ) {
      for (let i = 0; i < m1.rows; i++) {
        for (let j = 0; j < m1.columns; j++) {
          m1.data[i][j] *= n.data[i][j];
        }
      }
      return;
    }
  }
  multiply(n) {
    //its equivalent to matrix[a,b] * n(scalar)*identity matrix[1,1] = [a*n, b*n]
    //------------------------[c,d]----------------------------[1,1] = [c*n, d*n]
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.data[i][j] *= n;
      }
    }
  }
  add(n) {
    //Matrix addtion element wise
    if (n instanceof Matrix) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.data[i][j] += n.data[i][j];
        }
      }
      return;
    }
    //its equivalent to matrix[a,b] + n(scalar)*identity matrix[1,1] = [a+n, b+n]
    //------------------------[c,d]----------------------------[1,1] = [c+n, d+n]
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.data[i][j] += n;
      }
    }
  }
  static subtract(m, n) {
    if (m.rows == n.rows && m.columns == n.columns) {
      let result = new Matrix(m.rows, m.columns);
      for (let i = 0; i < m.rows; i++) {
        for (let j = 0; j < m.columns; j++) {
          result.data[i][j] = m.data[i][j] - n.data[i][j];
        }
      }
      return result;
    }
    console.log(
      "Error Rows & Columns of matrix 1 does not match rows & Columns of matrix 2"
    );
    return;
  }
  static fromArray(arr) {
    let m = new Matrix(arr.length, 1);
    for (let i = 0; i < arr.length; i++) {
      m.data[i][0] = arr[i];
    }
    return m;
  }
  toArray() {
    let arr = [];
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        arr.push(this.data[i][j]);
      }
    }
    return arr;
  }
  static map(mat, func) {
    var result = new Matrix(mat.rows, mat.columns);
    for (let i = 0; i < mat.rows; i++) {
      for (let j = 0; j < mat.columns; j++) {
        result.data[i][j] = func(mat.data[i][j], i, j);
      }
    }
    return result;
  }
  map(func) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.data[i][j] = func(this.data[i][j], i, j);
      }
    }
  }
  print() {
    console.table(this.data);
  }
}
////////////////////Testing\\\\\\\\\\\\\\\\\\\\\\
// var m = new Matrix(2, 3);
// m.randomize();
// m.print();
// var n = new Matrix(3, 2);
// n.randomize();
// n.print();
// Matrix.multiply(m, n).print();
// m.multiply(2);
// m.print();
////////////////////Testing\\\\\\\\\\\\\\\\\\\\\\
