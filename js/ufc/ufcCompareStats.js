var winner;
function compareStats(f1, f2) {
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
     winDiff = f1.wins - f2.wins;
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
    
    
    return `---<br><br><br>
            --------------------------------------------------------<br>
            Advantage goes to <strong>${winner}</strong><br><br>

            <strong>Misc</strong><br>
            height diff(in) = ${advantage(f1.name, f2.name, heightDiff)},<br>
            reach diff(in) = ${advantage(f1.name, f2.name, reachDiff)},<br>
            win diff = ${advantage(f1.name, f2.name, winDiff)},<br>
            wlRatio diff = ${advantage(f1.name, f2.name, wlRatioDiff)},<br><br>

            <strong>Stand-up</strong><br>
            strikes landed PM diff = ${advantage(f1.name, f2.name, sspm)},<br>
            accuracy diff (%)= ${advantage(f1.name, f2.name, sspct)},<br>
            strikes absorbed PM diff= ${advantage(f1.name, f2.name, ssabs)},<br>
            blocked diff (%)= ${advantage(f1.name, f2.name, ssdef)},<br><br>

            <strong>Ground game</strong><br>
            avg takedown diff = ${advantage(f1.name, f2.name, tdavg)},<br>
            accuracy diff (%) = ${advantage(f1.name, f2.name, tdpct)},<br>
            takedown defense diff (%) = ${advantage(f1.name, f2.name, tddef)},<br>
            submission attempt diff = ${advantage(f1.name, f2.name, subavg)}<br><br>

            <strong>Total Diff</strong><br>
            ${advantage(f1.name, f2.name, basicCompare)}<br>
            --------------------------------------------------------<br><br>`;
}