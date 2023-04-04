let inputString = ``; // Insert your puzzle input between the backticks

let input = inputString.split('\n');

// bases = 5 raised to the power of the index starting from right (begining with 0)

for (let i = 0; i < input.length; i++) {
    input[i] = input[i].split('');
    input[i] = input[i].reverse();    
}

let snafus = 0;

for (let i = 0; i < input.length; i++) {
    let convert = 0;
    for (let j = 0; j < input[i].length; j++) {
        if (input[i][j] == '2') {
            convert += (2 * (5 ** j));
        } else if (input[i][j] == '1') {
            convert += (5 ** j);
        } else if (input[i][j] == '-') {
            convert += (-1 * (5 ** j));
        } else if (input[i][j] == '=') {
            convert += (-2 * (5 ** j));
        }
    }
    snafus += convert;
}

let bases = {};
let power = 0;

while (snafus > 0) {
    if (snafus > (5 ** power)) {
        power += 1;
    } else {
        bases[JSON.stringify(power - 1)] = Math.floor(snafus / (5 ** (power - 1)));
        snafus = snafus % (5 ** (power - 1));
        power = 0;
    }
} 

let basesKeys = Object.keys(bases);
let maxKey = 0;

for (let i = 0; i < basesKeys.length; i++) {
    if (Number(basesKeys[i]) > maxKey) {
        maxKey = Number(basesKeys[i]);
    }
}

for (let i = 0; i < maxKey; i++) {
    if (basesKeys.includes(JSON.stringify(i)) == false) {
        bases[JSON.stringify(i)] = 0;
    }
}

basesKeys = Object.keys(bases);

for (let i = 0; i < basesKeys.length; i++) {
    if ((i + 1) <= maxKey) {
        if (bases[JSON.stringify(i)] > 2) {
            bases[JSON.stringify(i + 1)] += 1;
            bases[JSON.stringify(i)] -= 5;
        }
    } else {
        if (bases[JSON.stringify(i)] > 2) {
            bases[JSON.stringify(i + 1)] = 1;
            bases[JSON.stringify(i)] -= 5;
            maxKey += 1;
        }
    }
}

let result = '';

for (let i = maxKey; i >= 0; i--) {
    if (bases[JSON.stringify(i)] == 2) {
        result += '2';
    } else if (bases[JSON.stringify(i)] == 1) {
        result += '1';
    } else if (bases[JSON.stringify(i)] == 0) {
        result += '0';
    } else if (bases[JSON.stringify(i)] == -1) {
        result += '-';
    } else {
        result += '=';
    }
}

console.log("result:", result);