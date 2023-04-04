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
let loopsLength = 0;

while (loopsLength <= distKeys.length) {
    for (let i = 0; i < distKeys.length; i++) {
        let distiKeys = Object.keys(dist[distKeys[i]]);
        for (let j = 0; j < distiKeys.length; j++) {
            let distijKeys = Object.keys(dist[distiKeys[j]]);
            for (let k = 0; k < distijKeys.length; k++) {
                if (distiKeys.includes(distijKeys[k]) == false && distijKeys[k] != distKeys[i]) {
                    dist[distKeys[i]][distijKeys[k]] = dist[distiKeys[j]][distijKeys[k]] + dist[distKeys[i]][distiKeys[j]];
                } else if (dist[distKeys[i]][distijKeys[k]] > (dist[distiKeys[j]][distijKeys[k]] + dist[distKeys[i]][distiKeys[j]]) && distijKeys[k] != distKeys[i]) {
                    dist[distKeys[i]][distijKeys[k]] = dist[distiKeys[j]][distijKeys[k]] + dist[distKeys[i]][distiKeys[j]];
                }
            } 
        }
    }
    loopsLength += 1;
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

let opt = [{'curr': 'AA', 
            'rel': 0, 
            'rel2': 0, 
            'openOrZero': zeroList.slice(), 
            'openOrZero2': zeroList.slice(), 
            'min': 0, 
            'pushed': 0}];
let tempOpt = [];
let resultList = [];
// - 1 is arrived at through experimentation. 
let halfOfNonZero = Math.floor((distKeys.length - zeroList.length) / 2) - 1;

while (opt.length > 0) {
    tempOpt = [];
    for (let i = 0; i < opt.length; i++) {
        let pushCount = 0;
        if (opt[i]['openOrZero'].includes(opt[i]['curr']) == false && (opt[i]['min'] + 1) <= 26) {
            let tempRel = opt[i]['rel'];
            tempRel += (rates[opt[i]['curr']] * (26 - (opt[i]['min'] + 1)));
            let tempList = opt[i]['openOrZero'].slice();
            tempList.push(opt[i]['curr']);
            let tempList2 = opt[i]['openOrZero2'].slice();
            tempList2.push(opt[i]['curr']);
            let tempMin = opt[i]['min'] + 1;
            tempOpt.push({
                'curr': opt[i]['curr'],
                'rel': tempRel,
                'rel2': opt[i]['rel2'],
                'openOrZero': tempList,
                'openOrZero2': tempList2,
                'min': tempMin,
                'pushed': opt[i]['pushed'] + 1
            });
            pushCount += 1;
        } else {
            for (let j = 0; j < distKeys.length; j++) {
                if (opt[i]['openOrZero'].includes(distKeys[j]) == false && (opt[i]['min'] + dist[opt[i]['curr']][distKeys[j]] + 1) <= 26) {
                    let tempRel = opt[i]['rel'];
                    let tempList = opt[i]['openOrZero'].slice();
                    let tempList2 = opt[i]['openOrZero2'].slice();
                    let tempMin = opt[i]['min'] + dist[opt[i]['curr']][distKeys[j]];
                    tempOpt.push({
                        'curr': distKeys[j],
                        'rel': tempRel,
                        'rel2': opt[i]['rel2'],
                        'openOrZero': tempList,
                        'openOrZero2': tempList2,
                        'min': tempMin,
                        'pushed': opt[i]['pushed']
                    });
                    pushCount += 1;
                } 
            }
        }
        for (let j = 0; j < tempOpt.length; j++) {
            if (tempOpt[j]['pushed'] == halfOfNonZero && tempOpt[j]['rel2'] == 0) {
                let tempRel = tempOpt[j]['rel'];
                tempOpt[j]['curr'] = 'AA';
                tempOpt[j]['rel'] = 0;
                tempOpt[j]['rel2'] = tempRel;
                tempOpt[j]['min'] = 0;
                tempOpt[j]['openOrZero2'] = zeroList.slice();
                tempOpt[j]['pushed'] = 0;
            } 
        }
        if (pushCount == 0) {
            resultList.push(opt[i]['rel'] + opt[i]['rel2']);
        }       
    }
    opt = tempOpt.slice();

    let rels = [];

    for (let i = 0; i < opt.length; i++) {
        rels.push([opt[i]['rel'] + opt[i]['rel2'], opt[i]['min']]);
    } 

    let relsMax = 0;
    let minMax = 0

    for (let i = 0; i < rels.length; i++) {
        if (rels[i][0] > relsMax) {
            relsMax = rels[i][0];
        }
    }

    for (let i = 0; i < rels.length; i++) {
        if (rels[i][0] == relsMax && rels[i][1] > minMax) {
            minMax = rels[i][1];
        }
    }
    
    let deleteList = [];
   
    for (let i = rels.length - 1; i >= 0; i--) {
        if (rels[i][0] < relsMax && rels[i][1] > minMax) {
            deleteList.push(i);
        }
    }

    for (let i = 0; i < deleteList.length; i++) {
        opt.splice(deleteList[i], 1);
    }

    console.log("opt.length:", opt.length); // Gives an indication of runtime progress
}

let result = 0

for (let i = 0; i < resultList.length; i++) {
    if (resultList[i] > result) {
        result = resultList[i];
    }
}

console.log("result:", result);