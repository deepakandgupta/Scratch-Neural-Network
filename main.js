let training_data = [
  {
    inputs: [0, 0],
    targets: [0]
  },
  {
    inputs: [1, 0],
    targets: [1]
  },
  {
    inputs: [0, 1],
    targets: [1]
  },
  {
    inputs: [1, 1],
    targets: [0]
  }
];

let n = new NeuralNetwork(2, 2, 1);

console.log(training_data[1].inputs + "|" + training_data[1].targets);

for (let i = 0; i < 100000; i++) {
  let index = Math.floor(Math.random() * 4);
  n.train(training_data[index].inputs, training_data[index].targets);
}
console.log(n.feedForward([0, 0]));
console.log(n.feedForward([1, 0]));
console.log(n.feedForward([0, 1]));
console.log(n.feedForward([1, 1]));
// console.log(output);
//--------------------Hadamard test-------------------------
// var m = new Matrix(2, 3);
// var m1 = new Matrix(2, 3);
// m.randomize();
// m.map(x => Math.floor(x * 10 + 1));
// m1.randomize();
// m1.map(x => Math.floor(x * 10 + 1));
// m.print();
// m1.print();
// Matrix.multiply(m, m1, "elementwise");
// m.print();
// // m1.print();
//----------------------------------------------------------
//---------Static map and instance map check test-----------
// var m = new Matrix(2, 3);
// m.randomize();
// m.map(x => Math.floor(x * 10 + 1));
// m.print();
// var r = Matrix.map(m, x => x * 10);
// r.print();
// m.print();
//-----------------------------------------------------------
