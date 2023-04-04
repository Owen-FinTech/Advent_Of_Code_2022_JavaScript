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

console.log("surface:", surf(input));


