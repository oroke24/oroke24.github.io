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
    
    ageDiff = f1.age - f2.age; 
    heightDiff = f1.height - f2.height;
    reachDiff = f1.reach - f2.reach;
    winDiff = f1.wins -f2.wins;
    wlRatioDiff = f1.wlRatio - f2.wlRatio;
     
    return `ageDiff = ${ageDiff}, 
            heightDiff = ${heightDiff}, 
            reachDiff = ${reachDiff}, 
            winDiff = ${winDiff}, 
            wlRatioDiff = ${wlRatioDiff}`;
}