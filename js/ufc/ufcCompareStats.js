function compareStats(f1, f2) {
    var winner;
    if(f1.wins-f2.wins > 0 ) winner = f1; 
    else winner = f2;
    
    return `${winner.name} is the winner`;
}