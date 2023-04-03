let inputString = `` // Insert your puzzle input between the backticks

let puzzleInput = inputString.split('\n\n');

for (let i = 0; i < puzzleInput.length; i++) {
    puzzleInput[i] = puzzleInput[i].split('\n');
}
    
let sumArray = [];
for (let i = 0; i < puzzleInput.length; i++) {
    let eachSum = 0;
    for (let j = 0; j < puzzleInput[i].length; j++) {
        eachSum += Number(puzzleInput[i][j]);
    }
    sumArray.push(eachSum);
}

let answerOne = Math.max(...sumArray);

let firstIndex = sumArray.indexOf(answerOne);
sumArray.splice(firstIndex, 1);
let answerTwo = Math.max(...sumArray);

let secondIndex = sumArray.indexOf(answerTwo);
sumArray.splice(secondIndex, 1);
let answerThree = Math.max(...sumArray);

let total = answerOne + answerTwo + answerThree;
console.log("Total: ", total);