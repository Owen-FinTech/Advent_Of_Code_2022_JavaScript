let inputString = ``; // Insert your puzzle input between the backticks

let input = inputString.split('\n');

for (let i = 0; i < input.length; i++) {
    input[i] = input[i].split(' '); 
}

let pos = [];

for (let i = 0; i < input.length; i++) {
    pos.push([]);
}

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        if (input[i][j].slice(0, 2) == 'x=' || input[i][j].slice(0, 2) == 'y=') {
        pos[i].push(input[i][j].slice(2));
        }
    }
}

for (let i = 0; i < pos.length; i++) {
    for (let j = 0; j < pos[i].length; j++) {
        pos[i][j] = pos[i][j].replace(',', '');
        pos[i][j] = pos[i][j].replace(':', '');
        pos[i][j] = Number(pos[i][j]);
    }
}

let manhat = [];

for (let i = 0; i < pos.length; i++) {
    manhat.push(Math.abs(pos[i][0] - pos[i][2]) + Math.abs(pos[i][1] - pos[i][3]));
}

let row = 2000000;
let rowRanges = [];

for (let i = 0; i < pos.length; i++) {
    if (row >= (pos[i][1] - manhat[i]) && row <= (pos[i][1] + manhat[i])) {
        rowRanges.push([(pos[i][0] - (manhat[i] - Math.abs(row - pos[i][1]))), (pos[i][0] + (manhat[i] - Math.abs(row - pos[i][1])))]);
    } 
}

for (let i = 0; i < rowRanges.length; i++) {
    for (let j = 0; j < rowRanges.length; j++) {
        if (i != j) {
            if (rowRanges[i][0] <= rowRanges[j][0] && rowRanges[i][1] >= rowRanges[j][1]) {
                rowRanges[j][0] = 0;
                rowRanges[j][1] = 0;
            } else if (rowRanges[i][1] <= rowRanges[j][1] && rowRanges[i][0] >= rowRanges[j][0]) {
                rowRanges[i][0] = 0;
                rowRanges[i][1] = 0;
            } else if (rowRanges[i][1] <= rowRanges[j][1] && rowRanges[i][1] >= rowRanges[j][0]) {
                rowRanges[j][0] = rowRanges[i][1] + 1;
            } else if (rowRanges[i][0] <= rowRanges[j][1] && rowRanges[i][0] >= rowRanges[j][0]) {
                rowRanges[j][1] = rowRanges[i][0] - 1;
            }
        }
    } 
}

let result = 0;

for (let i = 0; i < rowRanges.length; i++) {
    if (Math.abs(rowRanges[i][1] - rowRanges[i][0]) > 0) {
        result += Math.abs(rowRanges[i][1] - rowRanges[i][0]) + 1;
    }
}

let rowBeacons = [];

for (let i = 0; i < pos.length; i++) {
    if (pos[i][3] == row) {
        for (let j = 0; j < rowRanges.length; j++) {
            if (pos[i][2] >= rowRanges[j][0] && pos[i][2] <= rowRanges[j][1]) {    
                rowBeacons.push(pos[i][2]);
            }
        }
    }
}

let beaconsSet = new Set(rowBeacons);

result -= beaconsSet.size;

console.log("result:", result);