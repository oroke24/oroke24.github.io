const list = document.createElement('div');
const allFightersArray = [];
const strawweights = []; //115
const flyweights = []; //125
const bantamweights = []; //135
const featherweights = []; //145
const lightweights = []; //155
const welterweights = []; //170
const middleweights = []; //185
const lightHeavyweights = []; //205
const heavyWeights = []; //265

getAllFighters();
document.getElementById('getAllFighters').addEventListener('click', async (e) => {
    const mainContent = document.getElementById('mainContent');
    mainContent.appendChild(list);
});
async function getAllFighters() {
    //Initial Request to get totalPages
    const request = await fetch('https://ufc-api-theta.vercel.app/mma-api/fighters?page=1');
    const data = await request.json(); 
    const totalPages = data.lastPage; 
    let j = 0;
    //for loop to traverse the pages and get fighters from each page
    for (let i = 1; i <= totalPages; i++) {
        try {
            const response = await fetch(`https://ufc-api-theta.vercel.app/mma-api/fighters?page=${i}`);
            //check the response statuse 
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            const fighters = data.fighters;
            fighters.forEach(fighter => {
                addFighterToArray(fighter);
                const listItem = document.createElement('ul');
                listItem.textContent = fighter.weight;
                list.appendChild(listItem);
            });
        } catch (error) {
            console.log("error in ufcGetFighters.js: ", error);
        }
    }
}
function addFighterToArray(fighter) {
    const wlRatio = fighter.n_win / fighter.n_loss;
    const toAdd = new Fighter(fighter.name, fighter.height, fighter.weight, fighter.reach, fighter.dob, fighter.n_win, fighter.n_loss, fighter.n_draw, wlRatio, fighter.sig_str_land_pM, fighter.sig_str_land_pct, fighter.sig_str_abs_pM, fighter.sig_str_def_pct, fighter.td_avg, fighter.td_land_pct, fighter.def_pct, fighter.sub_avg);
    allFightersArray.push(toAdd);
    let wt = fighter.weight;
    if (wt > 205) heavyweights.push(toAdd);
    else if (wt > 185) lightHeavyweights.push(toAdd);
    else if (wt > 170) middleweights.push(toAdd);
    else if (wt > 155) welterweights.push(toAdd);
    else if (wt > 145) lightweights.push(toAdd);
    else if (wt > 135) featherweights.push(toAdd);
    else if (wt > 125) bantamweights.push(toAdd);
    else if (wt > 115) flyweights.push(toAdd);
    else if (wt > 100) strawweights.push(toAdd);
    
}
function sortByWinLossRatio() {
    allFightersArray.sort(function (a, b) { return a.wlRatio, b.wlRatio });
}

