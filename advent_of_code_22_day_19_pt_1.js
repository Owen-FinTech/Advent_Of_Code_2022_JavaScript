let inputString = ``; // Insert your puzzle input between the backticks

let input = inputString.split('\n');

for (let i = 0; i < input.length; i++) {
    input[i] = input[i].split(' ');
}

for (let i = 0; i < input.length; i++) {
    input[i] = [Number(input[i][1].replace(':', '')), Number(input[i][6]), Number(input[i][12]), Number(input[i][18]), Number(input[i][21]), Number(input[i][27]), Number(input[i][30])];
}

function factory(blueprint) {
    let branches = [{'oreRobots': 1, 'clayRobots': 0, 'obsidianRobots': 0, 'geodeRobots': 0, 'ore': 0, 'clay': 0, 'obsidian': 0, 'geodes': 0, 'obsidianSkipped': false, 'claySkipped': false, 'oreSkipped': false}];
    let minute = 0;
    let geodeMax = 0;
    while (minute < 24) {
        let allTemp = [];    
        for (let i = 0; i < branches.length; i++) {
            let tempList = [];
            let obsidianPushed = false;
            let clayPushed = false; 
            let orePushed = false;
            if (branches[i]['ore'] >= input[blueprint - 1][5] && branches[i]['obsidian'] >= input[blueprint - 1][6]) {
                let temp = JSON.parse(JSON.stringify(branches[i]));
                temp['ore'] -= input[blueprint - 1][5];
                temp['obsidian'] -= input[blueprint - 1][6];
                temp['geodeRobots'] += 1;
                temp['obsidianSkipped'] = false;
                temp['claySkipped'] = false;
                temp['oreSkipped'] = false;
                tempList.push(temp);
            } else {
                if (branches[i]['ore'] >= input[blueprint - 1][3] && branches[i]['clay'] >= input[blueprint - 1][4] && branches[i]['obsidianRobots'] < input[blueprint - 1][6]) {
                    let temp = JSON.parse(JSON.stringify(branches[i]));
                    temp['ore'] -= input[blueprint - 1][3];
                    temp['clay'] -= input[blueprint - 1][4];
                    temp['obsidianRobots'] += 1;
                    temp['obsidianSkipped'] = false;
                    temp['claySkipped'] = false;
                    temp['oreSkipped'] = false;
                    tempList.push(temp);
                    obsidianPushed = true;
                } 
                if (branches[i]['ore'] >= input[blueprint - 1][2] && branches[i]['clayRobots'] < input[blueprint - 1][4]) {
                    let temp = JSON.parse(JSON.stringify(branches[i]));
                    temp['ore'] -= input[blueprint - 1][2];
                    temp['clayRobots'] += 1;
                    if (obsidianPushed == true) {
                        temp['obsidianSkipped'] = true;
                    } else {
                        temp['obsidianSkipped'] = false;
                    }
                    temp['claySkipped'] = false;
                    temp['oreSkipped'] = false;
                    tempList.push(temp);
                    clayPushed = true;
                } 
                if (branches[i]['ore'] >= input[blueprint - 1][1] && (branches[i]['oreRobots'] < input[blueprint - 1][5] || branches[i]['oreRobots'] < input[blueprint - 1][3] || branches[i]['oreRobots'] < input[blueprint - 1][2] || branches[i]['oreRobots'] < input[blueprint - 1][1])) {
                    let temp = JSON.parse(JSON.stringify(branches[i]));
                    temp['ore'] -= input[blueprint - 1][1];
                    temp['oreRobots'] += 1;
                    if (obsidianPushed == true) {
                        temp['obsidianSkipped'] = true;
                    } else {
                        temp['obsidianSkipped'] = false;
                    }
                    if (clayPushed == true) {
                        temp['claySkipped'] = true;
                    } else {
                        temp['claySkipped'] = false;
                    }
                    temp['oreSkipped'] = false;
                    tempList.push(temp);
                    orePushed = true;
                }
            }
            branches[i]['ore'] += branches[i]['oreRobots'];
            branches[i]['clay'] += branches[i]['clayRobots'];
            branches[i]['obsidian'] += branches[i]['obsidianRobots'];
            branches[i]['geodes'] += branches[i]['geodeRobots'];
            if (obsidianPushed == true) {
                branches[i]['obsidianSkipped'] = true;
            } else {
                branches[i]['obsidianSkipped'] = false;
            }
            if (clayPushed == true) {
                branches[i]['claySkipped'] = true;
            } else {
                branches[i]['claySkipped'] = false;
            }
            if (orePushed == true) {
                branches[i]['oreSkipped'] = true;
            } else {
                branches[i]['oreSkipped'] = false;
            }
            for (let j = 0; j < tempList.length; j++) {
                tempList[j]['ore'] += branches[i]['oreRobots'];
                tempList[j]['clay'] += branches[i]['clayRobots'];
                tempList[j]['obsidian'] += branches[i]['obsidianRobots'];
                tempList[j]['geodes'] += branches[i]['geodeRobots'];
                allTemp.push(tempList[j]);
            }
        }
        for (let k = 0; k < allTemp.length; k++) {
            branches.push(allTemp[k]);
        }
        for (let l = 0; l < branches.length; l++) {
            if (branches[l]["geodes"] > geodeMax) {
                geodeMax = branches[l]["geodes"];
            }
        }
        let deleteList = [];
        for (let m = branches.length - 1; m >= 0; m--) {
            if (branches[m]['geodes'] != geodeMax || (branches[m]['oreSkipped'] == true && branches[m]['clayRobots'] == 0) || (branches[m]['oreSkipped'] == true && branches[m]['claySkipped'] == true && branches[m]['obsidianRobots'] == 0)) {
                deleteList.push(m)
            }
        }
        for (let n = 0; n < deleteList.length; n++) {
            branches.splice(deleteList[n], 1);
        }
        minute += 1;
        if (minute == 24) break;
    }
    let quality = blueprint * geodeMax;
    return quality;
}

let result = 0;

for (let i = 1; i < input.length + 1; i++) {
    result += factory(i);
    console.log("factory:", i); // Gives an indication of runtime progress
} 

console.log("result:", result);
