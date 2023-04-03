let inputString = ``; // Insert your puzzle input between the backticks

let bash = inputString.split('\n');

let dirObj = {};
currentDir = ''
for (let i = 0; i < bash.length; i++) {
    if (bash[i].substring(0, 5) == '$ cd ') {
        if (bash[i].substring(5) == '..') {
            let remove = '';
            let lastRemove = '';
            while (lastRemove != '/') {
                remove = currentDir[currentDir.length - 1];
                currentDir = currentDir.substring(0, currentDir.length - 1);
                lastRemove = remove;
            }
        } else {
            dirObj[currentDir + '/' + bash[i].substring(5)] = 0;
            currentDir = currentDir + '/' + bash[i].substring(5);
        }
    }
    let splitBash = bash[i].split(' ');
    if (splitBash[0] != "$" && splitBash[0] != "dir") {
        dirObj[currentDir] += Number(splitBash[0]);
    }
}

let slashes = 14;

let valuesArray = Object.values(dirObj);
let keysArray = Object.keys(dirObj);

while (slashes >= 2) {
    for (let i = 0; i < valuesArray.length; i++) {
        if ((keysArray[i].split("/").length - 1) == slashes) {
            for (let j = 0; j < valuesArray.length; j++) {
                if ((keysArray[j].split("/").length - 1) == slashes - 1) {
                    if (keysArray[i].includes(keysArray[j])) {
                        dirObj[keysArray[j]] += dirObj[keysArray[i]]
                    }
                }
            }
        }
    }
    slashes -= 1;
}

valuesArray = Object.values(dirObj);

let total = 0;
for (let i = 0; i < valuesArray.length; i++) {
    if (valuesArray[i] <= 100000) {
        total += valuesArray[i];
    }
}

console.log("Total: ", total);