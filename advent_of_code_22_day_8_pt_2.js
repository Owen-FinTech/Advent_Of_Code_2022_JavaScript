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

let east = 0;
let nonEast = 0;
let west = 0;
let nonWest = 0;
let north = 0;
let nonNorth = 0;
let south = 0;
let nonSouth = 0;

for (let i = 0; i < trees.length; i++) {
    for (let j = 0; j < trees[0].length; j++) {
        east = 0;
        nonEast = 0;
        west = 0;
        nonWest = 0;
        north = 0;
        nonNorth = 0;
        south = 0;
        nonSouth = 0;
        // north
        for (let k = i - 1; k >= 0; k--) {
            if ((trees[k][j] < trees[i][j]) && nonNorth == 0) {
                north += 1;
            } else if ((trees[k][j] >= trees[i][j]) && nonNorth == 0) {
                north += 1
                nonNorth += 1;
            } else {
                nonNorth += 1;
            }
        }
        // south
        for (let l = i + 1; l < trees.length; l++) {
            if ((trees[l][j] < trees[i][j]) && nonSouth == 0) {
                south += 1;
            } else if ((trees[l][j] >= trees[i][j]) && nonSouth == 0) {
                south += 1;
                nonSouth += 1;
            } else {
                nonSouth += 1;
            }
        }
        // west
        for (let m = j - 1; m >= 0; m--) {
            if ((trees[i][m] < trees[i][j]) && nonWest == 0) {
                west += 1;
            } else if ((trees[i][m] >= trees[i][j]) && nonWest == 0) {
                west += 1;
                nonWest += 1;
            } else {
                nonWest += 1;
            }
        }
        // east
        for (let n = j + 1; n < trees[0].length; n++) {
            if ((trees[i][n] < trees[i][j]) && nonEast == 0) {
                east += 1;
            } else if ((trees[i][n] >= trees[i][j]) && nonEast == 0) {
                east += 1;
                nonEast += 1;
            } else {
                nonEast += 1;
            }
        }
        treesCopy[i][j] = east * west * north * south;
    }

}

let maxVis = 0;

for (let i = 0; i < treesCopy.length; i++) {
    for (let j = 0; j < treesCopy[0].length; j++) {
        if (treesCopy[i][j] > maxVis) {
            maxVis = treesCopy[i][j];
        }
    }
}

console.log("maxVis:", maxVis);