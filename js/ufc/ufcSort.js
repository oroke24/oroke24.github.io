function sortAllByWinLossRatio() {
    sortByWinLossRatio(allFightersArray);
    sortByWinLossRatio(strawweights);
    sortByWinLossRatio(flyweights);
    sortByWinLossRatio(bantamweights);
    sortByWinLossRatio(featherweights);
    sortByWinLossRatio(lightweights);
    sortByWinLossRatio(welterweights);
    sortByWinLossRatio(middleweights);
    sortByWinLossRatio(lightHeavyweights);
    sortByWinLossRatio(heavyweights);
    sortByWinLossRatio(unknownweight);
}
function sortByWinLossRatio(fighters) {
    fighters.sort(function (a, b) { return b.wins - a.wins });
    fighters.sort(function (a, b) { return b.wlRatio - a.wlRatio });
}
