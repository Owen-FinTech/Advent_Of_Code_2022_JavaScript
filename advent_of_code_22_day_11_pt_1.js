let inputString = ``; // Insert your puzzle input between the backticks

let splitString = inputString.split('\n');

let inputObj = {};

for (let i = 0; i < splitString.length; i++) {
    if (splitString[i].slice(0,6) == 'Monkey') {
        inputObj[splitString[i]] = [splitString[i + 1].split(' '), splitString[i + 2].split(' '), splitString[i + 3].split(' '), splitString[i + 4].trim().split(' '), splitString[i + 5].trim().split(' ')];
    }
}

let inputKeys = Object.keys(inputObj);
let round = 1;
let inspectedObj = {};

for (let i = 0; i < inputKeys.length; i++) {
    inspectedObj[inputKeys[i]] = 0; 
}

while (round < 21) {
    for (let i = 0; i < inputKeys.length; i++) {
        for (let j = 2; j < inputObj[inputKeys[i]][0].length; j++) {
            inspectedObj[inputKeys[i]] += 1;
            if (typeof inputObj[inputKeys[i]][0][j] == "string") {
                inputObj[inputKeys[i]][0][j] = inputObj[inputKeys[i]][0][j].replace(',', '');
                inputObj[inputKeys[i]][0][j] = Number(inputObj[inputKeys[i]][0][j]);
            }
            if (inputObj[inputKeys[i]][1][4] == '+') {
                if (inputObj[inputKeys[i]][1][5] == 'old') {
                    inputObj[inputKeys[i]][0][j] = inputObj[inputKeys[i]][0][j] + inputObj[inputKeys[i]][0][j];
                } else {
                    inputObj[inputKeys[i]][0][j] = inputObj[inputKeys[i]][0][j] + Number(inputObj[inputKeys[i]][1][5]);
                }
            } else {
                if (inputObj[inputKeys[i]][1][5] == 'old') {
                    inputObj[inputKeys[i]][0][j] = inputObj[inputKeys[i]][0][j] * inputObj[inputKeys[i]][0][j];
                } else {
                    inputObj[inputKeys[i]][0][j] = inputObj[inputKeys[i]][0][j] * Number(inputObj[inputKeys[i]][1][5]);
                }
            }
            inputObj[inputKeys[i]][0][j] = Math.floor(inputObj[inputKeys[i]][0][j] / 3);
            if (inputObj[inputKeys[i]][0][j] % Number(inputObj[inputKeys[i]][2][3]) == 0) {
                let removed = Number(inputObj[inputKeys[i]][0].splice(j, 1));
                inputObj[inputKeys[Number(inputObj[inputKeys[i]][3][5])]][0].push(removed);
                j -= 1; 
            } else {
                let removed = Number(inputObj[inputKeys[i]][0].splice(j, 1));
                inputObj[inputKeys[Number(inputObj[inputKeys[i]][4][5])]][0].push(removed);
                j -= 1;
            }

        }
    }
    round += 1;
}

let inspectedKeys = Object.keys(inspectedObj);
let inspectedList = []; 

for (let i = 0; i < inspectedKeys.length; i++) {
    inspectedList.push(inspectedObj[inspectedKeys[i]])
}

let maximum = Math.max(...inspectedList);

inspectedList.splice(inspectedList.indexOf(maximum), 1);

let secondMaximum = Math.max(...inspectedList);

let monkeyBusiness = maximum * secondMaximum;

console.log("monkey business:", monkeyBusiness);



