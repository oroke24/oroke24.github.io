//////////////////////NAVIGATION AREA/////////////////////////////////
document.getElementById('listAllFighters').addEventListener('click', async (e) => {
    ClearChildren(mainContent);
    listWeightClass(allFightersArray);
    mainContent.appendChild(list);
});
document.getElementById('listStrawweights').addEventListener('click', async (e) => {
    ClearChildren(mainContent);
    listWeightClass(strawweights);
    mainContent.appendChild(list);
});
document.getElementById('listFlyweights').addEventListener('click', async (e) => {
    ClearChildren(mainContent);
    listWeightClass(flyweights);
    mainContent.appendChild(list);
});
document.getElementById('listBantamweights').addEventListener('click', async (e) => {
    ClearChildren(mainContent);
    listWeightClass(bantamweights);
    mainContent.appendChild(list);
});
document.getElementById('listFeatherweights').addEventListener('click', async (e) => {
    ClearChildren(mainContent);
    listWeightClass(featherweights);
    mainContent.appendChild(list);
});
document.getElementById('listLightweights').addEventListener('click', async (e) => {
    ClearChildren(mainContent);
    listWeightClass(lightweights);
    mainContent.appendChild(list);
});
document.getElementById('listWelterweights').addEventListener('click', async (e) => {
    ClearChildren(mainContent);
    listWeightClass(welterweights);
    mainContent.appendChild(list);
});
document.getElementById('listMiddleweights').addEventListener('click', async (e) => {
    ClearChildren(mainContent);
    listWeightClass(middleweights);
    mainContent.appendChild(list);
});
document.getElementById('listLightHeavyweights').addEventListener('click', async (e) => {
    ClearChildren(mainContent);
    listWeightClass(lightHeavyweights);
    mainContent.appendChild(list);
});
document.getElementById('listHeavyweights').addEventListener('click', async (e) => {
    ClearChildren(mainContent);
    listWeightClass(heavyweights);
    mainContent.appendChild(list);
});
document.getElementById('listUnknownweights').addEventListener('click', async (e) => {
    ClearChildren(mainContent);
    listWeightClass(unknownweight);
    mainContent.appendChild(list);
});
