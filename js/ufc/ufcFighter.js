class Fighter {
    constructor(name, height, weight, reach, age, wins, losses, draws, wlRatio, sigStrLandPm, sigStrLandPct, sigStrAbsPm, sigStrDefPct, tdAvg, tdLandPct, tdDefPct, subAvg, v) {
        this.name = name;
        this.height = height;
        this.heightInches = getInches(height);
        this.weight = weight;
        this.reach = parseInt(reach.substring(0,2));
        this.age = age;
        this.wins = wins;
        this.losses = losses;
        this.draws = draws;
        this.wlRatio = wlRatio;
        this.sigStrLandPm = sigStrLandPm;
        this.sigStrLandPct = (sigStrLandPct * 100);
        this.sigStrAbsPm = sigStrAbsPm;
        this.sigStrDefPct = (sigStrDefPct * 100);
        this.tdAvg = tdAvg;
        this.tdLandPct = (tdLandPct * 100);
        this.tdDefPct = (tdDefPct * 100);
        this.subAvg = subAvg;
    }
}
function getInches(height){
    var feet = parseInt(height[0]) * 12;
    var inches;
    if(height[4] == '"') inches = parseInt(height[3]);
    else inches = parseInt(height.substring(3,5));
    
    return feet + inches;
}

function listifyFighter(fighter) {
    let listItem = document.createElement('ul');
    let winLossRatio = document.createElement('li'); 
    let heightWeightReach = document.createElement('li');
    let age = document.createElement('li');
    let sigStr = document.createElement('li');
    let takedowns = document.createElement('li');
    let dmgAndDef = document.createElement('li');
    let subs = document.createElement('li');
    
    listItem.textContent = fighter.name;
    winLossRatio.textContent = `${fighter.wins}-${fighter.losses}-${fighter.draws}, ${fighter.wlRatio} W/L`;
    heightWeightReach.textContent = `Weight: ${fighter.weight}, Height: ${fighter.height}, Reach: ${fighter.reach}`;
    age.textContent = `Born on ${fighter.age}`;
    sigStr.textContent = `${fighter.sigStrLandPm} Sig Strikes per minute (${fighter.sigStrLandPct}% of total thrown)`;
    takedowns.textContent = `${fighter.tdAvg} avg takedowns (${fighter.tdLandPct}% of total attempted)`
    dmgAndDef.textContent = `${fighter.sigStrAbsPm} Absorbed sig strikes per minute, (${fighter.sigStrDefPct}% Defended)`;
    subs.textContent = `${fighter.subAvg} Sub attempt avg, ${fighter.tdDefPct}% Opponent takedowns defended`;
    listItem.appendChild(winLossRatio);
    listItem.appendChild(heightWeightReach);
    listItem.appendChild(age);
    listItem.appendChild(sigStr);
    listItem.appendChild(takedowns);
    listItem.appendChild(dmgAndDef);
    listItem.appendChild(subs);
    return listItem;
}