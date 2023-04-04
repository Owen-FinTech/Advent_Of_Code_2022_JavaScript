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

let order = 0;
let sum = 1;

function compare(currentLeft, currentRight) {
    order = 0;
    if (currentLeft.length == 0 & currentRight.length == 0) {
        order = 0;
    } else if (currentLeft.length != 0 & currentRight.length == 0) {
        order = -1;
        return order;  
    } else if (currentLeft.length == 0 & currentRight.length != 0) {
        order = 1;
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
                    order = -1;
                    return order;
                } else if (currentLeft[j] < currentRight[j]) {
                    order = 1;
                    return order;
                } else {
                    if (j == (Math.min(currentLeft.length, currentRight.length) - 1)) {
                        if (currentLeft.length > currentRight.length) {
                            order = -1;
                            return order;
                        } 
                        if (currentLeft.length < currentRight.length) {
                            order = 1;
                            return order;
                        }
                    }
                }
            } else {
                let recursiveResult = compare(currentLeft[j], currentRight[j]);
                if (recursiveResult == 1) {
                    order = 1;
                    return order;
                }
                if (recursiveResult == -1) {
                    order = -1;
                    return order;
                }
            }
        }
    }
}

input = input.sort((a, b) => compare(a, b)).reverse();

for (let k = 0; k < input.length; k++) {
    if (input[k].length == 1 && input[k][0].length == 1 && (input[k][0][0] == 2 || input[k][0][0] == 6)) {
        sum *= (k + 1);
    }
}

console.log("sum:", sum);