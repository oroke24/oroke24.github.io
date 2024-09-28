async function predictFight(f1, f2, advantages, roundSimulation) {
    const userMessage = `(using "###" to represent new paragraph) Estimate the outcome and list the stats according to betting odds.  Use the following information:${f1.name}, ${f2.name}. Stat Comparison: ${advantages}.  Round simulation: ${roundSimulation} `;
    const assistantType = "You are a UFC fight outcome predictor that recieves information about two fighters and predicts betting odds for knockout, submission, or decision, also predicting lengt of fight if not decision and significant strikes. provide the response in clean separated paragraphs";
    console.log("predictFight msg: ", userMessage);
    console.log("predictFight msg: ", assistantType);

    const msg = await fightPrompt(userMessage, assistantType);
    
    console.log("predictFight msg: ", msg);

    return msg;
}