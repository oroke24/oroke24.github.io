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
    winDiff = f1.wins -f2.wins);
    wlRatioDiff = f1.wlRatio - f2.wlRatio;
     sspm = f1.sigStrLandPm - f2.sigStrLandPm;
     sspct = f1.sigStrLandPct - f2.sigStrLandPct;
     tdavg = f1.tdAvg- f2.tdAvg;
     tdpct = f1.tdLandPct - f2.tdLandPct;
     ssabs = f1.sigStrAbsPm - f2.sigStrAbsPm;
     ssdef = f1.sigStrDefPct - f2.sigStrDefPct;
     tddef = f1.tdDefPct - f2.tdDefPct;
     subavg = f1.subAvg - f2.subAvg;
    
    
     let basicCompare = heightDiff + winDiff + sspm + sspct + tdavg + tdpct + ssabs + ssdef + tddef + subavg;
    if(basicCompare > 0) winner = f1.name;
    else if(basicCompare < 0) winner = f2.name;
    else winner = "No Advantage";
    let absBC = Math.abs(basicCompare).toFixed(2);
    
    
    return `<br><br><br> <strong>Advantage goes to ${winner}</strong> Basic Comparison = ${absBC}<br><br>heightDiff = ${heightDiff.toFixed(2)} in.,<br>
            reachDiff = ${reachDiff.toFixed(2)} in.,<br>
            winDiff = ${winDiff.toFixed(2)},<br>
            wlRatioDiff = ${wlRatioDiff.toFixed(2)},<br>
            strikesLandedPerMin = ${sspm.toFixed(2)},<br>
            percentage landed = ${sspct.toFixed(2)}%,<br>
            Avg takedowns = ${tdavg.toFixed(2)},<br>
            ${tdpct.toFixed(2)}% of total,<br> <br>
            strikes absorbed = ${ssabs.toFixed(2)},<br>
            percentage blocked = ${ssdef.toFixed(2)}%,<br>
            ${tddef.toFixed(2)}% takedowns defended,<br>
            avg submissions = ${subavg.toFixed(2)}<br>`;
}