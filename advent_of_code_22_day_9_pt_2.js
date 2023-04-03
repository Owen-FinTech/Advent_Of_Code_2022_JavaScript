let inputString = ``; // Insert your puzzle input between the backticks

let moves = inputString.split('\n');

for (let i = 0; i < moves.length; i++) {
    moves[i] = moves[i].split(" ");
}

for (let i = 0; i < moves.length; i++) {
    moves[i][1] = Number(moves[i][1]);
}

let head = [0, 0];
let tail_1 = [0, 0];
let tail_2 = [0, 0];
let tail_3 = [0, 0];
let tail_4 = [0, 0];
let tail_5 = [0, 0];
let tail_6 = [0, 0];
let tail_7 = [0, 0];
let tail_8 = [0, 0];
let tail_9 = [0, 0];
let tailMoves = [];
let singleMoves = [];

for (let i = 0; i < moves.length; i++) {
    if (moves[i][0] == 'U') {
        for (let j = 0; j < moves[i][1]; j++) {
            singleMoves.push('U');
        }
    }
    if (moves[i][0] == 'D') {
        for (let j = 0; j < moves[i][1]; j++) {
            singleMoves.push('D');  
        }
    }
    if (moves[i][0] == 'R') {
        for (let j = 0; j < moves[i][1]; j++) {
            singleMoves.push('R');
        }
    }
    if (moves[i][0] == 'L') {
        for (let j = 0; j < moves[i][1]; j++) {
            singleMoves.push('L'); 
        }
    }
}

for (let i = 0; i < singleMoves.length; i++) {
    if (singleMoves[i] == 'U') {
        head[0] += 1;
    }
    if (singleMoves[i] == 'D') {
        head[0] -= 1;
    }
    if (singleMoves[i] == 'R') {
        head[1] += 1;
    }
    if (singleMoves[i] == 'L') {
        head[1] -= 1;
    }
    // 1
    if ((head[1] - tail_1[1] >= 2) && (head[0] - tail_1[0] >= 2)) {
        tail_1[0] += 1;
        tail_1[1] += 1;
    }
    if ((tail_1[1] - head[1] >= 2) && (tail_1[0] - head[0] >= 2)) {
        tail_1[0] -= 1;
        tail_1[1] -= 1;
    }
    if ((head[0] - tail_1[0] >= 2) && (tail_1[1] - head[1] >= 2)) {
        tail_1[0] += 1;
        tail_1[1] -= 1;
    }
    if ((tail_1[0] - head[0] >= 2) && (head[1] - tail_1[1] >= 2)) {
        tail_1[0] -= 1;
        tail_1[1] += 1;
    }

    if (head[1] != tail_1[1] && (head[0] - tail_1[0] >= 2)) {
        tail_1[1] = head[1];
    }
    if (head[1] != tail_1[1] && (tail_1[0] - head[0] >= 2)) {
        tail_1[1] = head[1];
    }
    if (head[0] != tail_1[0] && (head[1] - tail_1[1] >= 2)) {
        tail_1[0] = head[0];
    }
    if (head[0] != tail_1[0] && (tail_1[1] - head[1] >= 2)) {
        tail_1[0] = head[0];
    }
    if (head[0] - tail_1[0] >= 2) {
        tail_1[0] += 1;
    }
    if (tail_1[0] - head[0] >= 2) {
        tail_1[0] -= 1;
    }
    if (head[1] - tail_1[1] >= 2) {
        tail_1[1] += 1;
    }
    if (tail_1[1] - head[1] >= 2) {
        tail_1[1] -= 1;
    }
    // 2
    if ((tail_1[1] - tail_2[1] >= 2) && (tail_1[0] - tail_2[0] >= 2)) {
        tail_2[0] += 1;
        tail_2[1] += 1;
    }
    if ((tail_2[1] - tail_1[1] >= 2) && (tail_2[0] - tail_1[0] >= 2)) {
        tail_2[0] -= 1;
        tail_2[1] -= 1;
    }
    if ((tail_1[0] - tail_2[0] >= 2) && (tail_2[1] - tail_1[1] >= 2)) {
        tail_2[0] += 1;
        tail_2[1] -= 1;
    }
    if ((tail_2[0] - tail_1[0] >= 2) && (tail_1[1] - tail_2[1] >= 2)) {
        tail_2[0] -= 1;
        tail_2[1] += 1;
    }

    if (tail_1[1] != tail_2[1] && (tail_1[0] - tail_2[0] >= 2)) {
        tail_2[1] = tail_1[1];
    }
    if (tail_1[1] != tail_2[1] && (tail_2[0] - tail_1[0] >= 2)) {
        tail_2[1] = tail_1[1];
    }
    if (tail_1[0] != tail_2[0] && (tail_1[1] - tail_2[1] >= 2)) {
        tail_2[0] = tail_1[0];
    }
    if (tail_1[0] != tail_2[0] && (tail_2[1] - tail_1[1] >= 2)) {
        tail_2[0] = tail_1[0];
    }
    if (tail_1[0] - tail_2[0] >= 2) {
        tail_2[0] += 1;
    }
    if (tail_2[0] - tail_1[0] >= 2) {
        tail_2[0] -= 1;
    }
    if (tail_1[1] - tail_2[1] >= 2) {
        tail_2[1] += 1;
    }
    if (tail_2[1] - tail_1[1] >= 2) {
        tail_2[1] -= 1;
    }
    // 3
    if ((tail_2[1] - tail_3[1] >= 2) && (tail_2[0] - tail_3[0] >= 2)) {
        tail_3[0] += 1;
        tail_3[1] += 1;
    }
    if ((tail_3[1] - tail_2[1] >= 2) && (tail_3[0] - tail_2[0] >= 2)) {
        tail_3[0] -= 1;
        tail_3[1] -= 1;
    }
    if ((tail_2[0] - tail_3[0] >= 2) && (tail_3[1] - tail_2[1] >= 2)) {
        tail_3[0] += 1;
        tail_3[1] -= 1;
    }
    if ((tail_3[0] - tail_2[0] >= 2) && (tail_2[1] - tail_3[1] >= 2)) {
        tail_3[0] -= 1;
        tail_3[1] += 1;
    }

    if (tail_2[1] != tail_3[1] && (tail_2[0] - tail_3[0] >= 2)) {
        tail_3[1] = tail_2[1];
    }
    if (tail_2[1] != tail_3[1] && (tail_3[0] - tail_2[0] >= 2)) {
        tail_3[1] = tail_2[1];
    }
    if (tail_2[0] != tail_3[0] && (tail_2[1] - tail_3[1] >= 2)) {
        tail_3[0] = tail_2[0];
    }
    if (tail_2[0] != tail_3[0] && (tail_3[1] - tail_2[1] >= 2)) {
        tail_3[0] = tail_2[0];
    }
    if (tail_2[0] - tail_3[0] >= 2) {
        tail_3[0] += 1;
    }
    if (tail_3[0] - tail_2[0] >= 2) {
        tail_3[0] -= 1;
    }
    if (tail_2[1] - tail_3[1] >= 2) {
        tail_3[1] += 1;
    }
    if (tail_3[1] - tail_2[1] >= 2) {
        tail_3[1] -= 1;
    }
    // 4
    if ((tail_3[1] - tail_4[1] >= 2) && (tail_3[0] - tail_4[0] >= 2)) {
        tail_4[0] += 1;
        tail_4[1] += 1;
    }
    if ((tail_4[1] - tail_3[1] >= 2) && (tail_4[0] - tail_3[0] >= 2)) {
        tail_4[0] -= 1;
        tail_4[1] -= 1;
    }
    if ((tail_3[0] - tail_4[0] >= 2) && (tail_4[1] - tail_3[1] >= 2)) {
        tail_4[0] += 1;
        tail_4[1] -= 1;
    }
    if ((tail_4[0] - tail_3[0] >= 2) && (tail_3[1] - tail_4[1] >= 2)) {
        tail_4[0] -= 1;
        tail_4[1] += 1;
    }

    if (tail_3[1] != tail_4[1] && (tail_3[0] - tail_4[0] >= 2)) {
        tail_4[1] = tail_3[1];
    }
    if (tail_3[1] != tail_4[1] && (tail_4[0] - tail_3[0] >= 2)) {
        tail_4[1] = tail_3[1];
    }
    if (tail_3[0] != tail_4[0] && (tail_3[1] - tail_4[1] >= 2)) {
        tail_4[0] = tail_3[0];
    }
    if (tail_3[0] != tail_4[0] && (tail_4[1] - tail_3[1] >= 2)) {
        tail_4[0] = tail_3[0];
    }
    if (tail_3[0] - tail_4[0] >= 2) {
        tail_4[0] += 1;
    }
    if (tail_4[0] - tail_3[0] >= 2) {
        tail_4[0] -= 1;
    }
    if (tail_3[1] - tail_4[1] >= 2) {
        tail_4[1] += 1;
    }
    if (tail_4[1] - tail_3[1] >= 2) {
        tail_4[1] -= 1;
    }
    // 5
    if ((tail_4[1] - tail_5[1] >= 2) && (tail_4[0] - tail_5[0] >= 2)) {
        tail_5[0] += 1;
        tail_5[1] += 1;
    }
    if ((tail_5[1] - tail_4[1] >= 2) && (tail_5[0] - tail_4[0] >= 2)) {
        tail_5[0] -= 1;
        tail_5[1] -= 1;
    }
    if ((tail_4[0] - tail_5[0] >= 2) && (tail_5[1] - tail_4[1] >= 2)) {
        tail_5[0] += 1;
        tail_5[1] -= 1;
    }
    if ((tail_5[0] - tail_4[0] >= 2) && (tail_4[1] - tail_5[1] >= 2)) {
        tail_5[0] -= 1;
        tail_5[1] += 1;
    }

    if (tail_4[1] != tail_5[1] && (tail_4[0] - tail_5[0] >= 2)) {
        tail_5[1] = tail_4[1];
    }
    if (tail_4[1] != tail_5[1] && (tail_5[0] - tail_4[0] >= 2)) {
        tail_5[1] = tail_4[1];
    }
    if (tail_4[0] != tail_5[0] && (tail_4[1] - tail_5[1] >= 2)) {
        tail_5[0] = tail_4[0];
    }
    if (tail_4[0] != tail_5[0] && (tail_5[1] - tail_4[1] >= 2)) {
        tail_5[0] = tail_4[0];
    }
    if (tail_4[0] - tail_5[0] >= 2) {
        tail_5[0] += 1;
    }
    if (tail_5[0] - tail_4[0] >= 2) {
        tail_5[0] -= 1;
    }
    if (tail_4[1] - tail_5[1] >= 2) {
        tail_5[1] += 1;
    }
    if (tail_5[1] - tail_4[1] >= 2) {
        tail_5[1] -= 1;
    }
    // 6
    if ((tail_5[1] - tail_6[1] >= 2) && (tail_5[0] - tail_6[0] >= 2)) {
        tail_6[0] += 1;
        tail_6[1] += 1;
    }
    if ((tail_6[1] - tail_5[1] >= 2) && (tail_6[0] - tail_5[0] >= 2)) {
        tail_6[0] -= 1;
        tail_6[1] -= 1;
    }
    if ((tail_5[0] - tail_6[0] >= 2) && (tail_6[1] - tail_5[1] >= 2)) {
        tail_6[0] += 1;
        tail_6[1] -= 1;
    }
    if ((tail_6[0] - tail_5[0] >= 2) && (tail_5[1] - tail_6[1] >= 2)) {
        tail_6[0] -= 1;
        tail_6[1] += 1;
    }

    if (tail_5[1] != tail_6[1] && (tail_5[0] - tail_6[0] >= 2)) {
        tail_6[1] = tail_5[1];
    }
    if (tail_5[1] != tail_6[1] && (tail_6[0] - tail_5[0] >= 2)) {
        tail_6[1] = tail_5[1];
    }
    if (tail_5[0] != tail_6[0] && (tail_5[1] - tail_6[1] >= 2)) {
        tail_6[0] = tail_5[0];
    }
    if (tail_5[0] != tail_6[0] && (tail_6[1] - tail_5[1] >= 2)) {
        tail_6[0] = tail_5[0];
    }
    if (tail_5[0] - tail_6[0] >= 2) {
        tail_6[0] += 1;
    }
    if (tail_6[0] - tail_5[0] >= 2) {
        tail_6[0] -= 1;
    }
    if (tail_5[1] - tail_6[1] >= 2) {
        tail_6[1] += 1;
    }
    if (tail_6[1] - tail_5[1] >= 2) {
        tail_6[1] -= 1;
    }
    // 7
    if ((tail_6[1] - tail_7[1] >= 2) && (tail_6[0] - tail_7[0] >= 2)) {
        tail_7[0] += 1;
        tail_7[1] += 1;
    }
    if ((tail_7[1] - tail_6[1] >= 2) && (tail_7[0] - tail_6[0] >= 2)) {
        tail_7[0] -= 1;
        tail_7[1] -= 1;
    }
    if ((tail_6[0] - tail_7[0] >= 2) && (tail_7[1] - tail_6[1] >= 2)) {
        tail_7[0] += 1;
        tail_7[1] -= 1;
    }
    if ((tail_7[0] - tail_6[0] >= 2) && (tail_6[1] - tail_7[1] >= 2)) {
        tail_7[0] -= 1;
        tail_7[1] += 1;
    }

    if (tail_6[1] != tail_7[1] && (tail_6[0] - tail_7[0] >= 2)) {
        tail_7[1] = tail_6[1];
    }
    if (tail_6[1] != tail_7[1] && (tail_7[0] - tail_6[0] >= 2)) {
        tail_7[1] = tail_6[1];
    }
    if (tail_6[0] != tail_7[0] && (tail_6[1] - tail_7[1] >= 2)) {
        tail_7[0] = tail_6[0];
    }
    if (tail_6[0] != tail_7[0] && (tail_7[1] - tail_6[1] >= 2)) {
        tail_7[0] = tail_6[0];
    }
    if (tail_6[0] - tail_7[0] >= 2) {
        tail_7[0] += 1;
    }
    if (tail_7[0] - tail_6[0] >= 2) {
        tail_7[0] -= 1;
    }
    if (tail_6[1] - tail_7[1] >= 2) {
        tail_7[1] += 1;
    }
    if (tail_7[1] - tail_6[1] >= 2) {
        tail_7[1] -= 1;
    }
    // 8
    if ((tail_7[1] - tail_8[1] >= 2) && (tail_7[0] - tail_8[0] >= 2)) {
        tail_8[0] += 1;
        tail_8[1] += 1;
    }
    if ((tail_8[1] - tail_7[1] >= 2) && (tail_8[0] - tail_7[0] >= 2)) {
        tail_8[0] -= 1;
        tail_8[1] -= 1;
    }
    if ((tail_7[0] - tail_8[0] >= 2) && (tail_8[1] - tail_7[1] >= 2)) {
        tail_8[0] += 1;
        tail_8[1] -= 1;
    }
    if ((tail_8[0] - tail_7[0] >= 2) && (tail_7[1] - tail_8[1] >= 2)) {
        tail_8[0] -= 1;
        tail_8[1] += 1;
    }

    if (tail_7[1] != tail_8[1] && (tail_7[0] - tail_8[0] >= 2)) {
        tail_8[1] = tail_7[1];
    }
    if (tail_7[1] != tail_8[1] && (tail_8[0] - tail_7[0] >= 2)) {
        tail_8[1] = tail_7[1];
    }
    if (tail_7[0] != tail_8[0] && (tail_7[1] - tail_8[1] >= 2)) {
        tail_8[0] = tail_7[0];
    }
    if (tail_7[0] != tail_8[0] && (tail_8[1] - tail_7[1] >= 2)) {
        tail_8[0] = tail_7[0];
    }
    if (tail_7[0] - tail_8[0] >= 2) {
        tail_8[0] += 1;
    }
    if (tail_8[0] - tail_7[0] >= 2) {
        tail_8[0] -= 1;
    }
    if (tail_7[1] - tail_8[1] >= 2) {
        tail_8[1] += 1;
    }
    if (tail_8[1] - tail_7[1] >= 2) {
        tail_8[1] -= 1;
    }
    // 9
    if ((tail_8[1] - tail_9[1] >= 2) && (tail_8[0] - tail_9[0] >= 2)) {
        tail_9[0] += 1;
        tail_9[1] += 1;
    }
    if ((tail_9[1] - tail_8[1] >= 2) && (tail_9[0] - tail_8[0] >= 2)) {
        tail_9[0] -= 1;
        tail_9[1] -= 1;
    }
    if ((tail_8[0] - tail_9[0] >= 2) && (tail_9[1] - tail_8[1] >= 2)) {
        tail_9[0] += 1;
        tail_9[1] -= 1;
    }
    if ((tail_9[0] - tail_8[0] >= 2) && (tail_8[1] - tail_9[1] >= 2)) {
        tail_9[0] -= 1;
        tail_9[1] += 1;
    }

    if (tail_8[1] != tail_9[1] && (tail_8[0] - tail_9[0] >= 2)) {
        tail_9[1] = tail_8[1];
    }
    if (tail_8[1] != tail_9[1] && (tail_9[0] - tail_8[0] >= 2)) {
        tail_9[1] = tail_8[1];
    }
    if (tail_8[0] != tail_9[0] && (tail_8[1] - tail_9[1] >= 2)) {
        tail_9[0] = tail_8[0];
    }
    if (tail_8[0] != tail_9[0] && (tail_9[1] - tail_8[1] >= 2)) {
        tail_9[0] = tail_8[0];
    }
    if (tail_8[0] - tail_9[0] >= 2) {
        tail_9[0] += 1;
    }
    if (tail_9[0] - tail_8[0] >= 2) {
        tail_9[0] -= 1;
    }
    if (tail_8[1] - tail_9[1] >= 2) {
        tail_9[1] += 1;
    }
    if (tail_9[1] - tail_8[1] >= 2) {
        tail_9[1] -= 1;
    }
    tailMoves.push(tail_9.slice());
}

for (let i = 0; i < tailMoves.length; i++) {
    tailMoves[i] = JSON.stringify(tailMoves[i]);
}

const unique = new Set(tailMoves);

console.log("pt 2 size:", unique.size);