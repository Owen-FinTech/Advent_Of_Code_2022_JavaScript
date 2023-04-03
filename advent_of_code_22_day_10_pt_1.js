let inputString = ``; // Insert your puzzle input between the backticks

let register = inputString.split('\n');

let cycle = 0;
let x = 1;
let strengths = {};

for (let i = 0; i < register.length; i++) {
    if (register[i] == 'noop') {
        cycle += 1;
        if (cycle == 20 || cycle == 60 || cycle == 100 || cycle == 140 || cycle == 180 || cycle == 220) {
            strengths[cycle] = x * cycle;
        }
    } else {
        cycle += 1;
        if (cycle == 20 || cycle == 60 || cycle == 100 || cycle == 140 || cycle == 180 || cycle == 220) {
            strengths[cycle] = x * cycle;
        }
        cycle += 1;
        if (cycle == 20 || cycle == 60 || cycle == 100 || cycle == 140 || cycle == 180 || cycle == 220) {
            strengths[cycle] = x * cycle;
        }
        x += Number(register[i].slice(5));
    }
}

let sum = 0;

let strengthValues = Object.values(strengths);

for (i = 0; i < strengthValues.length; i++) {
    sum += strengthValues[i];
}

console.log("Sum:", sum);