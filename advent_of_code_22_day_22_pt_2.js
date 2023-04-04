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

let maxRowLength = 150

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
            } else if (map[row][(col + 1) % map[row].length] == ' ' && row >= 0 && row <= 49) {
                if (map[(49 - row) + 100][99] == '.') {
                    row = (49 - row) + 100;
                    col = 99;
                    facing = 'W'
                }
            } else if (map[row][(col + 1) % map[row].length] == ' ' && row >= 50 && row <= 99) {
                if (map[49][(row - 50) + 100] == '.') {
                    col = (row - 50) + 100;
                    row = 49;
                    facing = 'N'
                }
            } else if (map[row][(col + 1) % map[row].length] == ' ' && row >= 100 && row <= 149) {
                if (map[49 - (row - 100)][149] == '.') {
                    row = 49 - (row - 100);
                    col = 149;
                    facing = 'W'
                }
            } else if (map[row][(col + 1) % map[row].length] == ' ' && row >= 150 && row <= 199) {
                if (map[149][(row - 150) + 50] == '.') {
                    col = (row - 150) + 50;
                    row = 149;
                    facing = 'N'
                }
            }
        } else if (facing == 'W') {
            if (map[row][(col - 1 + map[row].length) % map[row].length] == '.') {
                col = (col - 1 + map[row].length) % map[row].length;
            } else if (map[row][(col - 1 + map[row].length) % map[row].length] == ' ' && row >= 0 && row <= 49) {
                if (map[(49 - row) + 100][0] == '.') {
                    row = (49 - row) + 100;
                    col = 0;
                    facing = 'E'
                }
            } else if (map[row][(col - 1 + map[row].length) % map[row].length] == ' ' && row >= 50 && row <= 99) {
                if (map[100][row - 50] == '.') {
                    col = row - 50;
                    row = 100;
                    facing = 'S'
                }
            } else if (map[row][(col - 1 + map[row].length) % map[row].length] == ' ' && row >= 100 && row <= 149) {
                if (map[49 - (row - 100)][50] == '.') {
                    row = 49 - (row - 100);
                    col = 50;
                    facing = 'E'
                }
            } else if (map[row][(col - 1 + map[row].length) % map[row].length] == ' ' && row >= 150 && row <= 199) {
                if (map[0][(row - 150) + 50] == '.') {
                    col = (row - 150) + 50;
                    row = 0;
                    facing = 'S'
                }
            }
        } else if (facing == 'N') {
            if (map[(row - 1 + map.length) % map.length][col] == '.') {
                row = (row - 1 + map.length) % map.length;
            } else if (map[(row - 1 + map.length) % map.length][col] == ' ' && col >= 0 && col <= 49) {
                if (map[col + 50][50] == '.') {
                    row = col + 50;
                    col = 50;
                    facing = 'E';
                }  
            } else if (map[(row - 1 + map.length) % map.length][col] == ' ' && col >= 50 && col <= 99) {
                if (map[150 + (col - 50)][0] == '.') {
                    row = 150 + (col - 50);
                    col = 0;
                    facing = 'E';
                } 
            } else if (map[(row - 1 + map.length) % map.length][col] == ' ' && col >= 100 && col <= 149) {
                if (map[199][col - 100] == '.') {
                    row = 199;
                    col = col - 100;
                    facing = 'N';
                }
            }
        } else if (facing == 'S') {
            if (map[(row + 1) % map.length][col] == '.') {
                row = (row + 1) % map.length;
            } else if (map[(row + 1) % map.length][col] == ' ' && col >= 0 && col <= 49) {
                if (map[0][col + 100] == '.') {
                    row = 0;
                    col = col + 100;
                    facing = 'S';
                }  
            } else if (map[(row + 1) % map.length][col] == ' ' && col >= 50 && col <= 99) {
                if (map[150 + (col - 50)][49] == '.') {
                    row = 150 + (col - 50);
                    col = 49;
                    facing = 'W';
                } 
            } else if (map[(row + 1) % map.length][col] == ' ' && col >= 100 && col <= 149) {
                if (map[(col - 100) + 50][99] == '.') {
                    row = (col - 100) + 50;
                    col = 99;
                    facing = 'W';
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


