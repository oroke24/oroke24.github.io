async function predictFight(f1, f2, advantages, roundSimulation) {
    const userMessage = `(using "###" to represent new paragraph) Estimate the outcome and list the stats according to betting odds.  Use the following information:${f1.name}, ${f2.name}. Stat Comparison: ${advantages}.  Round simulation: ${roundSimulation} .  Limit to around 500 words or less(start by clearly announcing the decided winner) `;
    const assistantType = "You are a UFC fight outcome predictor that recieves information about two fighters and predicts betting odds for knockout, submission, or decision, also predicting lengt of fight if not decision and significant strikes. provide the response in clean separated paragraphs";
    let aiPrompt = `(using "###" to represent new paragraph) Predict the outcome if these two fighters fought, include how the statistics would look and include betting odds. limit to around 500 words or less: ${f1.name} vs. ${f2.name}.(start by clearly announcing your decided winner)`;
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
    
    console.log("predictFight msg: ", msg);
    /*
    console.log("predictFight msg: ", userMessage);
    console.log("predictFight msg: ", assistantType);
    */

    return msg;
}