let inputString = ``; // Insert your puzzle input between the backticks
let fourSet = new Set();

for (let i = 0; i < inputString.length; i++) {
    fourSet.clear();
    fourSet.add(inputString[i]);
    fourSet.add(inputString[i + 1]);
    fourSet.add(inputString[i + 2]);
    fourSet.add(inputString[i + 3]);
    if (fourSet.size == 4) {
        console.log("Result: ", i + 4);
        break;
    }
}