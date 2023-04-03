let inputString = ``; // Insert your puzzle input between the backticks

let inputArray = inputString.split('\n');

let total = 0;
for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i] == 'A X') {
        total += 4;
    } else if (inputArray[i] == 'A Y') {
        total += 8;
    } else if (inputArray[i] == 'A Z') {
        total += 3;
    } else if (inputArray[i] == 'B X') {
        total += 1;
    } else if (inputArray[i] == 'B Y') {
        total += 5;
    } else if (inputArray[i] == 'B Z') {
        total += 9;
    } else if (inputArray[i] == 'C X') {
        total += 7;
    } else if (inputArray[i] == 'C Y') {
        total += 2;
    } else {
        total += 6;
    }
}

console.log("Total: ", total);