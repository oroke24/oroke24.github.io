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
function totalPunchesThrown(f) {return Math.round((f.sigStrLandPm * 5) / (f.sigStrLandPct/100))}
function totalPunchesAbsorbed(f) { return Math.round(f.sigStrAbsPm * 5)}
function totalPunchesLanded(f1, f2) {return Math.round((totalPunchesThrown(f1)+totalPunchesAbsorbed(f2))/2)}
function totalTakedownsLanded(f1, f2) {
    return 
}
function roundToHalf(num) {return Math.round(num * 2)/2 }
function blockedPunches(f1, f2) {return Math.round((f2.sigStrDefPct/100) * totalPunchesLanded(f1, f2)) }
function printStandUp(f1, f2) {
    let f1LandedStrikes = Math.round(totalPunchesLanded(f1, f2));
    let f1CriticalStrikes = Math.round(f1LandedStrikes - blockedPunches(f1, f2));
    let f1SuperCriticalStrikes = (f1CriticalStrikes / 20);
    return`
            ${f1.name} throws ${totalPunchesThrown(f1).toFixed(0)} total strikes.<br>
            ${f1LandedStrikes.toFixed(0)} land,<br>
            ${f1CriticalStrikes.toFixed(0)} are unblocked (critical strikes),<br>
            ${Math.ceil(f1SuperCriticalStrikes.toFixed(1))} with KO potential!<br>
            `
}
function printGroundGame(f1, f2) {
    console.log("f1.tdAvg/3=", f1.tdAvg / 3);
    let f1TotalTakedownAttemps = (f1.tdAvg / 3) / (f1.tdLandPct / 100);
    let f2TakedownNotDefendedPct = 1 - (f2.tdDefPct / 100);
    let splitTheDiff = (((f1.tdLandPct / 100) + f2TakedownNotDefendedPct) / 2);
    console.log("split the diff:", splitTheDiff);
    let totalTakedownsCompleted = Math.round(f1TotalTakedownAttemps * splitTheDiff);
    console.log("f1TotalTakedownAttempts = ", f1TotalTakedownAttemps);
    console.log("f1TotalTakedownsCompleted = ",totalTakedownsCompleted);
    

    let f1TotalSubmissionAttempts = 0;
    let f2TotalSubmissionAttempts = 0;
    let bjj = "";
    if (totalTakedownsCompleted >= 1) {
        console.log("f1 sub attempts = ", Math.round(f1.subAvg/3));
        console.log("f2 sub attempts = ", Math.round(f2.subAvg/3));
        f1TotalSubmissionAttempts = Math.round(f1.subAvg) / 3;
        f2TotalSubmissionAttempts = Math.round(f2.subAvg) / 3;
        bjj = `
        ${f1.name} attempts ${roundToHalf(f1TotalSubmissionAttempts).toFixed(1)} submissions.<br>
        ${f2.name} attempts ${roundToHalf(f2TotalSubmissionAttempts).toFixed(1)} submissions.<br>
        `
    }

    return `
        ${f1.name} takes ${f1TotalTakedownAttemps.toFixed(0)} shots<br>
        completing ${totalTakedownsCompleted.toFixed(0)} takedown(s)<br>
        ${bjj}
        `
}