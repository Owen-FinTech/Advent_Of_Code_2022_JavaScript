let initialString = ``; // Insert your puzzle input between the backticks

let twoParts = initialString.split('\n\n');

let stackList = [];
stackList.push([]);

let firstPart = twoParts[0].split('\n');

for (let i = 0; i < firstPart[firstPart.length - 1].length; i++) {
    if (firstPart[firstPart.length - 1][i] != ' ') {
        stackList.push([]);
    }
}

for (let i = firstPart.length - 2; i >= 0; i--) {
    for (let j = 1; j < firstPart[i].length; j += 4) {
        if (firstPart[i][j] != ' ') {
            stackList[(j % 4) + Math.floor(j / 4)].push(firstPart[i][j]);
        }
    }
}

let movements = twoParts[1].split('\n');

for (let i = 0; i < movements.length; i++) {
    movements[i] = movements[i].split(' ');
}


for (let i = 0; i < movements.length; i++) {
    let count = 0;
    let newStack = [];
    while (count < Number(movements[i][1])) {
        let newPop = stackList[Number(movements[i][3])].pop();
        newStack.push(newPop);
        count += 1;
    }
    while (count > 0) {
        let newPopTwo = newStack.pop();
        stackList[Number(movements[i][5])].push(newPopTwo);
        count -= 1;
    }
}

let finalList = [];

for (let i = 1; i < stackList.length; i++) {
    finalList.push(stackList[i][stackList[i].length - 1]);
}

let finalString = "";
for (let i = 0; i < finalList.length; i++) {
    finalString += finalList[i];
}

console.log("Result: ", finalString);