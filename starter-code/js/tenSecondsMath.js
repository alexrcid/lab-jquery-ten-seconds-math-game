// Use this file to write the logic of your game, the needed attrs and functions

var TenSecondsMathGame = function(operations, numberLimit) {
  this.operations = operations;
  this.numberLimit = numberLimit;
};

// Returns a random integer between [1..numberLimit]

var randomLimit = function (numberLimit) {
  return Math.floor(Math.random()*numberLimit);
};

// Rule 2: The difference between the generated operators can't be less than 3 (except for the division)
function isDifferenceLessThan3(a,b) {
  if ( ((a > b) && (a - b) < 3) || ((a < b) && (b - a) < 3) ) {
    return true;
  } else {
    return false;
  }
}

// Returns an object with {question, answer}
var generateQuestion = function(operations, numberLimit) {

  // set the operator
  var operators = ["+", "-", "*", "/"];
  var operator;

  // If more than one operations, select one randomly
  if(operations.length > 1) {
    operator = operators[randomLimit(operations.length)];
  } else {
    operator = operations[0];
  }

  // Set numbers for operation
  var a = randomLimit(numberLimit);
  var b = randomLimit(numberLimit);

  // Rule 3: The generated numbers should never be equal (except for the division)
  if ( ((a === b) || isDifferenceLessThan3(a,b)) && (operator !== "/") ) {
    while(a === b || isDifferenceLessThan3(a,b)) {
      a = randomLimit(numberLimit);
      b = randomLimit(numberLimit);
    }
  }

  // Generate the Answer
  var newAnswer = 0;

  switch(operator) {
    case "+":
      newAnswer = a + b;
      break;
    case "-":
      // Rule 2: The result should never be negative
      if(b > a) {
        var tmp = a;
        a = b;
        b = tmp;
      }
      newAnswer = a - b;
      break;
    case "*":
      newAnswer = a * b;
      break;
    case "/":
      // Rule 2: The result should never be negative
      if(b > a) {
        var tmp = a;
        a = b;
        b = tmp;
      }
      newAnswer = a / b;
      break;
    default : console.log("This operator does not exist: ", operator);
  }

  // Generate question
  var newQuestion = a.toString() +" "+ operator +" "+ b.toString();

  var gameParameters = {
    question: newQuestion,
    answer: newAnswer
  };
  console.log(gameParameters.question);
  return gameParameters;
};

console.log(generateQuestion(["+","-","*","/"],20));

// Checks a user answer
