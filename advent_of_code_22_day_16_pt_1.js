let inputString = ``; // Insert your puzzle input between the backticks

let input = inputString.split('\n');

for (let i = 0; i < input.length; i++) {
    input[i] = input[i].split(' '); 
}

let tunnels = [];

for (let i = 0; i < input.length; i++) {
    tunnels.push([]);
}

for (let i = 0; i < input.length; i++) {
    tunnels[i].push(input[i][1]);
    tunnels[i].push(input[i][4]);
    for (let j = 9; j < input[i].length; j++) {
        tunnels[i].push(input[i][j]);
    }
}

for (let i = 0; i < tunnels.length; i++) {
    tunnels[i][1] = Number(tunnels[i][1].substring(5, tunnels[i][1].length - 1));
}

for (let i = 0; i < tunnels.length; i++) {
    for (let j = 2; j < tunnels[i].length - 1; j++) {
        tunnels[i][j] = tunnels[i][j].replace(',', '');
    }
}

let rates = {};

for (let i = 0; i < tunnels.length; i++) {
    rates[tunnels[i][0]] = tunnels[i][1];
}

let adj = {};

for (let i = 0; i < tunnels.length; i++) {
    adj[tunnels[i][0]] = tunnels[i].slice(2);
}

let dist = {};

for (let i = 0; i < tunnels.length; i++) {
    dist[tunnels[i][0]] = {};
}


for (let i = 0; i < tunnels.length; i++) {
    for (let j = 2; j < tunnels[i].length; j++) {
        dist[tunnels[i][0]][tunnels[i][j]] = 1; 
    }
}

let distKeys = Object.keys(dist);
let resultList = [];
let totalLength = 0;

while (totalLength <= 2) {
    for (let i = 0; i < distKeys.length; i++) {
        let distiKeys = Object.keys(dist[distKeys[i]]);
        for (let j = 0; j < distiKeys.length; j++) {
            let distijKeys = Object.keys(dist[distiKeys[j]]);
            for (let k = 0; k < distijKeys.length; k++) {
                if (distiKeys.includes(distijKeys[k]) == false && distijKeys[k] != distKeys[i]) {
                    dist[distKeys[i]][distijKeys[k]] = dist[distiKeys[j]][distijKeys[k]] + dist[distKeys[i]][distiKeys[j]];
                } 
            } 
        }
    }
    totalLength += 1;
}

for (let i = 0; i < distKeys.length; i++) {
    dist[distKeys[i]][distKeys[i]] = 0;
}

let zeroList = [];

for (let i = 0; i < distKeys.length; i++) {
    if (rates[distKeys[i]] == 0) {
        zeroList.push(distKeys[i]);
    }
}

let opt = [{'curr': 'AA', 'rel': 0, 'openOrZero': zeroList.slice(), 'min': 0}];
let tempOpt = []

while (opt.length > 0) {
    tempOpt = [];
    for (let i = 0; i < opt.length; i++) {
        let pushCount = 0;
        if (opt[i]['openOrZero'].includes(opt[i]['curr']) == false) {
            let tempRel = opt[i]['rel'];
            for (let j = 0; j < opt[i]['openOrZero'].length; j++) {
                tempRel += rates[opt[i]['openOrZero'][j]];
            }
            let tempList = opt[i]['openOrZero'].slice();
            tempList.push(opt[i]['curr']);
            let tempMin = opt[i]['min'] + 1;
            tempOpt.push({
                'curr': opt[i]['curr'],
                'rel': tempRel,
                'openOrZero': tempList,
                'min': tempMin
            });
            pushCount += 1;
        } else {
            for (let j = 0; j < distKeys.length; j++) {
                if (opt[i]['openOrZero'].includes(distKeys[j]) == false && (opt[i]['min'] + dist[opt[i]['curr']][distKeys[j]]) <= 30) {
                    let tempRel = opt[i]['rel'];
                    for (let k = 0; k < opt[i]['openOrZero'].length; k++) {
                        tempRel += (rates[opt[i]['openOrZero'][k]] * dist[opt[i]['curr']][distKeys[j]]);
                    }
                    let tempList = opt[i]['openOrZero'].slice();
                    let tempMin = opt[i]['min'] + dist[opt[i]['curr']][distKeys[j]];
                    tempOpt.push({
                        'curr': distKeys[j],
                        'rel': tempRel,
                        'openOrZero': tempList,
                        'min': tempMin
                    });
                    pushCount += 1;
                } 
            }
        }
        if (pushCount == 0) {
            let tempRel = opt[i]['rel'];
            for (let j = 0; j < opt[i]['openOrZero'].length; j++) {
                tempRel += (rates[opt[i]['openOrZero'][j]] * (30 - opt[i]['min']));
            }
            resultList.push(tempRel);
        }         
    }
    opt = tempOpt.slice();
}

let result = Math.max(...resultList);

console.log("result:", result);

