const inputString = ``; // Insert your puzzle input between the backticks

const input = inputString.split("");

let chamber = [];
chamber.push([2, 2, 2, 2, 2, 2, 2, 2, 2]);

const gap = [[2, 0, 0, 0, 0, 0, 0, 0, 2]];

const rock1 = [[2, 0, 0, 1, 1, 1, 1, 0, 2]];

const rock2 = [[2, 0, 0, 0, 1, 0, 0, 0, 2], [2, 0, 0, 1, 1, 1, 0, 0, 2], [2, 0, 0, 0, 1, 0, 0, 0, 2]];

const rock3 = [[2, 0, 0, 1, 1, 1, 0, 0, 2], [2, 0, 0, 0, 0, 1, 0, 0, 2], [2, 0, 0, 0, 0, 1, 0, 0, 2]];

const rock4 = [[2, 0, 0, 1, 0, 0, 0, 0, 2], [2, 0, 0, 1, 0, 0, 0, 0, 2], [2, 0, 0, 1, 0, 0, 0, 0, 2], [2, 0, 0, 1, 0, 0, 0, 0, 2]];

const rock5 = [[2, 0, 0, 1, 1, 0, 0, 0, 2], [2, 0, 0, 1, 1, 0, 0, 0, 2]]

const rocks = [rock1, rock2, rock3, rock4, rock5];

let rockCount = 0;
let fallBlock = 1;
let units = 0;
let loopCount = 0;
let unitDiff = [];

while (rockCount < 5022) {
    let count = 0;
    for (let i = 0; i < chamber.length; i++) {
        for (let j = 0; j < chamber[0].length; j++) {
            if (chamber[i][j] == 1) {
                count += 1;
            }
        }
    }

    if (count == 0) {
        fallBlock = 1;
    }
    if (fallBlock > 0) {
        chamber.push([2, 0, 0, 0, 0, 0, 0, 0, 2]);
        chamber.push([2, 0, 0, 0, 0, 0, 0, 0, 2]);
        chamber.push([2, 0, 0, 0, 0, 0, 0, 0, 2]);

        let modulusCount = rockCount % 5;
        let currentRock = rocks[modulusCount];

        for (let i = 0; i < currentRock.length; i++) {
            chamber.push(JSON.parse(JSON.stringify(currentRock[i].slice()))); 
        }

        chamber.push([2, 0, 0, 0, 0, 0, 0, 0, 2]);
    }

    let leftBlock = 0;
    let rightBlock = 0;

    if (input[loopCount % input.length] == '<') {
        for (let i = 0; i < (chamber.length - 1); i++) {
            for (let j = 1; j < (chamber[0].length - 1); j++) {
                if (chamber[i][j] == 1) {
                    if (chamber[i][j - 1] == 1 || chamber[i][j - 1] == 0) {
                        leftBlock += 0;
                    } else {
                        leftBlock += 1;
                    }
                }
            }
        }
        if (leftBlock == 0) {
            for (let i = 0; i < (chamber.length - 1); i++) {
                for (let j = 1; j < (chamber[0].length - 1); j++) {
                    if (chamber[i][j] == 1 && chamber[i][j - 1] == 0) {
                        chamber[i][j - 1] = 1;
                    }
                    if (chamber[i][j] == 1 && chamber[i][j + 1] != 1) {
                        chamber[i][j] = 0;
                    }
                }
            }
        }
    } else {
        for (let i = 0; i < (chamber.length - 1); i++) {
            for (let j = 1; j < (chamber[0].length - 1); j++) {
                if (chamber[i][j] == 1) {
                    if (chamber[i][j + 1] == 1 || chamber[i][j + 1] == 0) {
                        rightBlock += 0;
                    } else {
                        rightBlock += 1;
                    }
                }
            }
        }
        if (rightBlock == 0) {
            for (let i = 0; i < (chamber.length - 1); i++) {
                for (let j = (chamber[0].length - 1); j > 0; j--) {
                    if (chamber[i][j] == 1 && chamber[i][j + 1] == 0) {
                        chamber[i][j + 1] = 1;
                    }
                    if (chamber[i][j] == 1 && chamber[i][j - 1] != 1) {
                        chamber[i][j] = 0;
                    }
                }
            }
        }
    }
    
    fallBlock = 0;
    
    for (let i = 1; i < (chamber.length - 1); i++) {
        for (let j = 1; j < (chamber[0].length - 1); j++) {
            if (chamber[i][j] == 1) {
                if (chamber[i - 1][j] == 1 || chamber[i - 1][j] == 0) {
                    fallBlock += 0;
                } else {
                    fallBlock += 1;
                }
            }
        }
    }

    count = 0;
    
    for (let i = 0; i < chamber.length; i++) {
        for (let j = 0; j < chamber[0].length; j++) {
            if (chamber[i][j] == 1) {
                count += 1;
            }
        }
    }
    if (count == 0) {
        fallBlock = 1;
    }
    
    if (fallBlock == 0) {
        for (let i = 1; i < (chamber.length - 1); i++) {
            for (let j = 1; j < (chamber[0].length - 1); j++) {
                if (chamber[i][j] == 1 && chamber[i - 1][j] == 0) {
                    chamber[i - 1][j] = 1;
                }
                if (chamber[i][j] == 1 && chamber[i + 1][j] != 1) {
                    chamber[i][j] = 0;
                }
            }
        }
    } else {
        for (let i = 1; i < chamber.length; i++) {
            for (let j = 1; j < (chamber[0].length - 1); j++) {
                if (chamber[i][j] == 1) {
                    chamber[i][j] = 2;
                }
            }
        }

        let deleteList = [];

        for (let i = 1; i < chamber.length; i++) {
            let sum = 0;
            for (let j = 1; j < (chamber[0].length - 1); j++) {
                sum += chamber[i][j];
            }
            if (sum == 0) {
                deleteList.push(i);
            }
        }

        deleteList = deleteList.reverse()

        for (let i = 0; i < deleteList.length; i++) {
            chamber.splice(deleteList[i], 1);
        }
        let newLength = chamber.length - 1
        unitDiff.push(newLength - units);
        units = chamber.length - 1;
        rockCount += 1;
    
        if (rockCount == 5022) break;
    }
    if (rockCount == 5022) break;

    loopCount += 1;
}

let usedLengths = [];

for (let startPos = 0; startPos < unitDiff.length; startPos++) {
    for (let sequenceLength = 1; sequenceLength <= (unitDiff.length - startPos) / 2; sequenceLength++) {
        let sequencesAreEqual = true;
        for (let i = 0; i < sequenceLength; i++) {
            if (unitDiff[startPos + i] != unitDiff[startPos + sequenceLength + i]) {
                sequencesAreEqual = false;
                break;
            }
        }
        if (sequencesAreEqual == true && sequenceLength > 100 && usedLengths.includes(sequenceLength) == false) {
            usedLengths.push(sequenceLength);
        }
    }
}

let startSlice = unitDiff.slice(0, 217);

let startUnits = 0;

for (let i = 0; i < startSlice.length; i++) {
    startUnits += startSlice[i];
}

let repeatSlice = unitDiff.slice(217);

repeatSlice = repeatSlice.slice(0, 1730);

let repeatUnits = 0;

for (let i = 0; i < repeatSlice.length; i++) {
    repeatUnits += repeatSlice[i];
}

let endLength = (1000000000000 - 217) % 1730

let endSlice = repeatSlice.slice(0, 1653); 

let endUnits = 0;

for (let i = 0; i < endSlice.length; i++) {
    endUnits += endSlice[i];
}

let totalUnits = (Math.floor((1000000000000 - 217) / 1730) * repeatUnits) + startUnits + endUnits;

console.log("totalUnits:", totalUnits);