let inputString = ``; // Insert your puzzle input between the backticks

let moves = inputString.split('\n');

for (let i = 0; i < moves.length; i++) {
    moves[i] = moves[i].split(" ");
}

for (let i = 0; i < moves.length; i++) {
    moves[i][1] = Number(moves[i][1]);
}

let head = [0, 0];
let tail = [0, 0];
let tailMoves = [];

for (let i = 0; i < moves.length; i++) {
    if (moves[i][0] == 'U') {
        for (let j = 0; j < moves[i][1]; j++) {
            head[0] += 1;
            if (head[1] != tail[1] && (head[0] - tail[0] == 2)) {
                tail[1] = head[1];
            }
            if (head[0] - tail[0] == 2) {
                tail[0] += 1;
            }
            tailMoves.push(tail.slice());
        }
    }
    if (moves[i][0] == 'D') {
        for (let j = 0; j < moves[i][1]; j++) {
            head[0] -= 1;
            if (head[1] != tail[1] && (tail[0] - head[0] == 2)) {
                tail[1] = head[1];
            }
            if (tail[0] - head[0] == 2) {
                tail[0] -= 1;
            }
            tailMoves.push(tail.slice());
        }
    }
    if (moves[i][0] == 'R') {
        for (let j = 0; j < moves[i][1]; j++) {
            head[1] += 1;
            if (head[0] != tail[0] && (head[1] - tail[1] == 2)) {
                tail[0] = head[0];
            }
            if (head[1] - tail[1] == 2) {
                tail[1] += 1;
            }
            tailMoves.push(tail.slice());
        }
    }
    if (moves[i][0] == 'L') {
        for (let j = 0; j < moves[i][1]; j++) {
            head[1] -= 1;
            if (head[0] != tail[0] && (tail[1] - head[1] == 2)) {
                tail[0] = head[0];
            }
            if (tail[1] - head[1] == 2) {
                tail[1] -= 1;
            }
            tailMoves.push(tail.slice()); 
        }
    }
}

for (let i = 0; i < tailMoves.length; i++) {
    tailMoves[i] = JSON.stringify(tailMoves[i]);
}

const unique = new Set(tailMoves);

console.log("size:", unique.size);





