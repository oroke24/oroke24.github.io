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
    heightDiff = f1.heightInches - f2.heightInches;
    reachDiff = f1.reach - f2.reach;
    winDiff = f1.wins -f2.wins;
    wlRatioDiff = (f1.wlRatio - f2.wlRatio).toFixed(2);
     sspm = (f1.sigStrLandPm - f2.sigStrLandPm).toFixed(2);
     sspct = (f1.sigStrLandPct - f2.sigStrLandPct).toFixed(2);
     tdavg = (f1.tdAvg- f2.tdAvg).toFixed(2);
     tdpct = (f1.tdLandPct - f2.tdLandPct).toFixed(2);
     ssabs = (f1.sigStrAbsPm - f2.sigStrAbsPm).toFixed(2);
     ssdef = (f1.sigStrDefPct - f2.sigStrDefPct).toFixed(2);
     tddef = (f1.tdDefPct - f2.tdDefPct).toFixed(2);;
     subavg = (f1.subAvg - f2.subAvg).toFixed(2);
    
    return `heightDiffInches = ${heightDiff},<br>
            reachDiff = ${reachDiff},<br>
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