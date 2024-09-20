//////////////////////NAVIGATION AREA/////////////////////////////////
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
document.getElementById('listUnknownweights').addEventListener('click', async (e) => {
    listWeightClass(unknownweight);
    mainContent.appendChild(list);
});
