function compareStats(f1, f2) {
    var winner;
    var heightDiff;
    var reachDiff;
    var winDiff;
    var wlRatioDiff;
    var ageDiff;
    var extraDamage;
    var takeDownsLanded;
    var timesTakenDown;
    
    f1.wins-f2.wins = ageDiff; 
    f1.height - f2.height = heightDiff;
    f1.reach - f2.reach = reachDiff;
    f1.wins -f2.wins = winDiff;
    f1.wlRatio - f2.wlRatio = wlRatioDiff;
    
    return `ageDiff = ${ageDiff}, 
            heightDiff = ${heightDiff}, 
            reachDiff = ${reachDiff}, 
            winDiff = ${winDiff}, 
            wlRatioDiff = ${wlRatioDiff}`;
}