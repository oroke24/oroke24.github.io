var winner;
function compareStats(f1, f2) {
    var heightDiff;
    var reachDiff;
    var winDiff;
    var wlRatioDiff;
    var sspm; 
    var sspct;
    var tdavg;
    var tdpct;
    var ssabs;
    var ssdef;
    var tddef;
    var subavg;
    
     heightDiff = f1.heightInches - f2.heightInches??0;
     reachDiff = f1.reach - f2.reach;
     winDiff = checkSignAndLimit(f1.wins - f2.wins);
     wlRatioDiff = checkSignAndLimit(f1.wlRatio - f2.wlRatio);
     sspm = f1.sigStrLandPm - f2.sigStrLandPm;
     sspct = checkSignAndLimit(f1.sigStrLandPct - f2.sigStrLandPct);
     tdavg = f1.tdAvg- f2.tdAvg;
     tdpct = checkSignAndLimit(f1.tdLandPct - f2.tdLandPct);
     ssabs = f1.sigStrAbsPm - f2.sigStrAbsPm;
     ssdef = checkSignAndLimit(f1.sigStrDefPct - f2.sigStrDefPct);
     tddef = checkSignAndLimit(f1.tdDefPct - f2.tdDefPct);
     subavg = checkSignAndLimit(f1.subAvg - f2.subAvg);
     if (isNaN(wlRatioDiff)) wlRatioDiff = 0;
     let knockoutDiff = (knockOutOdds(f1, f2) - knockOutOdds(f2, f1)) * 5;
     let adjustedHeight = heightDiff / 2;
     let adjustedReach = (f1.reach - f2.reach)/2;
     let adjustedSsabs = checkSignAndLimit((f1.sigStrAbsPm - f2.sigStrAbsPm)*5);
     let adjustedSspm = checkSignAndLimit((f1.sigStrLandPm - f2.sigStrLandPm)*5);
     let adjustedTdavg = checkSignAndLimit((f1.tdAvg- f2.tdAvg)*10);
    
    
    let basicCompare = adjustedHeight + winDiff + wlRatioDiff + adjustedSspm + sspct + adjustedTdavg + tdpct + ssdef + tddef + subavg + knockoutDiff - adjustedSsabs;
    if(basicCompare > 0) winner = f1.name;
    else if(basicCompare < 0) winner = f2.name;
    else winner = "No Advantage";
    
    
    return `---<br><br><br>
            --------------------------------------------------------<br>
            Stat advantage goes to <strong>${winner}</strong><br>
            (differences over 10 are reduced proportionally)<br><br>

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

            <strong>Total Diff (adjusted)</strong><br>
            ${advantage(f1.name, f2.name, basicCompare)}<br>
            --------------------------------------------------------<br><br>`;
}
function checkSignAndLimit(totalDiff) {
    //console.log("FirstDiff", totalDiff);
    let newDiff = 0;
    if (totalDiff < 0) newDiff -= setValueLimit(Math.abs(totalDiff))
    else newDiff += setValueLimit(totalDiff);
    //console.log("newDiff= ", newDiff);
    return newDiff;
}
function setValueLimit(total) {
    if (total <= 10) return total;
    if (total > 100) total = 100;
    
    if (total > 10 && total <= 20) total = (total - 10)/3;
    else if (total > 20 && total <= 30) total = (total - 10)/4;
    else if (total > 30 && total <= 40) total = (total - 10)/5;
    else if (total > 40 && total <= 50) total = (total - 10)/6;
    else if (total > 50) total = (total - 10)/7;
    return Math.round(total + 10);
}