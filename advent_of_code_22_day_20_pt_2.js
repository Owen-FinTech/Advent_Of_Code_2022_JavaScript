let inputString = ``; // Insert your puzzle input between the backticks

let input = inputString.split('\n');

for (let i = 0; i < input.length; i++) {
    input[i] = BigInt(input[i]) * BigInt(811589153);
}

let indexMap = {};

for (let i = 0; i < input.length; i++) {
    indexMap[i] = i;
}

let count = 0;

while (count < 10) {
    for (let i = 0; i < input.length; i++) {
        let spliced = input.splice(indexMap[JSON.stringify(i)], 1);
        if (BigInt(spliced[0]) == BigInt(0)) {
            let startSlice = input.slice(0, indexMap[JSON.stringify(i)]);
            let endSlice = input.slice(indexMap[JSON.stringify(i)]);
            startSlice.push(spliced[0]);
            for (let l = 0; l < endSlice.length; l++) {
                startSlice.push(endSlice[l]);
            }
            input = startSlice.slice();
        } else {;
            let prev = indexMap[JSON.stringify(i)];
            for (let j = 0; j < input.length + 1; j++) {
                if (indexMap[JSON.stringify(j)] > prev && j != i) {
                    indexMap[JSON.stringify(j)] -= 1;
                }
            }
            if ((BigInt(indexMap[JSON.stringify(i)]) + BigInt(spliced[0])) % BigInt(input.length) > BigInt(0)) {
                indexMap[JSON.stringify(i)] = Number((BigInt(indexMap[JSON.stringify(i)]) + BigInt(spliced[0])) % BigInt(input.length));
                 
            } else {
                indexMap[JSON.stringify(i)] = Number((BigInt(input.length) + ((BigInt(indexMap[JSON.stringify(i)]) + BigInt(spliced[0])) % BigInt(input.length))));
            }
            let startSlice = input.slice(0, indexMap[JSON.stringify(i)]);
            let endSlice = input.slice(indexMap[JSON.stringify(i)]);
            startSlice.push(spliced[0]);
            for (let k = 0; k < input.length + 1; k++) {
                if (indexMap[JSON.stringify(k)] >= indexMap[JSON.stringify(i)] && k != i) {
                    indexMap[JSON.stringify(k)] += 1;
                }
            }
            for (let l = 0; l < endSlice.length; l++) {
                startSlice.push(endSlice[l]);
            }
            input = startSlice.slice();
        }
        
    }
    count += 1;

    if (count == 10) break;
}

let thousandth = input[(input.indexOf(BigInt(0)) + 1000) % input.length];
let twoThousandth = input[(input.indexOf(BigInt(0)) + 2000) % input.length];
let threeThousandth = input[(input.indexOf(BigInt(0)) + 3000) % input.length];
let sum = thousandth + twoThousandth + threeThousandth;
console.log("sum:", sum);