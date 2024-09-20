const mainContent = document.getElementById('mainContent');
const list = document.createElement('ul');
const allFightersArray = [];
const strawweights = []; //115
const flyweights = []; //125
const bantamweights = []; //135
const featherweights = []; //145
const lightweights = []; //155
const welterweights = []; //170
const middleweights = []; //185
const lightHeavyweights = []; //205
const heavyweights = []; //265
const unknownweight = []; //weight not listed
getAllFighters();


document.getElementById('listAllFighters').addEventListener('click', async (e) => {
    listWeightClass(allFightersArray);
    mainContent.appendChild(list);
});
document.getElementById('listStrawweights').addEventListener('click', async (e) => {
    listWeightClass(strawweights);
    mainContent.appendChild(list);
});
document.getElementById('listFlyweights').addEventListener('click', async (e) => {
    listWeightClass(flyweights);
    mainContent.appendChild(list);
});
document.getElementById('listBantamweights').addEventListener('click', async (e) => {
    listWeightClass(bantamweights);
    mainContent.appendChild(list);
});
document.getElementById('listFeatherweights').addEventListener('click', async (e) => {
    listWeightClass(featherweights);
    mainContent.appendChild(list);
});
document.getElementById('listLightweights').addEventListener('click', async (e) => {
    listWeightClass(lightweights);
    mainContent.appendChild(list);
});
document.getElementById('listWelterweights').addEventListener('click', async (e) => {
    listWeightClass(welterweights);
    mainContent.appendChild(list);
});
document.getElementById('listMiddleweights').addEventListener('click', async (e) => {
    listWeightClass(middleweights);
    mainContent.appendChild(list);
});
document.getElementById('listLightHeavyweights').addEventListener('click', async (e) => {
    listWeightClass(lightHeavyweights);
    mainContent.appendChild(list);
});
document.getElementById('listHeavyweights').addEventListener('click', async (e) => {
    listWeightClass(heavyweights);
    mainContent.appendChild(list);
});


async function getAllFighters() {
    //Initial Request to get totalPages
    const request = await fetch('https://ufc-api-theta.vercel.app/mma-api/fighters?page=1');
    const data = await request.json(); 
    const totalPages = data.lastPage; 
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
            });
        } catch (error) {
            console.log("error in ufcGetFighters.js: ", error);
        }
        //if (i % 10 == 0) sizeOfWeightClasses();
    }
}
function addFighterToArray(fighter) {
    const wlRatio = fighter.n_win / fighter.n_loss;
    const toAdd = new Fighter(fighter.name, fighter.height, fighter.weight, fighter.reach, fighter.dob, fighter.n_win, fighter.n_loss, fighter.n_draw, wlRatio, fighter.sig_str_land_pM, fighter.sig_str_land_pct, fighter.sig_str_abs_pM, fighter.sig_str_def_pct, fighter.td_avg, fighter.td_land_pct, fighter.def_pct, fighter.sub_avg);
    allFightersArray.push(toAdd);
    let wtString = fighter.weight.substring(0,3);
    let wt = parseInt(wtString, 10);
    if (wt > 205) heavyweights.push(toAdd);
    else if (wt > 185) lightHeavyweights.push(toAdd);
    else if (wt > 170) middleweights.push(toAdd);
    else if (wt > 155) welterweights.push(toAdd);
    else if (wt > 145) lightweights.push(toAdd);
    else if (wt > 135) featherweights.push(toAdd);
    else if (wt > 125) bantamweights.push(toAdd);
    else if (wt > 115) flyweights.push(toAdd);
    else if (wt > 100) strawweights.push(toAdd);
    else unknownweight.push(toAdd);
}
function sortByWinLossRatio() {
    allFightersArray.sort(function (a, b) { return a.wlRatio, b.wlRatio });
}
function sizeOfWeightClasses() {
    console.log(`${allFightersArray.length} total fighters`);
    console.log(`strawweight has ${strawweights.length} fighters`);
    console.log(`flyweight has ${flyweights.length} fighters`);
    console.log(`bantamweight has ${bantamweights.length} fighters`);
    console.log(`featherweight has ${featherweights.length} fighters`);
    console.log(`lightweight has ${lightweights.length} fighters`);
    console.log(`welterweight has ${welterweights.length} fighters`);
    console.log(`middleweight has ${middleweights.length} fighters`);
    console.log(`lightHeavyweight has ${lightHeavyweights.length} fighters`);
    console.log(`heavyweight has ${heavyweights.length} fighters`);
    console.log(`unknownweight has ${unknownweight.length} fighters`);
}
function listWeightClass(weightClass) {
    list.innerHTML = "";
    for (i in weightClass) {
        let fighter = document.createElement('ul');
        fighter.innerHTML = weightClass[i].name;
        let record = document.createElement('li');
        record.innerHTML = `${weightClass[i].wins}-${weightClass[i].losses}`
        fighter.appendChild(record);
        list.appendChild(fighter);
    }
}
