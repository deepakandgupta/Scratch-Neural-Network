function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
  //sigmoid'(x) = sigmoid(x)*(1-sigmoid(x))
}
function dSigmoid(y) {
  return y * (1 - y);
}
class NeuralNetwork {
  constructor(input_nodes, hidden_nodes, output_nodes) {
    this.input_nodes = input_nodes;
    this.hidden_nodes = hidden_nodes;
    this.output_nodes = output_nodes;
    this.weights_i_h = new Matrix(this.hidden_nodes, this.input_nodes);
    this.weights_h_o = new Matrix(this.output_nodes, this.hidden_nodes);
    this.weights_i_h.randomize();
    this.weights_h_o.randomize();
    this.bias_h = new Matrix(this.hidden_nodes, 1);
    this.bias_o = new Matrix(this.output_nodes, 1);
    this.bias_h.randomize();
    this.bias_o.randomize();
    this.learning_rate = 0.1;
  }
  feedForward(input_array) {
    //calculating the hidden matrix
    let input_matrix = Matrix.fromArray(input_array);
    let hidden_matrix = Matrix.multiply(this.weights_i_h, input_matrix);
    hidden_matrix.add(this.bias_h);
    //Activation function
    hidden_matrix.map(sigmoid);
    ////////////////////////////////////////////////////////////////
    let output_matrix = Matrix.multiply(this.weights_h_o, hidden_matrix);
    output_matrix.add(this.bias_o);
    //Activation function
    output_matrix.map(sigmoid);
    ///////////////////////////////////////////////////////////////
    return output_matrix.toArray();
  }
  train(input_array, targets_array) {
    //calculating the hidden matrix
    let input_matrix = Matrix.fromArray(input_array);
    let hidden_matrix = Matrix.multiply(this.weights_i_h, input_matrix);
    hidden_matrix.add(this.bias_h);
    //Activation function
    hidden_matrix.map(sigmoid);
    ////////////////////////////////////////////////////////////////
    let output_matrix = Matrix.multiply(this.weights_h_o, hidden_matrix);
    output_matrix.add(this.bias_o);
    //Activation function
    output_matrix.map(sigmoid);

    //convert array to matrix
    let targets = Matrix.fromArray(targets_array);
    //Calculating the errors
    //Error = Target - outputs
    // targets.print();
    // output_matrix.print();

    let output_errors = Matrix.subtract(targets, output_matrix);
    //Calculating gradient
    // change in weights = lr * error * differentiation of
    //activation function * transpose of inputs(giving us a weight matrix)
    let gradients = Matrix.map(output_matrix, dSigmoid); //we pass a sigmoid output and then differentiate it
    Matrix.multiply(gradients, output_errors, "elementwise"); // hadamard or elementwise multiplication
    gradients.multiply(this.learning_rate);

    ///////////////////////////////////
    //Calculate deltas
    let hidden_matrix_tra = Matrix.transpose(hidden_matrix);
    let weights_h_o_delta = Matrix.multiply(gradients, hidden_matrix_tra);
    ///Change all the weights by delta
    this.weights_h_o.add(weights_h_o_delta);

    ////////////////////////////////////////////////////////////////
    //Calculate hidden delta
    let weights_h_o_tra = Matrix.transpose(this.weights_h_o); // Transpose of weight from h to o to get weight from o to h
    let hidden_errors = Matrix.multiply(weights_h_o_tra, output_errors); // going back again with hidden layers
    let hidden_gradient = Matrix.map(hidden_matrix, dSigmoid);
    Matrix.multiply(hidden_gradient, hidden_errors, "elementwise");
    hidden_gradient.multiply(this.learning_rate);
    /////Calculate delta for weight from input to hidden but coming backwards
    let input_matrix_tra = Matrix.transpose(input_matrix);
    let weights_i_h_delta = Matrix.multiply(hidden_gradient, input_matrix_tra);
    ///Changing all input weight with delta
    this.weights_i_h.add(weights_i_h_delta);
    ///////////////////////////////////////////////////
    ////Bias delta addition
    this.bias_h.add(hidden_gradient);
    // targets.print();
    // outputs.print();
    // output_errors.print();
  }
}
