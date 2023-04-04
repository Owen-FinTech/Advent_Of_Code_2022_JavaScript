let inputString = ``; // Insert your puzzle input between the backticks

let input = inputString.split('\n');

for (let i = 0; i < input.length; i++) {
    input[i] = input[i].split(' -> ');
}

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        input[i][j] = input[i][j].split(',');
        for (let k = 0; k < input[i][j].length; k++) {
            input[i][j][k] = JSON.parse(input[i][j][k]);
        }
    }
}

let cave = [];
let xList = [];
let yList = [];

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        xList.push(input[i][j][0]);
        yList.push(input[i][j][1]);
    }
} 

let yListMax = Math.max(...yList);
let xListMax = Math.max(...xList);
let xListMin = Math.min(...xList);


for (let i = 0; i < (yListMax + 3); i++) {
    cave.push([]);
}

for (let i = 0; i < cave.length; i++) {
    if (i == cave.length - 1) {
        for (let j = 0; j < 1000; j++) {
            cave[i].push('#');
        } 
    } else {
        for (let j = 0; j < 1000; j++) {
            cave[i].push('.');
        } 
    }
}

for (let i = 0; i < input.length; i++) {
    for (let j = 1; j < input[i].length; j++) {
        if ((input[i][j][1] - input[i][j - 1][1]) > 0) {
            for (k = input[i][j - 1][1]; k < (input[i][j][1] + 1); k++) {
                cave[k][input[i][j][0]] = '#';
            }
        }
        if ((input[i][j][1] - input[i][j - 1][1]) < 0) {
            for (k = input[i][j - 1][1]; k > (input[i][j][1] - 1); k--) {
                cave[k][input[i][j][0]] = '#';
            }
        }
        if ((input[i][j][0] - input[i][j - 1][0]) > 0) {
            for (k = input[i][j - 1][0]; k < (input[i][j][0] + 1); k++) {
                cave[input[i][j][1]][k] = '#';
            }
        }
        if ((input[i][j][0] - input[i][j - 1][0]) < 0) {
            for (k = input[i][j - 1][0]; k > (input[i][j][0] - 1); k--) {
                cave[input[i][j][1]][k] = '#';
            }
        }
    }
}

let sandPosRow = 0;
let sandPosCol = 500;
let count = 0;

while (cave[0][500] != 'o') {
    if (cave[sandPosRow + 1][sandPosCol] == '.') {
        sandPosRow += 1;
    } else {
        if (cave[sandPosRow + 1][sandPosCol - 1] == '.') {
            sandPosRow += 1;
            sandPosCol -= 1;
        } else if (cave[sandPosRow + 1][sandPosCol + 1] == '.') {
            sandPosRow += 1;
            sandPosCol += 1;
        } else {
            count += 1;
            cave[sandPosRow][sandPosCol] = 'o';
            sandPosRow = 0;
            sandPosCol = 500;
        }
    }
}

console.log("count:", count);