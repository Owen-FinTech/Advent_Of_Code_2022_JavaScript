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

let rowRanges = [];
let candidate = -1;
let frequency = -1;

function compare(a, b) {
    if (a[0] > b[0]) {
        return 1
    } else if (a[0] < b[0]) {
        return -1
    } else {
        return 0
    }
}

while (frequency < 0) {
    for (let k = 0; k < 4000001; k++) {
        rowRanges = [];
        for (let i = 0; i < pos.length; i++) {
            if (k >= (pos[i][1] - manhat[i]) && k <= (pos[i][1] + manhat[i])) {
                rowRanges.push([(pos[i][0] - (manhat[i] - Math.abs(k - pos[i][1]))), (pos[i][0] + (manhat[i] - Math.abs(k - pos[i][1])))]);
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

        rowRanges = rowRanges.sort((a, b) => compare(a, b));

        let removalIndicies = [];

        for (let i = 1; i < rowRanges.length; i++) {
            if (rowRanges[i][0] <= rowRanges[i - 1][1]) {
                removalIndicies.push(i);
            }
        }

        removalIndicies.reverse();

        for (let i = 0; i < removalIndicies.length; i++) {
            rowRanges.splice(removalIndicies[i], 1);
        }

        for (let i = 1; i < rowRanges.length; i++) {
            if (rowRanges[i][0] - rowRanges[i - 1][1] >= 2) {
                candidate = rowRanges[i][0] - 1;
            }
            if (candidate >= 0 && candidate <= 4000000) {
                frequency = (candidate * 4000000) + k;
                if (frequency > 0) break;   
            }
            if (frequency > 0) break;
        }
        if (frequency > 0) break;
    }
    if (frequency > 0) break;
}

console.log("frequency:", frequency);