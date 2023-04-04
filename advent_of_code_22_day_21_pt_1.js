let inputString = ``; // Insert your puzzle input between the backticks

let input = inputString.split('\n');

for (let i = 0; i < input.length; i++) {
    input[i] = input[i].split(' ');
}

let inputObj = {};

for (let i = 0; i < input.length; i++) {
    input[i][0] = input[i][0].slice(0, 4);
    inputObj[input[i][0]] = input[i].slice(1);
    if (inputObj[input[i][0]].length == 1) {
        inputObj[input[i][0]][0] = Number(inputObj[input[i][0]][0]);
    }
}

let inputKeys = Object.keys(inputObj);

while (inputObj['root'].length > 1) {
    for (let i = 0; i < inputKeys.length; i++) {
        if (inputObj[inputKeys[i]].length == 3) {
            if (typeof inputObj[inputKeys[i]][0] == 'string') {
                if (inputObj[inputObj[inputKeys[i]][0]].length == 1) {
                    inputObj[inputKeys[i]][0] = inputObj[inputObj[inputKeys[i]][0]][0];
                }
            }
            if (typeof inputObj[inputKeys[i]][2] == 'string') {
                if (inputObj[inputObj[inputKeys[i]][2]].length == 1) {
                    inputObj[inputKeys[i]][2] = inputObj[inputObj[inputKeys[i]][2]][0];
                }
            }
        }
    }
    for (let j = 0; j < inputKeys.length; j++) {
        if (inputObj[inputKeys[j]].length == 3 && typeof inputObj[inputKeys[j]][0] == 'number' && typeof inputObj[inputKeys[j]][2] == 'number') {
            if (inputObj[inputKeys[j]][1] == '+') {
                inputObj[inputKeys[j]] = [inputObj[inputKeys[j]][0] + inputObj[inputKeys[j]][2]];
            } else if (inputObj[inputKeys[j]][1] == '-') {
                inputObj[inputKeys[j]] = [inputObj[inputKeys[j]][0] - inputObj[inputKeys[j]][2]];
            } else if (inputObj[inputKeys[j]][1] == '*') {
                inputObj[inputKeys[j]] = [inputObj[inputKeys[j]][0] * inputObj[inputKeys[j]][2]];
            } else {
                inputObj[inputKeys[j]] = [inputObj[inputKeys[j]][0] / inputObj[inputKeys[j]][2]];
            }
        }
    }
}

console.log("inputObj['root'][0]:", inputObj['root'][0]);
