var matchUp = [];
var fighter1Div;
var fighter2Div;
var fighter1List;
var fighter2List;
var winnerDiv = document.createElement('div');
var roundsDiv = document.createElement('div');
var fighter1Search;
var fighter2Search;
var list1 = document.createElement('div');
var list2 = document.createElement('div');

document.getElementById('matchUp').addEventListener('click', async (e) => {
    matchUp.length = 0;
    ClearChildren(mainContent);
    ClearChildren(winnerDiv);
    ClearChildren(roundsDiv);
    populateMatchUpScreen();
    ClearChildren(list1);
    ClearChildren(list2);
    fighter1Search.value = "";
    fighter2Search.value = "";
    fighter1Search.addEventListener("click", fighter1Search.focus());
    fighter2Search.addEventListener("click", fighter2Search.focus());
    fighter1Search.addEventListener("input", (fighter) => findFighter(fighter1Search, list1, fighter, 0));
    fighter2Search.addEventListener("input", (fighter) => findFighter(fighter2Search, list2, fighter, 1));
});
function lockInPrompt(list, fighter, slotToFill) {
    ClearChildren(list);
    const listItem = listifyFighter(fighter);
    list.style.width = "80%";
    list.appendChild(listItem);
    matchUp[slotToFill] = fighter;
    calculateWinner();
}
function calculateWinner() {
    if (matchUp.length == 2) {
        let br = document.createElement('br');
        mainContent.appendChild(br);
        mainContent.appendChild(winnerDiv);
        mainContent.appendChild(roundsDiv);
        winnerDiv.innerHTML = compareStats(matchUp[0], matchUp[1]); 
        roundsDiv.innerHTML = simulateRound(matchUp[0], matchUp[1]);
    }
}
function findFighter(fighterSearch, list, fighter, slot) {
    if(winnerDiv) winnerDiv.textContent = "";
    if(roundsDiv) roundsDiv.textContent = "";
    ClearChildren(list);
    list.style.margin = "0 auto";

    const searchTerm = fighter.target.value.toLowerCase();
    const filteredFighters = allFightersArray.filter((item) => {
        return item.name.toLowerCase().includes(searchTerm)
    });
    sortByWinLossRatio(filteredFighters);
    filteredFighters.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = item.name;
        listItem.style.cursor = "pointer";
        listItem.addEventListener("click", () => { fighterSearch.value = item.name; fighterSearch.dispatchEvent(new Event('input')); });
        list.appendChild(listItem);
    })
    if (filteredFighters.length == 1) lockInPrompt(list, filteredFighters[0], slot);
}
function populateMatchUpScreen() {
    ClearChildren(mainContent);
    fighter1Div = document.createElement('div');
    fighter1Div.style.width = "50%";
    fighter1Div.style.float = "left";
    fighter1Div.style.textAlign = "center";
    fighter1Search = document.createElement('input');
    fighter1Search.style.width = "80%"
    fighter1Search.placeholder = "Search Fighter 1";
    list1.style.textAlign = "left";
    list1.style.width = "80%"

    fighter2Div = document.createElement('div');
    fighter2Div.style.width = "50%";
    fighter2Div.style.float = "right";
    fighter2Div.style.textAlign = "center";
    fighter2Search = document.createElement('input');
    fighter2Search.style.width = "80%"
    fighter2Search.placeholder = "Search Fighter 2";
    list2.style.textAlign = "left";
    list2.style.width = "80%";

    fighter1Div.appendChild(fighter1Search);
    fighter1Div.appendChild(list1);
    fighter2Div.appendChild(fighter2Search);
    fighter2Div.appendChild(list2);

    mainContent.appendChild(fighter1Div);
    mainContent.appendChild(fighter2Div);
}
