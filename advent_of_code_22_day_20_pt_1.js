let inputString = ``; // Insert your puzzle input between the backticks

let input = inputString.split('\n');

for (let i = 0; i < input.length; i++) {
    input[i] = Number(input[i]);
}

let indexMap = {};

for (let i = 0; i < input.length; i++) {
    indexMap[i] = i;
}

for (let i = 0; i < input.length; i++) {
    let spliced = input.splice(indexMap[JSON.stringify(i)], 1);
    if (spliced[0] == 0) {
        let startSlice = input.slice(0, indexMap[JSON.stringify(i)]);
        let endSlice = input.slice(indexMap[JSON.stringify(i)]);
        startSlice.push(spliced[0]);
        for (let l = 0; l < endSlice.length; l++) {
            startSlice.push(endSlice[l]);
        }
        input = JSON.parse(JSON.stringify(startSlice));
    } else {
        let indexMapKeys = Object.keys(indexMap);
        let prev = indexMap[JSON.stringify(i)];
        if ((indexMap[JSON.stringify(i)] + spliced[0]) % indexMapKeys.length > 0) {
            if ((indexMap[JSON.stringify(i)] + spliced[0]) > indexMapKeys.length) {
                indexMap[JSON.stringify(i)] = (indexMap[JSON.stringify(i)] + spliced[0]) % indexMapKeys.length + 1;
            } else {
                indexMap[JSON.stringify(i)] = (indexMap[JSON.stringify(i)] + spliced[0]) % indexMapKeys.length;
            } 
        } else {
            indexMap[JSON.stringify(i)] = indexMapKeys.length + ((indexMap[JSON.stringify(i)] + spliced[0]) % indexMapKeys.length) - 1;
        }
        for (let j = 0; j < indexMapKeys.length; j++) {
            if (indexMap[indexMapKeys[j]] >= prev && indexMapKeys[j] != JSON.stringify(i)) {
                indexMap[indexMapKeys[j]] -= 1;
            }
        }
        let startSlice = input.slice(0, indexMap[JSON.stringify(i)]);
        let endSlice = input.slice(indexMap[JSON.stringify(i)]);
        startSlice.push(spliced[0]);
        for (let k = 0; k < indexMapKeys.length; k++) {
            if (indexMap[indexMapKeys[k]] >= indexMap[JSON.stringify(i)] && indexMapKeys[k] != JSON.stringify(i)) {
                indexMap[indexMapKeys[k]] += 1;
            }
        }
        for (let l = 0; l < endSlice.length; l++) {
            startSlice.push(endSlice[l]);
        }
        input = JSON.parse(JSON.stringify(startSlice));
    }
}

let thousandth = input[(input.indexOf(0) + 1000) % input.length];
let twoThousandth = input[(input.indexOf(0) + 2000) % input.length];
let threeThousandth = input[(input.indexOf(0) + 3000) % input.length];
let sum = thousandth + twoThousandth + threeThousandth;
console.log("sum:", sum);
