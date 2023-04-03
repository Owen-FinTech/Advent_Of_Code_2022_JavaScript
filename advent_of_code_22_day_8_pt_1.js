let inputString = ``; // Insert your puzzle input between the backticks

let trees = inputString.split('\n');

for (let i = 0; i < trees.length; i++) {
    trees[i] = trees[i].split("");
}

for (let i = 0; i < trees.length; i++) {
    for (let j = 0; j < trees[0].length; j++) {
        trees[i][j] = Number(trees[i][j]);
    }
}

let treesCopy = JSON.parse(JSON.stringify(trees));

for (let i = 0; i < treesCopy[0].length; i++) {
    treesCopy[0][i] = 'v';
}

for (let i = 0; i < treesCopy[treesCopy.length - 1].length; i++) {
    treesCopy[treesCopy.length - 1][i] = 'v';
}

for (let i = 0; i < treesCopy.length; i++) {
    treesCopy[i][0] = 'v';
    treesCopy[i][treesCopy[i].length - 1] = 'v';
}

let east = 0;
let west = 0;
let north = 0;
let south = 0;

for (let i = 1; i < (trees.length - 1); i++) {
    for (let j = 1; j < (trees[0].length - 1); j++) {
        east = 0;
        west = 0;
        north = 0;
        south = 0;
        // north
        for (let k = 0; k < i; k++) {
            if (trees[k][j] >= trees[i][j]) {
                north += 1;
            }
        }
        // south
        for (let l = i + 1; l < trees.length; l++) {
            if (trees[l][j] >= trees[i][j]) {
                south += 1;
            }
        }
        // west
        for (let m = 0; m < j; m++) {
            if (trees[i][m] >= trees[i][j]) {
                west += 1;
            }
        }
        // east
        for (let n = j + 1; n < trees[0].length; n++) {
            if (trees[i][n] >= trees[i][j]) {
                east += 1;
            }
        }
        if ((north == 0) || (south == 0) || (east == 0) || (west == 0)) {
            treesCopy[i][j] = 'v';
        } else {
            treesCopy[i][j] = 'i';
        }

    }
}

let totalVis = 0;

for (let i = 0; i < treesCopy.length; i++) {
    for (let j = 0; j < treesCopy[0].length; j++) {
        if (treesCopy[i][j] == 'v') {
            totalVis += 1;
        }
    }
}

console.log("totalVis:", totalVis);
