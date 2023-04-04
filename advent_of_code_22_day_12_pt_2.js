let inputString = ``; // Insert your puzzle input between the backticks

let splitString = inputString.split('\n');

let arr = [];

for (let i = 0; i < splitString.length; i++) {
    arr[i] = splitString[i].split('');
}

let letters = 'zyxwvutsrqponmlkjihgfedcba';

let S_row = 0;
let S_col = 0;
let E_row = 0;
let E_col = 0;

for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
        if (arr[i][j] == 'E') {
            S_row = i;
            S_col = j;
        } else if (arr[i][j] == 'S') {
            E_row = i;
            E_col = j;
        }
    }
}

let curr = letters[0];
let tempPairs = [[S_row, S_col]]; 
let tempLevels = [1]; 
let tempCount = 0;
let count = 0;
let visited = [];
let test = '';

while (curr != 'a') {
    for (let i = 0; i < tempPairs.length; i++) {
        tempCount = 0;
        if ((tempPairs[i][0] + 1) <= (arr.length - 1) && tempCount == 0) {
            test = JSON.stringify([tempPairs[i][0] + 1, tempPairs[i][1]]);
            if (arr[tempPairs[i][0] + 1][tempPairs[i][1]] == letters[letters.indexOf(curr) + 1] && (visited.includes(test) == false)) {
                S_row = tempPairs[i][0] + 1;
                S_col = tempPairs[i][1];
                count += tempLevels[i];
                tempCount += 1;
                curr = letters[letters.indexOf(curr) + 1];
                visited.push(JSON.stringify([S_row, S_col]));
                tempPairs = [[S_row, S_col]];
                tempLevels = [1];
                i = 0;
            } 
        } 
        if ((tempPairs[i][0] - 1) >= 0 && tempCount == 0)  {
            test = JSON.stringify([tempPairs[i][0] - 1, tempPairs[i][1]]);
            if (arr[tempPairs[i][0] - 1][tempPairs[i][1]] == letters[letters.indexOf(curr) + 1] && (visited.includes(test) == false)) {
                S_row = tempPairs[i][0] - 1;
                S_col = tempPairs[i][1];
                count += tempLevels[i];
                tempCount += 1;
                curr = letters[letters.indexOf(curr) + 1];
                visited.push(JSON.stringify([S_row, S_col]));
                tempPairs = [[S_row, S_col]];
                tempLevels = [1];
                i = 0;
            } 
        } 
        if ((tempPairs[i][1] + 1) <= (arr[0].length - 1) && tempCount == 0) {
            test = JSON.stringify([tempPairs[i][0], tempPairs[i][1] + 1]);
            if (arr[tempPairs[i][0]][tempPairs[i][1] + 1] == letters[letters.indexOf(curr) + 1] && (visited.includes(test) == false)) {
                S_row = tempPairs[i][0];
                S_col = tempPairs[i][1] + 1;
                count += tempLevels[i];
                tempCount += 1;
                curr = letters[letters.indexOf(curr) + 1];
                visited.push(JSON.stringify([S_row, S_col])); 
                tempPairs = [[S_row, S_col]];
                tempLevels = [1];
                i = 0;
            }
        } 
        if ((tempPairs[i][1] - 1) >= 0 && tempCount == 0) {
            test = JSON.stringify([tempPairs[i][0], tempPairs[i][1] - 1]);
            if (arr[tempPairs[i][0]][tempPairs[i][1] - 1] == letters[letters.indexOf(curr) + 1] && (visited.includes(test) == false)) {
                S_row = tempPairs[i][0];
                S_col = tempPairs[i][1] - 1;
                count += tempLevels[i];
                tempCount += 1;
                curr = letters[letters.indexOf(curr) + 1];
                visited.push(JSON.stringify([S_row, S_col]));
                tempPairs = [[S_row, S_col]];
                tempLevels = [1];
                i = 0;
            } 
        }   
    } 
    if (tempCount == 0) {
        for (let i = 0; i < tempPairs.length; i++) {
            tempCount == 0;
            if ((tempPairs[i][0] + 1) <= (arr.length - 1)) {
                test = JSON.stringify([tempPairs[i][0] + 1, tempPairs[i][1]]);
                if ((arr[tempPairs[i][0] + 1][tempPairs[i][1]] == letters[letters.indexOf(curr)]) && (visited.includes(test) == false)) {
                    visited.push(JSON.stringify([tempPairs[i][0] + 1, tempPairs[i][1]]));
                    tempPairs.push([tempPairs[i][0] + 1, tempPairs[i][1]]);
                    tempLevels.push(tempLevels[i] + 1);
                    tempCount += 1;
                } 
            } 
            if ((tempPairs[i][0] - 1) >= 0) {
                test = JSON.stringify([tempPairs[i][0] - 1, tempPairs[i][1]]);
                if ((arr[tempPairs[i][0] - 1][tempPairs[i][1]] == letters[letters.indexOf(curr)]) && (visited.includes(test) == false)) {
                    visited.push(JSON.stringify([tempPairs[i][0] - 1, tempPairs[i][1]]));
                    tempPairs.push([tempPairs[i][0] - 1, tempPairs[i][1]]);
                    tempLevels.push(tempLevels[i] + 1);
                    tempCount += 1; 
                } 
            } 
            if ((tempPairs[i][1] + 1) <= (arr[0].length - 1)) {
                test = JSON.stringify([tempPairs[i][0], tempPairs[i][1] + 1]);
                if ((arr[tempPairs[i][0]][tempPairs[i][1] + 1] == letters[letters.indexOf(curr)]) && (visited.includes(test) == false)) {
                    visited.push(JSON.stringify([tempPairs[i][0], tempPairs[i][1] + 1]));
                    tempPairs.push([tempPairs[i][0], tempPairs[i][1] + 1]);
                    tempLevels.push(tempLevels[i] + 1);
                    tempCount += 1;
                }
            } 
            if ((tempPairs[i][1] - 1) >= 0) {
                test = JSON.stringify([tempPairs[i][0], tempPairs[i][1] - 1]);
                if ((arr[tempPairs[i][0]][tempPairs[i][1] - 1] == letters[letters.indexOf(curr)]) && (visited.includes(test) == false)) {
                    visited.push(JSON.stringify([tempPairs[i][0], tempPairs[i][1] - 1]));
                    tempPairs.push([tempPairs[i][0], tempPairs[i][1] - 1]);
                    tempLevels.push(tempLevels[i] + 1);
                    tempCount += 1; 
                } 
            }  
        }
    }
    if (tempCount == 0) {
        for (let i = 0; i < tempPairs.length; i++) {
            tempCount = 0;
            if ((tempPairs[i][0] + 1) <= (arr.length - 1) && tempCount == 0) {
                test = JSON.stringify([tempPairs[i][0] + 1, tempPairs[i][1]]);
                if (letters.indexOf(arr[tempPairs[i][0] + 1][tempPairs[i][1]]) < letters.indexOf(curr) && (visited.includes(test) == false)) {
                    S_row = tempPairs[i][0] + 1;
                    S_col = tempPairs[i][1];
                    count += tempLevels[i];
                    tempCount += 1;
                    curr = letters[letters.indexOf(arr[tempPairs[i][0] + 1][tempPairs[i][1]])];
                    visited.push(JSON.stringify([S_row, S_col]));
                    tempPairs = [[S_row, S_col]];
                    tempLevels = [1];
                    i = 0;
                } 
            } 
            if ((tempPairs[i][0] - 1) >= 0 && tempCount == 0)  {
                test = JSON.stringify([tempPairs[i][0] - 1, tempPairs[i][1]]);
                if (letters.indexOf(arr[tempPairs[i][0] - 1][tempPairs[i][1]]) < letters.indexOf(curr) && (visited.includes(test) == false)) {
                    S_row = tempPairs[i][0] - 1;
                    S_col = tempPairs[i][1];
                    count += tempLevels[i]; 
                    tempCount += 1;
                    curr = letters[letters.indexOf(arr[tempPairs[i][0] - 1][tempPairs[i][1]])];
                    visited.push(JSON.stringify([S_row, S_col]));
                    tempPairs = [[S_row, S_col]];
                    tempLevels = [1];
                    i = 0;
                } 
            } 
            if ((tempPairs[i][1] + 1) <= (arr[0].length - 1) && tempCount == 0) {
                test = JSON.stringify([tempPairs[i][0], tempPairs[i][1] + 1]);
                if (letters.indexOf(arr[tempPairs[i][0]][tempPairs[i][1] + 1]) < letters.indexOf(curr) && (visited.includes(test) == false)) {
                    S_row = tempPairs[i][0];
                    S_col = tempPairs[i][1] + 1;
                    count += tempLevels[i];
                    tempCount += 1;
                    curr = letters[letters.indexOf(arr[tempPairs[i][0]][tempPairs[i][1] + 1])];
                    visited.push(JSON.stringify([S_row, S_col])); 
                    tempPairs = [[S_row, S_col]];
                    tempLevels = [1];
                    i = 0;
                }
            } 
            if ((tempPairs[i][1] - 1) >= 0 && tempCount == 0) {
                test = JSON.stringify([tempPairs[i][0], tempPairs[i][1] - 1]);
                if (letters.indexOf(arr[tempPairs[i][0]][tempPairs[i][1] - 1]) < letters.indexOf(curr) && (visited.includes(test) == false)) {
                    S_row = tempPairs[i][0];
                    S_col = tempPairs[i][1] - 1;
                    count += tempLevels[i];
                    tempCount += 1;
                    curr = letters[letters.indexOf(arr[tempPairs[i][0]][tempPairs[i][1] - 1])];
                    visited.push(JSON.stringify([S_row, S_col]));
                    tempPairs = [[S_row, S_col]];
                    tempLevels = [1];
                    i = 0;
                } 
            }   
        } 
    }
}

console.log("count:", count);