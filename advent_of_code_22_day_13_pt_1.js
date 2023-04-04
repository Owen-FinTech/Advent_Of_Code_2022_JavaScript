let inputString = ``; // Insert your puzzle input between the backticks

let splitString = inputString.split('\n');

for (let i = 0; i < splitString.length; i++) {
    if (splitString[i] == '') {
        splitString.splice(i, 1);
    }
}

let input = []

for (let i = 0; i < splitString.length; i++) {
    input.push(JSON.parse(splitString[i]));
}

let order = 'neither';
let sum = 0;

function compare(currentLeft, currentRight) {
    order = 'neither';
    if (currentLeft.length == 0 & currentRight.length == 0) {
        order = 'neither';
    } else if (currentLeft.length != 0 & currentRight.length == 0) {
        order = 'incorrect';
        return order;  
    } else if (currentLeft.length == 0 & currentRight.length != 0) {
        order = 'correct';
        return order;
    } else {
        for (let j = 0; j < Math.min(currentLeft.length, currentRight.length); j++) {
            if (typeof currentLeft[j] != typeof currentRight[j]) {
                if (typeof currentLeft[j] != 'object') {
                    currentLeft[j] = [currentLeft[j]];
                } else {
                    currentRight[j] = [currentRight[j]];
                }
            } 
            if (typeof currentLeft[j] == 'number' && typeof currentRight[j] == 'number') {
                if (currentLeft[j] > currentRight[j]) {
                    order = 'incorrect';
                    return order;
                } else if (currentLeft[j] < currentRight[j]) {
                    order = 'correct';
                    return order;
                } else {
                    if (j == (Math.min(currentLeft.length, currentRight.length) - 1)) {
                        if (currentLeft.length > currentRight.length) {
                            order = 'incorrect';
                            return order;
                        } 
                        if (currentLeft.length < currentRight.length) {
                            order = 'correct';
                            return order;
                        }
                    }
                }
            } else {
                let recursiveResult = compare(currentLeft[j], currentRight[j]);
                if (recursiveResult == 'correct') {
                    order = 'correct';
                    return order;
                }
                if (recursiveResult == 'incorrect') {
                    order = 'incorrect';
                    return order;
                }
            }
        }
    }
}

for (let k = 0; k < input.length; k += 2) {
    let result = compare(input[k], input[k + 1]);
    if (result == 'correct') {
        sum += ((k / 2) + 1);
    }
}

console.log("sum:", sum);