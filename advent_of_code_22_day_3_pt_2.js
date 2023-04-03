let inputString = ``; // Insert your puzzle input between the backticks

let inputArray = inputString.split('\n');

let letterIndexes = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

let totalTwo = 0;

for (let i = 0; i < inputArray.length; i += 3) {
    let count = 0;
    for (let j = 0; j < inputArray[i].length; j++) {
        if (inputArray[i + 1].includes(inputArray[i][j]) && inputArray[i + 2].includes(inputArray[i][j]) && count == 0) {
            let priority = inputArray[i][j];
            totalTwo += letterIndexes.indexOf(priority);
            count += 1;
        }
    }
}

console.log("Total: ", totalTwo);