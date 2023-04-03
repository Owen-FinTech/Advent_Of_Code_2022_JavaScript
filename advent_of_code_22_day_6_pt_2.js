let inputString = ``; // Insert your puzzle input between the backticks
let fourteenSet = new Set();

for (let i = 0; i < inputString.length; i++) {
    fourteenSet.clear();
    fourteenSet.add(inputString[i]);
    fourteenSet.add(inputString[i + 1]);
    fourteenSet.add(inputString[i + 2]);
    fourteenSet.add(inputString[i + 3]);
    fourteenSet.add(inputString[i + 4]);
    fourteenSet.add(inputString[i + 5]);
    fourteenSet.add(inputString[i + 6]);
    fourteenSet.add(inputString[i + 7]);
    fourteenSet.add(inputString[i + 8]);
    fourteenSet.add(inputString[i + 9]);
    fourteenSet.add(inputString[i + 10]);
    fourteenSet.add(inputString[i + 11]);
    fourteenSet.add(inputString[i + 12]);
    fourteenSet.add(inputString[i + 13]);
    if (fourteenSet.size == 14) {
        console.log("Result: ", i + 14);
        break;
    }
}

