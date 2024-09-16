const list = document.createElement('ul');
const strawweight = document.createElement('ul');
list.textContent = "STRAWWEIGHT";

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

    //for loop to traverse the pages and get fighters from each page
    for (let i = 1; i <= totalPages; i++) {
        try {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            const response = await fetch(`https://ufc-api-theta.vercel.app/mma-api/fighters?page=${i}`);
            //check the response statuse 
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            const fighters = data.fighters;
            fighters.forEach(fighter => {
                const listItem = document.createElement('ul');
                const winLossDraw = `${fighter.n_win} - ${fighter.n_loss} - ${fighter.n_draw}`;
                listItem.textContent = `${fighter.name}: ${winLossDraw}`;
                list.appendChild(listItem);
            });
        } catch (error) {
            console.log("error in ufcGetFighters.js: ", error);
        }
    }
}
