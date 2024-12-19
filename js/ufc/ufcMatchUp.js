document.addEventListener('DOMContentLoaded', ()=>{

var matchUp = [];
var fighter1Div;
var fighter2Div;
var fighter1List;
var fighter2List;
//creating dynamic views
var winnerDivContainer = document.createElement('div');
var winnerDivDropButton = createToggleDropdown('Calculated Winner', 'winnerDivDropButton');
var winnerDiv = dropDownArea('winnerDiv');

var roundsDivContainer = document.createElement('div');
var roundsDivDropButton = createToggleDropdown('What a round might look like', 'roundsDivDropButton');
var roundsDiv = dropDownArea('roundsDiv');

var predictionDivContainer = document.createElement('div');
var predictionDivDropButton = createToggleDropdown('AI Prediction', 'predictionDivDropButton');
var predictionDiv = dropDownArea('predictionDiv');

var betDivContainer = document.createElement('div');
var betDivDropButton = createToggleDropdown('Bet AI', 'betDivDropButton');
var betDiv = dropDownArea('betDiv');

// end dynamic view init



var fighter1Search;
var fighter2Search;
var list1 = document.createElement('div');
var list2 = document.createElement('div');
//const lockinButton = createButton("lock-in");


//winnerDivBinding
    winnerDivContainer.appendChild(winnerDivDropButton);
    winnerDivDropButton.addEventListener('click', ()=>{
        winnerDiv.classList.toggle('show');
		//console.log('should show something');
    });
    winnerDivContainer.appendChild(winnerDiv);
//end winnerDiv
//roundsDivBinding
    roundsDivContainer.appendChild(roundsDivDropButton);
    roundsDivContainer.appendChild(roundsDiv);
    roundsDivDropButton.addEventListener('click', ()=>{
        roundsDiv.classList.toggle('show');
    });
//end roundsDiv
//predictionDivBinding
    predictionDivContainer.appendChild(predictionDivDropButton);
    predictionDivContainer.appendChild(predictionDiv);
    predictionDivDropButton.addEventListener('click', ()=>{
        predictionDiv.classList.toggle('show');
    });
//end roundsDiv
//betDivBinding
    betDivContainer.appendChild(betDivDropButton);
    betDivContainer.appendChild(betDiv);
    betDivDropButton.addEventListener('click', ()=>{
        betDiv.classList.toggle('show');
    });
//end roundsDiv


document.getElementById('matchUp').addEventListener('click', async (e) => {
    matchUp.length = 0;
    ClearChildren(mainContent);
    ClearChildren(winnerDiv);
    ClearChildren(roundsDiv);
    ClearChildren(predictionDiv);
    populateMatchUpScreen();
    ClearChildren(list1);
    ClearChildren(list2);
    fighter1Search.value = "";
    fighter2Search.value = "";
    fighter2Search.addEventListener("click", fighter2Search.focus());
    fighter1Search.addEventListener("click", fighter1Search.focus());
    fighter1Search.addEventListener("input", (fighter) => findFighter(fighter1Search, list1, fighter, 0));
    fighter2Search.addEventListener("input", (fighter) => findFighter(fighter2Search, list2, fighter, 1));
});
async function lockInPrompt(list, fighter, slotToFill) {
    ClearChildren(list);
    const listItem = listifyFighter(fighter);
    list.style.width = "80%";
    list.appendChild(listItem);
    matchUp[slotToFill] = fighter;
    predictionDiv.innerHTML = `FightAI <strong>predictor</strong> is thinking. . .`;
    betDiv.innerHTML = `<strong>BetAI</strong> is thinking. . .`;
    await calculateWinner();
}
//POPULATE VIEWS (Calculate Winner)//////////////////////////////////////////////////////
async function calculateWinner() {
    if (matchUp.length == 2) {
        let br = document.createElement('br');

	    mainContent.appendChild(winnerDivContainer);
	    mainContent.appendChild(roundsDivContainer);
	    mainContent.appendChild(predictionDivContainer);
	    mainContent.appendChild(betDivContainer);

	    winnerDiv.innerHTML = compareStats(matchUp[0], matchUp[1]); 
		roundsDiv.innerHTML = simulateRound(matchUp[0], matchUp[1]);
		let betDivList = await bet(matchUp[0], matchUp[1]);
		if(betDivList){ 
            betDiv.classList.toggle('show');
            betDiv.innerHTML = '';
            betDiv.classList.add('center');
            betDiv.appendChild(betDivList);
            betDiv.classList.toggle('show');
        }

		predictionDiv.innerHTML = await predictFight(matchUp[0], matchUp[1], winnerDiv.innerHTML, roundsDiv.innerHTML);
		//betDiv.innerHTML = (matchUp[0], matchUp[1]);

    }
}
//END VIEW//////////////////////////////////////////////////////
function findFighter(fighterSearch, list, fighter, slot) {
    if(winnerDiv) winnerDiv.textContent = "";
    if(roundsDiv) roundsDiv.textContent = "";
    if(predictionDiv) predictionDiv.textContent = "";
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
    if (filteredFighters.length == 1){
        lockInPrompt(list, filteredFighters[0], slot);
    };
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
});
