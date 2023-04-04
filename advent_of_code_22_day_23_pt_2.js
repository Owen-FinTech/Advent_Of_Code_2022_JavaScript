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
let finish = false;

while (finish == false) {
    input = extend(input);
    let proposed = [];
    let noMove = 0;
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[0].length; j++) {
            if (input[i][j] == '#') {
                if (input[i - 1][j] != '#' && input[i - 1][j - 1] != '#' && input[i - 1][j + 1] != '#' && 
                input[i + 1][j] != '#' && input[i + 1][j - 1] != '#' && input[i + 1][j + 1] != '#' && 
                input[i][j - 1] != '#' && input[i][j + 1] != '#') {
                    
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
    if (proposed.length == 0) {
        noMove += 1; 
    } else {
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
    }
    round += 1;
    if (noMove != 0) {
        finish = true;
        break;
    }
}

console.log("round:", round);
