function simulateRound(f1, f2) {
    return `-----------<br>
            <strong>What a round might look like</strong><br><br>
            ${printStandUp(f1, f2)}<br>
            ${printStandUp(f2, f1)}<br>

            ------------
           `
}
function totalPunchesThrown(f) {return Math.round((f.sigStrLandPm * 5) / (f.sigStrLandPct/100))}
function totalPunchesAbsorbed(f) { return Math.round(f.sigStrAbsPm * 5)}
function totalPunchesLanded(f1, f2) {return Math.round((totalPunchesThrown(f1)+totalPunchesAbsorbed(f2))/2)}

function blockedPunches(f1, f2) {return Math.round((f2.sigStrDefPct/100) * totalPunchesLanded(f1, f2)) }
function printStandUp(f1, f2) {
    let f1LandedStrikes = Math.round(totalPunchesLanded(f1, f2));
    let f1CriticalStrikes = Math.round(f1LandedStrikes - blockedPunches(f1, f2));
    let f1SuperCriticalStrikes = Math.round(f1CriticalStrikes / 10);
    return`
            ${f1.name} throws ${totalPunchesThrown(f1).toFixed(0)} total strikes.<br>
            ${f1LandedStrikes.toFixed(0)} land,<br>
            ${f1CriticalStrikes.toFixed(0)} are unblocked (critical strikes),<br>
            ${f1SuperCriticalStrikes.toFixed(1)} have KO potential!<br>
            `
}