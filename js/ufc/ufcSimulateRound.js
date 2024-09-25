function simulateRound(f1, f2) {
    return `What a round might look like<br>
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
function totalPunchesThrown(f1, f2) {

    let total = Math.round((f1.sigStrLandPm * 5) / (f1.sigStrLandPct / 100))
    let timesTakenDown = totalTakedowns(f2,f1);
    let takedowns = totalTakedowns(f1, f2);
    for (let i = 0; i < timesTakenDown; i++) {
        total = Math.round(total * .75);
    }
    for (let i = 0; i < takedowns; i++) {
        total = Math.round(total * .85);
    }
    return total;
}
function totalPunchesAbsorbed(f) { return Math.round(f.sigStrAbsPm * 5)}
function totalPunchesLanded(f1, f2) {return Math.round((totalPunchesThrown(f1, f2)+totalPunchesAbsorbed(f2))/2)}
function roundToHalf(num) { return Math.round(num * 2) / 2; }
function blockedPunches(f1, f2) { return Math.round((f2.sigStrDefPct / 100) * totalPunchesLanded(f1, f2)); }
function totalTakedownAttempts(f) { return (f.tdAvg / 3) / (f.tdLandPct / 100); }
function takedownNotDefendedPct(f) { return 1 - (f.tdDefPct / 100); }
function splitDiff(a, b) { return (a + b) / 2; }
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
    let f1SuperCriticalStrikes = (f1CriticalStrikes / 6);
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
    if (totalTakedownsCompleted >= 1) {
        f1TotalSubmissionAttempts = Math.round(f1.subAvg) / 3;
        f2TotalSubmissionAttempts = Math.round(f2.subAvg) / 3;
        bjj = `
        ${f1.name} attempts ${roundToHalf(f1TotalSubmissionAttempts).toFixed(1)} submissions.<br>
        ${f2.name} attempts ${roundToHalf(f2TotalSubmissionAttempts).toFixed(1)} submissions.<br>
        `
    }
    return `
        ${f1.name} takes ${f1TotalTakedownAttempts.toFixed(0)} shots<br>
        completing ${totalTakedownsCompleted.toFixed(0)} takedown(s)<br>
        ${bjj}
        `
}