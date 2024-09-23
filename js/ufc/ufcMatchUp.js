var matchUp = [];
var fighter1Div;
var fighter2Div;
var winnerDiv;
var fighter1Search;
var fighter2Search;
var list1 = document.createElement('div');
var list2 = document.createElement('div');

document.getElementById('matchUp').addEventListener('click', async (e) => {
    populateMatchUpScreen();
    fighter1Search.addEventListener("input", findFighter1);
    fighter2Search.addEventListener("input", findFighter2);
});
function findFighter1(fighter) {
    if(winnerDiv) winnerDiv.textContent = "";
    ClearChildren(list1);
    const searchTerm = fighter.target.value.toLowerCase();
    const filteredFighters = allFightersArray.filter((item) => {
        return item.name.toLowerCase().includes(searchTerm)
    });
    sortByWinLossRatio(filteredFighters);
    filteredFighters.forEach((item) => {
        const listItem = listifyFighter(item);
        list1.appendChild(listItem);
    })
    if (filteredFighters.length == 1) lockInPrompt(list1, filteredFighters[0], 0);
}
function findFighter2(fighter) {
    if(winnerDiv) winnerDiv.textContent = "";
    ClearChildren(list2);
    const searchTerm = fighter.target.value.toLowerCase();
    const filteredFighters = allFightersArray.filter((item) => {
        return item.name.toLowerCase().includes(searchTerm)
    });
    sortByWinLossRatio(filteredFighters);
    filteredFighters.forEach((item) => {
        const listItem = listifyFighter(item);
        list2.appendChild(listItem);
    })
    if (filteredFighters.length == 1) lockInPrompt(list2, filteredFighters[0], 1);
}
function lockInPrompt(list, fighter, slotToFill) {
    matchUp[slotToFill] = fighter;
    calculateWinner();
}
function calculateWinner() {
    if (matchUp.length == 2) {
        winnerDiv = document.createElement('div');
        let br = document.createElement('br');
        mainContent.appendChild(br);
        mainContent.appendChild(winnerDiv);
        winnerDiv.innerHTML = compareStats(matchUp[0], matchUp[1]); 
    }
}
function populateMatchUpScreen() {
    ClearChildren(mainContent);
    fighter1Div = document.createElement('div');
    fighter1Div.style.width = "50%";
    fighter1Div.style.float = "left";
    fighter1Search = document.createElement('input');

    fighter1Div.appendChild(fighter1Search);
    fighter1Div.appendChild(list1);
    fighter2Div = document.createElement('div');
    fighter2Div.style.width = "50%";
    fighter2Div.style.float = "right";
    fighter2Search = document.createElement('input');
    fighter2Div.appendChild(fighter2Search);
    fighter2Div.appendChild(list2);

    mainContent.appendChild(fighter1Div);
    mainContent.appendChild(fighter2Div);
}
