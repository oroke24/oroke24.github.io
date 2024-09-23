function advantage(f1, f2, stat) {
    let advantage = "(Equal)"; 
    if (stat > 0) advantage = `${f1}`;
    else if (stat < 0) advantage = `${f2}`;
    if(advantage == winner) advantage = `<strong>${advantage}</strong>`
    return `${Math.abs(stat).toFixed(2)} (${advantage})`;
}