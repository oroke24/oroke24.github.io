function compareStats(f1, f2) {
    var winner;
    var heightDiff;
    var reachDiff;
    var winDiff;
    var wlRatioDiff;
    var ageDiff;
    var sspm; 
    var sspct;
    var tdavg;
    var tdpct;
    var ssabs;
    var ssdef;
    var tddef;
    var subavg;
    var extraDamage;
    var takeDownsLanded;
    var timesTakenDown;
    
    ageDiff = f1.age - f2.age; 
    heightDiff = f1.height - f2.height;
    reachDiff = f1.reach - f2.reach;
    winDiff = f1.wins -f2.wins;
    wlRatioDiff = f1.wlRatio - f2.wlRatio;
     sspm = f1.sigStrLandPm - f2.sigStrLandPm;
     sspct = f1.sigStrLandPct - f2.sigStrLandPct;
     tdavg = f1.tdAvg- f2.tdAvg;
     tdpct = f1.tdLandPct - f2.tdLandPct;
     ssabs = f1.sigStrAbsPm - f2.sigStrAbsPm;
     ssdef = f1.sigStrDefPct - f2.sigStrDefPct;
     tddef = f1.tdDefPct - f2.tdDefPct;
     subavg = f1.subAvg - f2.subAvg;
    
    return `ageDiff = ${ageDiff},\n
            heightDiff = ${heightDiff},\n
            reachDiff = ${reachDiff},\n
            winDiff = ${winDiff},\n
            wlRatioDiff = ${wlRatioDiff},\n
            sspmDiff = ${sspm},\n
            sspctDiff = ${sspct},\n
            tdavg = ${tdavg},\n
            tdpct = ${tdpct},\n 
            ssabsDiff = ${ssabs},\n
            ssdefDiff = ${ssdef},\n
            tddefDiff = ${tddef},\n
            subavgdiff = ${subavg}\n`;
}