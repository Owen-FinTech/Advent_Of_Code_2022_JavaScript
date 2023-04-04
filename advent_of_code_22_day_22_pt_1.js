let inputString1 = ``; // Insert first part of puzzle input between the backticks 

let inputString2 = ``; // Insert second part of puzzle input between the backticks

let map = inputString1.split('\n');

for (let i = 1; i < 100; i++) {
    map[i] = '                                                  ' + map[i];
}

for (let i = 0; i < map.length; i++) {
    map[i] = map[i].split('');
}

let moves = [];
let start = 0;
let end = 0;

for (let i = 0; i < inputString2.length; i++) {
    if (inputString2[i] == 'L' || inputString2[i] == 'R') {
        if (start == 0) {
            end = i;
            moves.push('R' + inputString2.slice(start, end));
            start = i;
        } else {
            end = i;
            moves.push(inputString2.slice(start, end));
            start = i;
        }
    }
    if (i == inputString2.length - 1) {
        moves.push(inputString2.slice(start));
    }
}

for (let i = 0; i < moves.length; i++) {
    moves[i] = [moves[i].slice(0, 1), Number(moves[i].slice(1))];
}

row = 0;
col = 0;
facing = 'N'

for (let i = 0; i < map[0].length; i++) {
    if (map[0][i] == '.' || map[0][i] == '#') {
        col = i;
        break;
    }
}

let spaces = [];

for (let i = 0; i < map.length; i++) {
    let count = 0;
    for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] == ' ') {
            count += 1;
        } else {
            break;
        }
    }
    spaces.push(count);
}

let maxRowLength = 0

for (let i = 0; i < map.length; i++) {
    if (map[i].length > maxRowLength) {
        maxRowLength = map[i].length;
    }
}

for (let i = 0; i < map.length; i++) {
    while (map[i].length < maxRowLength) {
        map[i].push(' ');
    }
}

for (let i = 0; i < moves.length; i++) {
    if (facing == 'N' && moves[i][0] == 'L') {
        facing = 'W';
    } else if (facing == 'N' && moves[i][0] == 'R') {
        facing = 'E';
    } else if (facing == 'E' && moves[i][0] == 'L') {
        facing = 'N';
    } else if (facing == 'E' && moves[i][0] == 'R') {
        facing = 'S';
    } else if (facing == 'S' && moves[i][0] == 'L') {
        facing = 'E';
    } else if (facing == 'S' && moves[i][0] == 'R') {
        facing = 'W';
    } else if (facing == 'W' && moves[i][0] == 'L') {
        facing = 'S';
    } else if (facing == 'W' && moves[i][0] == 'R') {
        facing = 'N';
    }

    for (let j = 0; j < moves[i][1]; j++) {
        if (facing == 'E') {
            if (map[row][(col + 1) % map[row].length] == '.') {
                col = (col + 1) % map[row].length;
            } else if (map[row][(col + 1) % map[row].length] == ' ') {
                for (let k = 1; k < map.length + 1; k++) {
                    if (map[row][(col + 1 + k) % map[row].length] == '.') {
                        col = (col + 1 + k) % map[row].length;
                        break;
                    } else if (map[row][(col + 1 + k) % map[row].length] == '#') {
                        break;
                    }
                }
            }
        }
        if (facing == 'W') {
            if (map[row][(col - 1 + map[row].length) % map[row].length] == '.') {
                col = (col - 1 + map[row].length) % map[row].length;
            } else if (map[row][(col - 1 + map[row].length) % map[row].length] == ' ') {
                for (let k = map[row].length - 1; k > 0; k--) {
                    if (map[row][(col - 1 + k) % map[row].length] == '.') {
                        col = (col - 1 + k) % map[row].length
                        break;
                    } else if (map[row][(col - 1 + k) % map[row].length] == '#') {
                        break;
                    }
                }
            }
        }
        if (facing == 'N') {
            if (map[(row - 1 + map.length) % map.length][col] == '.') {
                row = (row - 1 + map.length) % map.length;
            } else if (map[(row - 1 + map.length) % map.length][col] == ' ') {
                for (let k = map.length - 1; k > 0; k--) {
                    if (map[(row - 1 + k) % map.length][col] == '.') {
                        row = (row - 1 + k) % map.length;
                        break;
                    } else if (map[(row - 1 + k) % map.length][col] == '#') {
                        break;
                    }
                }
            }
        }
        if (facing == 'S') {
            if (map[(row + 1) % map.length][col] == '.') {
                row = (row + 1) % map.length;
            } else if (map[(row + 1) % map.length][col] == ' ') {
                for (let k = 1; k < map.length + 1; k++) {
                    if (map[(row + 1 + k) % map.length][col] == '.') {
                        row = (row + 1 + k) % map.length;
                        break;
                    } else if (map[(row + 1 + k) % map.length][col] == '#') {
                        break;
                    }
                }
            }
        }
    }
}

let facingScore = 0

if (facing == 'E') {
    facingScore = 0;
} else if (facing == 'S') {
    facingScore = 1;
} else if (facing == 'W') {
    facingScore = 2;
} else {
    facingScore = 3;
}

let result = (1000 * (row + 1)) + (4 * (col + 1)) + facingScore;

console.log("result:", result);
