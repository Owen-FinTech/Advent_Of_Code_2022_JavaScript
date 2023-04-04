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

while (rockCount < 2022) {
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
            // console.log("currentRock[i]:", currentRock[i]);
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

        units = chamber.length - 1;
        rockCount += 1;
        if (rockCount == 2022) break;
    }
    if (rockCount == 2022) break;
    loopCount += 1;
}

console.log("units:", chamber.length - 1);
