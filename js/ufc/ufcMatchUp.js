var fighter1Div;
var fighter2Div;
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
}
function findFighter2(fighter) {
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
    fighter2Search.style.float = "right";
    fighter2Div.appendChild(fighter2Search);
    fighter2Div.appendChild(list2);

    mainContent.appendChild(fighter1Div);
    mainContent.appendChild(fighter2Div);
}
