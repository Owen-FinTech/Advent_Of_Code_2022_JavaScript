let inputString = ``; // Insert your puzzle input between the backticks

let inputArray = inputString.split('\n');

let letterIndexes = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

let total = 0;

for (let i = 0; i < inputArray.length; i++) {
    let count = 0;
    for (let j = 0; j < (inputArray[i].length / 2); j++) {
        if (inputArray[i].slice((inputArray[i].length / 2)).includes(inputArray[i][j]) && count == 0) {
            let priority = inputArray[i][j];
            total += letterIndexes.indexOf(priority);
            count += 1;
        }
    }
}

console.log("Total: ", total);