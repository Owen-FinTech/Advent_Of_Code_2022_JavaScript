let inputString = ``; // Insert your puzzle input between the backticks

let input = inputString.split('\n');

for (let i = 0; i < input.length; i++) {
    input[i] = input[i].split('');
}

function extend(input) {
    let lCount = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i][0] == '#') {
            lCount += 1;
        }
    }
    let arr1 = ['.'];
    if (lCount > 0) {
        for (let i = 0; i < input.length; i++) {
            input[i] = arr1.concat(input[i]);
        }
    }
    let rCount = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i][input[i].length - 1] == '#') {
            rCount += 1;
        }
    }
    if (rCount > 0) {
        for (let i = 0; i < input.length; i++) {
            input[i].push('.')
        }
    }
    let topCount = 0;
    for (let i = 0; i < input[0].length; i++) {
        if (input[0][i] == '#') {
            topCount += 1;
        }
    }
    if (topCount > 0) {
        let arr2 = [];
        for (let i = 0; i < input[0].length; i++) {
            arr2.push('.');
        }
        arr2 = [arr2];
        input = arr2.concat(input);
    }
    let bottomCount = 0;
    for (let i = 0; i < input[input.length - 1].length; i++) {
        if (input[input.length - 1][i] == '#') {
            bottomCount += 1;
        }
    }
    if (bottomCount > 0) {
        let arr3 = [];
        for (let i = 0; i < input[input.length - 1].length; i++) {
            arr3.push('.');
        }
        arr3 = [arr3];
        input = input.concat(arr3);
    }
    return input;
}

let round = 0;
while (round < 10) {
    input = extend(input);
    let proposed = [];
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[0].length; j++) {
            if (input[i][j] == '#') {
                if (input[i - 1][j] != '#' && input[i - 1][j - 1] != '#' && input[i - 1][j + 1] != '#' && 
                input[i + 1][j] != '#' && input[i + 1][j - 1] != '#' && input[i + 1][j + 1] != '#' && 
                input[i][j - 1] != '#' && input[i][j + 1] != '#') {
                    continue;
                } else {
                    if (round % 4 == 0) {
                        if (input[i - 1][j] != '#' && input[i - 1][j - 1] != '#' && input[i - 1][j + 1] != '#') {
                            proposed.push([i, j, i - 1, j, true]);
                        } else if (input[i + 1][j] != '#' && input[i + 1][j - 1] != '#' && input[i + 1][j + 1] != '#') {
                            proposed.push([i, j, i + 1, j, true]);
                        } else if (input[i][j - 1] != '#' && input[i + 1][j - 1] != '#' && input[i - 1][j - 1] != '#') {
                            proposed.push([i, j, i, j - 1, true]);
                        } else if (input[i][j + 1] != '#' && input[i + 1][j + 1] != '#' && input[i - 1][j + 1] != '#') {
                            proposed.push([i, j, i, j + 1, true]);
                        }
                    } else if (round % 4 == 1) {
                        if (input[i + 1][j] != '#' && input[i + 1][j - 1] != '#' && input[i + 1][j + 1] != '#') {
                            proposed.push([i, j, i + 1, j, true]);
                        } else if (input[i][j - 1] != '#' && input[i + 1][j - 1] != '#' && input[i - 1][j - 1] != '#') {
                            proposed.push([i, j, i, j - 1, true]);
                        } else if (input[i][j + 1] != '#' && input[i + 1][j + 1] != '#' && input[i - 1][j + 1] != '#') {
                            proposed.push([i, j, i, j + 1, true]);
                        } else if (input[i - 1][j] != '#' && input[i - 1][j - 1] != '#' && input[i - 1][j + 1] != '#') {
                            proposed.push([i, j, i - 1, j, true]);
                        }
                    } else if (round % 4 == 2) {
                        if (input[i][j - 1] != '#' && input[i + 1][j - 1] != '#' && input[i - 1][j - 1] != '#') {
                            proposed.push([i, j, i, j - 1, true]);
                        } else if (input[i][j + 1] != '#' && input[i + 1][j + 1] != '#' && input[i - 1][j + 1] != '#') {
                            proposed.push([i, j, i, j + 1, true]);
                        } else if (input[i - 1][j] != '#' && input[i - 1][j - 1] != '#' && input[i - 1][j + 1] != '#') {
                            proposed.push([i, j, i - 1, j, true]);
                        } else if (input[i + 1][j] != '#' && input[i + 1][j - 1] != '#' && input[i + 1][j + 1] != '#') {
                            proposed.push([i, j, i + 1, j, true]);
                        }
                    } else if (round % 4 == 3) {
                        if (input[i][j + 1] != '#' && input[i + 1][j + 1] != '#' && input[i - 1][j + 1] != '#') {
                            proposed.push([i, j, i, j + 1, true]);
                        } else if (input[i - 1][j] != '#' && input[i - 1][j - 1] != '#' && input[i - 1][j + 1] != '#') {
                            proposed.push([i, j, i - 1, j, true]);
                        } else if (input[i + 1][j] != '#' && input[i + 1][j - 1] != '#' && input[i + 1][j + 1] != '#') {
                            proposed.push([i, j, i + 1, j, true]);
                        } else if (input[i][j - 1] != '#' && input[i + 1][j - 1] != '#' && input[i - 1][j - 1] != '#') {
                            proposed.push([i, j, i, j - 1, true]);
                        }
                    }
                }
            }
        }
    }
    for (let i = 0; i < proposed.length; i++) {
        for (let j = 0; j < proposed.length; j++) {
            if (proposed[i][2] == proposed[j][2] && proposed[i][3] == proposed[j][3] && i != j) {
                proposed[i][4] = false;
                proposed[j][4] = false;
            }
        }
    }
    for (let i = 0; i < proposed.length; i++) {
        if (proposed[i][4] == true) {
            input[proposed[i][0]][proposed[i][1]] = '.';
            input[proposed[i][2]][proposed[i][3]] = '#';
        }
    }
    round += 1;
}

let topSquare = 0;
let bottomSquare = input.length - 1;
let lSquare = 0;
let rSquare = input[0].length - 1;

let topSquareCount = 0;

while (topSquareCount == 0) {
    for (let i = 0; i < input[0].length; i++) {
        if (input[topSquare][i] == '#') {
            topSquareCount += 1;
            break;
        }
    }
    if (topSquareCount > 0) break;
    topSquare += 1;
}

let bottomSquareCount = 0;

while (bottomSquareCount == 0) {
    for (let i = 0; i < input[0].length; i++) {
        if (input[bottomSquare][i] == '#') {
            bottomSquareCount += 1;
            break;
        }
    }
    if (bottomSquareCount > 0) break;
    bottomSquare -= 1;
}

let lSquareCount = 0; 

while (lSquareCount == 0) {
    for (let i = 0; i < input.length; i++) {
        if (input[i][lSquare] == '#') {
            lSquareCount += 1;
            break;
        }
    }
    if (lSquareCount > 0) break;
    lSquare += 1;
}

let rSquareCount = 0; 

while (rSquareCount == 0) {
    for (let i = 0; i < input.length; i++) {
        if (input[i][rSquare] == '#') {
            rSquareCount += 1;
            break;
        }
    }
    if (rSquareCount > 0) break;
    rSquare -= 1;
}

let result = 0;

for (let i = topSquare; i <= bottomSquare; i++) {
    for (let j = lSquare; j <= rSquare; j++) {
        if (input[i][j] == '.') {
            result += 1;
        }
    }
}

console.log("result:", result);
