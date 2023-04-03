let inputPairs = ``; // Insert your puzzle input between the backticks

let inputArray = inputPairs.split('\n');

let pairsArray = [];
for (let i = 0; i < inputArray.length; i++) {
    let splitArray = inputArray[i].split(',');
    pairsArray.push(splitArray[0]);
    pairsArray.push(splitArray[1]);
}

let singleArray = [];
for (let i = 0; i < pairsArray.length; i++) {
    let singleSplit = pairsArray[i].split('-');
    singleArray.push(singleSplit[0]);
    singleArray.push(singleSplit[1]);
}

let totalTwo = 0;
for (let i = 0; i < singleArray.length; i += 4) {
    if (Number(singleArray[i + 1]) >= Number(singleArray[i + 2]) && Number(singleArray[i + 1]) <= Number(singleArray[i + 3])) {
        totalTwo += 1;
    } else if (Number(singleArray[i]) >= Number(singleArray[i + 2]) && Number(singleArray[i]) <= Number(singleArray[i + 3])) {
        totalTwo += 1;
    } else if (Number(singleArray[i + 2]) >= Number(singleArray[i]) && Number(singleArray[i + 2]) <= Number(singleArray[i + 1])) {
        totalTwo += 1;
    } else if (Number(singleArray[i + 3]) >= Number(singleArray[i]) && Number(singleArray[i + 3]) <= Number(singleArray[i + 1])) {
        totalTwo += 1;
    }
}

console.log("Total: ", totalTwo);