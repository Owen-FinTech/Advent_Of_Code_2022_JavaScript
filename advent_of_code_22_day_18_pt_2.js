let inputString = ``; // Insert your puzzle input between the backticks

let input = inputString.split('\n');

for (let i = 0; i < input.length; i++) {
    input[i] = input[i].split(',');
    for (let j = 0; j < input[i].length; j++) {
        input[i][j] = Number(input[i][j]);
    }
}

function surf(points) {
    let sideCount = [];

    for (let i = 0; i < points.length; i++) {
        sideCount.push(6);
    }

    for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points.length; j++) {
            let sameCount = 0;
            let offOneCount = 0;
            for (let k = 0; k < points[0].length; k++) {
                if (points[i][k] == points[j][k]) {
                    sameCount += 1;
                } else if (Math.abs(points[i][k] - points[j][k]) == 1) {
                    offOneCount += 1;
                }
            }
            if (sameCount == 2 && offOneCount == 1) {
                sideCount[i] -= 1;
            }
        }
    }

    let surface = 0;

    for (let i = 0; i < sideCount.length; i++) {
        surface += sideCount[i];
    }
    return surface
}

let xValues = [];
let yValues = [];
let zValues = [];

for (let i = 0; i < input.length; i++) {
    xValues.push(input[i][0]); 
    yValues.push(input[i][1]);
    zValues.push(input[i][2]);
}

let xMax = Math.max(...xValues);
let xMin = Math.min(...xValues);
let yMax = Math.max(...yValues);
let yMin = Math.min(...yValues);
let zMax = Math.max(...zValues);
let zMin = Math.min(...zValues);

let possiX = [];
let possiY = [];
let possiZ = [];

for (let i = xMin - 1; i < xMax + 2; i++) {
    possiX.push(i);
}

for (let i = yMin - 1; i < yMax + 2; i++) {
    possiY.push(i);
}

for (let i = zMin - 1; i < zMax + 2; i++) {
    possiZ.push(i);
}

let possiBub = [];

for (let i = 0; i < possiX.length; i++) {
    for (let j = 0; j < possiY.length; j++) {
        for (let k = 0; k < possiZ.length; k++) {
            possiBub.push([possiX[i], possiY[j], possiZ[k]])
        }
    }
}

let deleteList = [];

for (let i = possiBub.length - 1; i >= 0; i--) {
    for (let j = 0; j < input.length; j++) {
        if (possiBub[i][0] == input[j][0] & possiBub[i][1] == input[j][1] && possiBub[i][2] == input[j][2]) {
            deleteList.push(i);
        }
    }
}

for (let i = 0; i < deleteList.length; i++) {
    possiBub.splice(deleteList[i], 1);
}

deleteList = [];

let floodFill = [possiBub[0].slice()];

let noFlood = false;

let unCount = 0;

while (noFlood == false) {
    let pushes = 0;
    let tempFlood = []
    for (let i = unCount; i < floodFill.length; i++) {
        for (let j = 0; j < possiBub.length; j++) {
            if (Math.abs(floodFill[i][0] - possiBub[j][0]) == 1 && floodFill[i][1] == possiBub[j][1] && floodFill[i][2] == possiBub[j][2]) {
                tempFlood.push(possiBub[j]);
            }
            if (floodFill[i][0] == possiBub[j][0] && Math.abs(floodFill[i][1] - possiBub[j][1]) == 1 && floodFill[i][2] == possiBub[j][2]) {
                tempFlood.push(possiBub[j]);
            }
            if (floodFill[i][0] == possiBub[j][0] && floodFill[i][1] == possiBub[j][1] && Math.abs(floodFill[i][2] - possiBub[j][2]) == 1) {
                tempFlood.push(possiBub[j]);
            }
        }
        let tempDelete = [];
        for (let k = tempFlood.length - 1; k >= 0; k--) {
            for (let l = 0; l < floodFill.length; l++) {
                if (tempFlood[k][0] == floodFill[l][0] && tempFlood[k][1] == floodFill[l][1] && tempFlood[k][2] == floodFill[l][2]) {
                    tempDelete.push(k);
                }
            }
        }
        for (let m = 0; m < tempDelete.length; m++) {
            tempFlood.splice(tempDelete[m], 1);
        }
        for (let n = 0; n < tempFlood.length; n++) {
            floodFill.push(tempFlood[n]);
            pushes += 1;
        }
    }
    unCount = floodFill.length - pushes;
    if (pushes == 0) {
        noFlood = true;
        break;
    }
}

for (let i = possiBub.length - 1; i >= 0; i--) {
    for (let j = 0; j < floodFill.length; j++) {
        if (possiBub[i][0] == floodFill[j][0] & possiBub[i][1] == floodFill[j][1] && possiBub[i][2] == floodFill[j][2]) {
            deleteList.push(i);
        }
    }
}

for (let i = 0; i < deleteList.length; i++) {
    possiBub.splice(deleteList[i], 1);
}

console.log("Result:", surf(input) - surf(possiBub));