let inputString = ``; // Insert your puzzle input between the backticks

let input = inputString.split('\n');

for (let i = 0; i < input.length; i++) {
    input[i] = input[i].split(' ');
}

let inputObj = {};

for (let i = 0; i < input.length; i++) {
    input[i][0] = input[i][0].slice(0, 4);
    inputObj[input[i][0]] = input[i].slice(1);
    if (inputObj[input[i][0]].length == 1 && input[i][0] != 'humn') {
        inputObj[input[i][0]][0] = BigInt(inputObj[input[i][0]][0]);
    } else if (inputObj[input[i][0]].length == 1 && input[i][0] == 'humn') {
        inputObj[input[i][0]][0] = 'humn';
    }
}

inputObj['root'][1] = '=';

let inputKeys = Object.keys(inputObj);

function equality(num, aString) {
    if (inputObj[aString].length == 3) {
        if (inputObj[aString][1] == '+' && typeof inputObj[aString][0] == 'bigint' && typeof inputObj[aString][2] != 'bigint' ) {
            if (inputObj[inputObj[aString][2]].length == 3) {
                let newNum = num - inputObj[aString][0];
                equality(newNum, inputObj[aString][2]);
            } else if (inputObj[inputObj[aString][2]][0] == 'humn') {
                inputObj[inputObj[aString][2]][0] = num - inputObj[aString][0];
                inputObj[aString][2] = num - inputObj[aString][0];  
            }
        } else if (inputObj[aString][1] == '+' && typeof inputObj[aString][0] != 'bigint' && typeof inputObj[aString][2] == 'bigint' ) {
            if (inputObj[inputObj[aString][0]].length == 3) {
                let newNum = num - inputObj[aString][2];
                equality(newNum, inputObj[aString][0]);
            } else if (inputObj[inputObj[aString][0]][0] == 'humn') {
                inputObj[inputObj[aString][0]][0] = num - inputObj[aString][2];
                inputObj[aString][0] = num - inputObj[aString][2];
            }
        } else if (inputObj[aString][1] == '-' && typeof inputObj[aString][0] == 'bigint' && typeof inputObj[aString][2] != 'bigint' ) {
            if (inputObj[inputObj[aString][2]].length == 3) {
                let newNum = inputObj[aString][0] - num;
                equality(newNum, inputObj[aString][2]);
            } else if (inputObj[inputObj[aString][2]][0] == 'humn') {
                inputObj[inputObj[aString][2]][0] = inputObj[aString][0] - num;
                inputObj[aString][2] = inputObj[aString][0] - num;
            }
        } else if (inputObj[aString][1] == '-' && typeof inputObj[aString][0] != 'bigint' && typeof inputObj[aString][2] == 'bigint' ) {
            if (inputObj[inputObj[aString][0]].length == 3) {
                let newNum = num + inputObj[aString][2];
                equality(newNum, inputObj[aString][0]);
            } else if (inputObj[inputObj[aString][0]][0] == 'humn') {
                inputObj[inputObj[aString][0]][0] = num + inputObj[aString][2]; 
                inputObj[aString][0] = num + inputObj[aString][2];
            }
        } else if (inputObj[aString][1] == '*' && typeof inputObj[aString][0] == 'bigint' && typeof inputObj[aString][2] != 'bigint' ) {
            if (inputObj[inputObj[aString][2]].length == 3) {
                let newNum = num / inputObj[aString][0];
                equality(newNum, inputObj[aString][2]);
            } else if (inputObj[inputObj[aString][2]][0] == 'humn') {
                inputObj[inputObj[aString][2]][0] = num / inputObj[aString][0];
                inputObj[aString][2] = num / inputObj[aString][0];
            }
        } else if (inputObj[aString][1] == '*' && typeof inputObj[aString][0] != 'bigint' && typeof inputObj[aString][2] == 'bigint' ) {
            if (inputObj[inputObj[aString][0]].length == 3) {
                let newNum = num / inputObj[aString][2];
                equality(newNum, inputObj[aString][0]);
            } else if (inputObj[inputObj[aString][0]][0] == 'humn') {
                inputObj[inputObj[aString][0]][0] = num / inputObj[aString][2];
                inputObj[aString][0] = num / inputObj[aString][2];
            }
        } else if (inputObj[aString][1] == '/' && typeof inputObj[aString][0] == 'bigint' && typeof inputObj[aString][2] != 'bigint' ) {
            if (inputObj[inputObj[aString][2]].length == 3) {
                let newNum = inputObj[aString][0] / num;
                equality(newNum, inputObj[aString][2]);
            } else if (inputObj[inputObj[aString][2]][0] == 'humn') {
                inputObj[inputObj[aString][2]][0] = inputObj[aString][0] / num;
                inputObj[aString][2] = inputObj[aString][0] / num;
            }
        } else if (inputObj[aString][1] == '/' && typeof inputObj[aString][0] != 'bigint' && typeof inputObj[aString][2] == 'bigint' ) {
            if (inputObj[inputObj[aString][0]].length == 3) {
                let newNum = num * inputObj[aString][2];
                equality(newNum, inputObj[aString][0]);
            } else if (inputObj[inputObj[aString][0]][0] == 'humn') {
                inputObj[inputObj[aString][0]][0] = num * inputObj[aString][2];
                inputObj[aString][0] = num * inputObj[aString][2];
            }
        }
    } else if (inputObj[aString] == 'humn') {
        inputObj[aString] = [num];
    }
}

while (typeof inputObj['humn'][0] == 'string') {
    for (let i = 0; i < inputKeys.length; i++) {
        if (inputObj[inputKeys[i]].length == 3) {
            if (typeof inputObj[inputKeys[i]][0] == 'string') {
                if (inputObj[inputObj[inputKeys[i]][0]].length == 1 && inputObj[inputObj[inputKeys[i]][0]][0] != 'humn') {
                    inputObj[inputKeys[i]][0] = inputObj[inputObj[inputKeys[i]][0]][0];
                }
            }
            if (typeof inputObj[inputKeys[i]][2] == 'string') {
                if (inputObj[inputObj[inputKeys[i]][2]].length == 1 && inputObj[inputObj[inputKeys[i]][2]][0] != 'humn') {
                    inputObj[inputKeys[i]][2] = inputObj[inputObj[inputKeys[i]][2]][0];
                }
            }
        }
    }
    for (let j = 0; j < inputKeys.length; j++) {
        if (inputObj[inputKeys[j]].length == 3 && typeof inputObj[inputKeys[j]][0] == 'bigint' && typeof inputObj[inputKeys[j]][2] == 'bigint') {
            if (inputObj[inputKeys[j]][1] == '+') {
                inputObj[inputKeys[j]] = [inputObj[inputKeys[j]][0] + inputObj[inputKeys[j]][2]];
            } else if (inputObj[inputKeys[j]][1] == '-') {
                inputObj[inputKeys[j]] = [inputObj[inputKeys[j]][0] - inputObj[inputKeys[j]][2]];
            } else if (inputObj[inputKeys[j]][1] == '*') {
                inputObj[inputKeys[j]] = [inputObj[inputKeys[j]][0] * inputObj[inputKeys[j]][2]];
            } else if (inputObj[inputKeys[j]][1] == '/') {
                inputObj[inputKeys[j]] = [inputObj[inputKeys[j]][0] / inputObj[inputKeys[j]][2]];
            }
        }
    }
    let count = 0;
    for (let k = 0; k < inputKeys.length; k++) {
        if (inputObj[inputKeys[k]].length == 3 && count == 0) {
            if (inputObj[inputKeys[k]][1] == '=') {
                if (typeof inputObj[inputKeys[k]][0] == 'bigint' && typeof inputObj[inputKeys[k]][2] != 'bigint') {
                    equality(inputObj[inputKeys[k]][0], inputObj[inputKeys[k]][2]);
                    count += 1;
                } else if (typeof inputObj[inputKeys[k]][0] != 'bigint' && typeof inputObj[inputKeys[k]][2] == 'bigint') {
                    equality(inputObj[inputKeys[k]][2], inputObj[inputKeys[k]][0]);
                    count += 1;
                }
            }
        }
    }
}

console.log("inputObj['humn'][0]:", inputObj['humn'][0]);
