let inputString = ``; // Insert your puzzle input between the backticks

let register = inputString.split('\n');

let crt = '................................................................................................................................................................................................................................................';

let cycle = 0;
let x = 1;

for (let i = 0; i < register.length; i++) {
    if (register[i] == 'noop') {
        if (cycle == x || cycle == x - 1 || cycle == x + 1) {
            crt = crt.substring(0, cycle) + '#' + crt.substring(cycle + 1);
        }
        if (cycle == 39 || cycle == 79 || cycle == 119 || cycle == 159 || cycle == 199) {
            x += 40;
        }
        cycle += 1;    
    } else {
        if (cycle == x || cycle == x - 1 || cycle == x + 1) {
            crt = crt.substring(0, cycle) + '#' + crt.substring(cycle + 1);
        }
        if (cycle == 39 || cycle == 79 || cycle == 119 || cycle == 159 || cycle == 199) {
            x += 40;
        }
        cycle += 1;
        if (cycle == x || cycle == x - 1 || cycle == x + 1) {
            crt = crt.substring(0, cycle) + '#' + crt.substring(cycle + 1);
        }
        if (cycle == 39 || cycle == 79 || cycle == 119 || cycle == 159 || cycle == 199) {
            x += 40;
        }
        cycle += 1;
        x += Number(register[i].slice(5));

    }

}
let crtFormat = [crt.slice(0,40), crt.slice(40, 80), crt.slice(80, 120), crt.slice(120, 160), crt.slice(160, 200), crt.slice(200, 240)];

console.log(crtFormat);