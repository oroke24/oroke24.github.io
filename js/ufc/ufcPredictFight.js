async function bet(f1, f2, advantages, roundSimulation) {
    const userMessage = `Considering a bout between ${f1.name} and ${f2.name}, 
                        return the following betting odds (in a list of two JSON Objects, one per fighter):
                        fighter, significant_strikes, takedowns, knockout (yes or no), submission(yes or no), fantasy_points, fight_time_length (in minutes), winner, and most_certain_pick (which bet would you place).`;
    const assistantType = "You are an admirable ufc fight sports analyst, specializing in the betting department, you can only output a list of 2 JSON objects (don't include ``` json, just the square brackets, must be a strict JSON array).";
    let aiPrompt = ``
    let msgContainer = document.createElement('div');
    msgContainer.classList.add('row');
    let userMsg = await fightPrompt(userMessage, assistantType);
    userMsg = JSON.parse(userMsg);
    console.log('Array.isArray(userMsg): ', Array.isArray(userMsg));
    console.log('userMsg: ', userMsg);
    
    if(Array.isArray(userMsg)){
		userMsg.forEach(obj=>{
			let jsonContainer = dropDownArea();
			let detailsButton = createToggleDropdown(obj.fighter, `${obj.fighter}Button`);

            //jsonContainer.classList.add('half-width');
            //detailsButton.classList.add('half-width');
            //jsonContainer.style.display = 'none';
		    console.log('in userMsg.forEach...');
            detailsButton.addEventListener('click', ()=>{
                jsonContainer.classList.toggle('show');
		        //console.log('should show something');
            });
			jsonContainer.innerHTML = `
			    <strong>Fighter: ${obj.fighter}</strong><br>
			    <strong>Sig Strikes: ${obj.significant_strikes}</strong><br>
			    <strong>Takedowns: ${obj.takedowns}</strong><br>
			    <strong>Knockout: ${obj.knockout}</strong><br>
			    <strong>Submission: ${obj.submission}</strong><br>
			    <strong>Fantasy Points: ${obj.fantasy_points}</strong><br>
			    <strong>Fight Length: ${obj.fight_time_length}</strong><br>
			    <strong>Winner?: ${obj.winner}</strong><br>
			    <strong>Most certain pick: ${obj.most_certain_pick}</strong><br>
			`;
            jsonContainer.classList.add('col-6', 'half-width');
            jsonContainer.style.padding = '20px';
            jsonContainer.style.textAlign = 'center';
            detailsButton.classList.add('col-6', 'half-width');
            msgContainer.appendChild(detailsButton);
		    detailsButton.appendChild(jsonContainer);
        });
    }

    //console.log('msgContainer: ', msgContainer);
    return msgContainer;
    /*
    const msg = `<br><strong>----------------------------</strong><br>
            <strong><br>
            ${msgContainer.innerHTML}
            <br><strong>----------------------------</strong><br>
            `;
    
    //console.log("predictFight msg: ", msg);
    console.log("predictFight msg: ", userMessage);
    console.log("predictFight msg: ", assistantType);
    return msg;
    */

}
async function predictFight(f1, f2, advantages, roundSimulation) {
    const userMessage = `(using "###" to represent new paragraph) Estimate the outcome and list the stats according to betting odds.  Use the following information:${f1.name}, ${f2.name}. Stat Comparison: ${advantages}.  Round simulation: ${roundSimulation} .  Limit to 250 words or less(start by clearly announcing the decided winner) `;
    const assistantType = "You are a UFC fight outcome predictor that recieves information about two fighters and predicts betting odds for knockout, submission, or decision, also predicting lengt of fight if not decision and significant strikes. provide the response in clean separated paragraphs";
    let aiPrompt = `(using "###" to represent new paragraph) Predict the outcome if these two fighters fought, include how the statistics would look and include betting odds. limit to 250 words or less: ${f1.name} vs. ${f2.name}.(start by clearly announcing your decided winner)`;
    let userMsg = await fightPrompt(userMessage, assistantType);
    let whatAiThinks = `<br><br> So all that was <strong> according to Jamie's calculations</strong>.  Heres what I think. \n`;
    whatAiThinks += await fightPrompt(aiPrompt, assistantType);

    const msg = `<br><strong>----------------------------</strong><br>
            <strong>According to Jamie's calculations<br>
            (Followed by AI's prediction)</strong><br>
            ${userMsg}
            <br><strong>----------------------------</strong><br>
            <strong>AI's predictions</strong><br>
            ${whatAiThinks}
            <strong>----------------------------</strong><br>
            `;
    
    console.log("bet msg: ", msg);
    /*
    console.log("predictFight msg: ", userMessage);
    console.log("predictFight msg: ", assistantType);
    */

    return msg;
}