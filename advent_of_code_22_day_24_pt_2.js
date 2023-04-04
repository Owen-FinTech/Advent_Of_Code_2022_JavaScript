let inputString = ``; // Insert your puzzle input between the backticks

let input = inputString.split('\n');

for (let i = 0; i < input.length; i++) {
    input[i] = input[i].split('');
    for (let j = 0; j < input[i].length; j++) {
        input[i][j] = [input[i][j]];
    }
}

let pos = [[0, 1]];
let fin = [input.length - 1, input[0].length - 2];
let finish = false;
let min = 0;
journey = 1;

while (finish == false) {
    let newState = [];
    for (let i = 0; i < input.length; i++) {
        newState.push([]);
    }
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[0].length; j++) {
            newState[i].push([]);
        }
    }
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[0].length; j++) {
            for (let k = 0; k < input[i][j].length; k++) {
                if (input[i][j][k] == '#') {
                    newState[i][j][k] = '#';
                } else if (input[i][j][k] == '^') {
                    if (input[i - 1][j][0] == '#') {
                        newState[newState.length - 2][j].push('^');
                    } else {
                        newState[i - 1][j].push('^');
                    }
                } else if (input[i][j][k] == 'v') {
                    if (input[i + 1][j][0] == '#') {
                        newState[1][j].push('v');
                    } else {
                        newState[i + 1][j].push('v');
                    }
                } else if (input[i][j][k] == '>') {
                    if (input[i][j + 1][0] == '#') {
                        newState[i][1].push('>');
                    } else {
                        newState[i][j + 1].push('>');
                    }
                } else if (input[i][j][k] == '<') {
                    if (input[i][j - 1][0] == '#') {
                        newState[i][newState[0].length - 2].push('<');
                    } else {
                        newState[i][j - 1].push('<');
                    }
                }
            }
        }
    }
    for (let i = 0; i < newState.length; i++) {
        for (let j = 0; j < newState[0].length; j++) {
            if (newState[i][j].length == 0) {
                newState[i][j].push('.');
            }
        }
    }
    let tempPos = [];
    for (let i = 0; i < pos.length; i++) {
        if (newState[pos[i][0]][pos[i][1]][0] == '.') {
            tempPos.push([pos[i][0], pos[i][1]]);
        }
        if ((pos[i][0] - 1) >= 0) {
            if (newState[pos[i][0] - 1][pos[i][1]][0] == '.') {
                tempPos.push([pos[i][0] - 1, pos[i][1]]);
            }
        }
        if ((pos[i][0] + 1) < input.length) {
            if (newState[pos[i][0] + 1][pos[i][1]][0] == '.') {
                tempPos.push([pos[i][0] + 1, pos[i][1]]);
            }
        }
        if (newState[pos[i][0]][pos[i][1] - 1][0] == '.') {
            tempPos.push([pos[i][0], pos[i][1] - 1]);
        }
        if (newState[pos[i][0]][pos[i][1] + 1][0] == '.') {
            tempPos.push([pos[i][0], pos[i][1] + 1]);
        }
    }
    let deleteList = [];
    for (let i = 0; i < tempPos.length; i++) {
        for (let j = i; j < tempPos.length; j++) {
            if (tempPos[i][0] == tempPos[j][0] && tempPos[i][1] == tempPos[j][1] && i != j) {
                deleteList.push(i);
                break;
            }
        }
    }

    for (let i = deleteList.length - 1; i >= 0; i--) {
        tempPos.splice(deleteList[i], 1);
    }
    pos = tempPos.slice();
    input = newState.slice();
    min += 1;
    for (let i = 0; i < pos.length; i++) {
        if (journey == 1) {
            if (pos[i][0] == fin[0] && pos[i][1] == fin[1]) {
                pos = [[input.length - 1, input[0].length - 2]];
                fin = [0, 1];
                journey = 2;
                break;
            }
        } else if (journey == 2) {
            if (pos[i][0] == fin[0] && pos[i][1] == fin[1]) {
                pos = [[0, 1]];
                fin = [input.length - 1, input[0].length - 2];
                journey = 3;
                break;
            }
        } else {
            if (pos[i][0] == fin[0] && pos[i][1] == fin[1]) {
                finish = true;
                break;
            }
        }
    }
    if (finish == true) break;
}

console.log("min:", min);