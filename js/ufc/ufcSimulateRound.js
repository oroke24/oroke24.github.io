function simulateRound(f1, f2) {
    return `What a <strong>round</strong> might look like<br>
            (assuming all weights and genders equal)<br><br>
            ---<br>
            <strong>Stand-up</strong><br>
            ${printStandUp(f1, f2)}<br>
            ${printStandUp(f2, f1)}
            ---<br>
            <strong>Ground game</strong><br>
            ${printGroundGame(f1,f2)}<br>
            ${printGroundGame(f2,f1)}
            ---<br>
           `
} 
function takedownFatigue(f1, f2, total) {
    let timesTakenDown = totalTakedowns(f2,f1);
    let takedowns = totalTakedowns(f1, f2);
    for (let i = 0; i < timesTakenDown; i++) {
        total = Math.round(total * .65);
    }
    for (let i = 0; i < takedowns; i++) {
        total = Math.round(total * .85);
    }
    return total;
}
function totalPunchesThrown(f1, f2) {
    let total = ((f1.sigStrLandPm) / (f1.sigStrLandPct / 100)) * 5;
    //console.log("total thrown before fatigue: ", total);
    total = takedownFatigue(f1, f2, total);
    //console.log("total thrown after fatigue: ", total);
    return total;
}
function totalPunchesAbsorbed(f1, f2) {
    let total = Math.round(f1.sigStrAbsPm * 5);
    //console.log("total absorbed before fatigue: ", total);
    total = takedownFatigue(f2, f1, total);
    //console.log("total absorbed after fatigue: ", total);
    return total;
}
function totalPunchesLanded(f1, f2) {
    let total = Math.round((totalPunchesThrown(f1, f2) + totalPunchesAbsorbed(f2, f1)) / 2)
    //console.log(f1.name, " punches landed: ", total);
    return total;
}
function roundToHalf(num) { return Math.round(num * 2) / 2; }
function blockedPunches(f1, f2) { return Math.round((f2.sigStrDefPct / 100) * totalPunchesLanded(f1, f2)); }
function totalTakedownAttempts(f) { return (f.tdAvg / 3) / (f.tdLandPct / 100); }
function takedownNotDefendedPct(f) { return 1 - (f.tdDefPct / 100); }
function splitDiff(a, b) { return (a + b) / 2; }
function knockOutOdds(f1, f2) {
    let knockOutBoost = 0;
    knockOutBoost += (f1.sigStrLandPct - f2.sigStrLandPct) / 5;
    knockOutBoost += (f2.sigStrAbsPm - f2.sigStrAbsPm) / 3
    if (knockOutBoost < 0) knockOutBoost = 0;
    //console.log(f1.name, " knockout boost = ", knockOutBoost);
    return Math.ceil(knockOutBoost);
}
function totalTakedowns(f1, f2) {
    let f1TotalTakedownAttempts = totalTakedownAttempts(f1);
    let f2TakedownNotDefendedPct = takedownNotDefendedPct(f2);
    let splitTheDiff = splitDiff((f1.tdLandPct/100),f2TakedownNotDefendedPct);
    let totalTakedownsCompleted = Math.round(f1TotalTakedownAttempts * splitTheDiff);
    return totalTakedownsCompleted;
}
function printStandUp(f1, f2) {
    let f1LandedStrikes = Math.round(totalPunchesLanded(f1, f2));
    let f1CriticalStrikes = Math.round(f1LandedStrikes - blockedPunches(f1, f2));
    let f1SuperCriticalStrikes = (f1CriticalStrikes / 6) + knockOutOdds(f1, f2);
    return`
            ${f1.name} throws ${totalPunchesThrown(f1,f2).toFixed(0)} total strikes.<br>
            ${f1LandedStrikes.toFixed(0)} land,<br>
            ${f1CriticalStrikes.toFixed(0)} are unblocked (critical strikes),<br>
            ${Math.ceil(f1SuperCriticalStrikes.toFixed(1))} with KO potential!<br>
            `
}
function printGroundGame(f1, f2) {
    let f1TotalTakedownAttempts = totalTakedownAttempts(f1);
    let totalTakedownsCompleted = totalTakedowns(f1,f2);
    let f1TotalSubmissionAttempts = 0;
    let f2TotalSubmissionAttempts = 0;
    let bjj = "";

    if (isNaN(f1TotalTakedownAttempts)) f1TotalTakedownAttempts = 0;
        
    if (totalTakedownsCompleted >= 1) {
        f1TotalSubmissionAttempts = Math.ceil(f1.subAvg) / 3;
        f2TotalSubmissionAttempts = Math.ceil(f2.subAvg) / 3;
        bjj = `
        ${f1.name} attempts ${roundToHalf(f1TotalSubmissionAttempts).toFixed(0)} submission(s).<br>
        ${f2.name} attempts ${roundToHalf(f2TotalSubmissionAttempts).toFixed(0)} submission(s).<br>
        `
    }
    return `
        ${f1.name} takes ${f1TotalTakedownAttempts.toFixed(0)} shot(s)<br>
        completing ${totalTakedownsCompleted.toFixed(0)} takedown(s)<br>
        ${bjj}
        `
}