const maintenanceBox = document.createElement('div');
maintenanceBox.id = 'maintenanceMessage';

const alertSymbol = document.createElement('i');
const alertMessage = document.createTextNode('Under Maintenance!  Sorry, we\'ll be back up soon');

alertSymbol.classList.add('bi', 'bi-exclamation-circle');
alertSymbol.style.marginRight = '10px';
alertSymbol.style.fontSize = '3em';

maintenanceBox.appendChild(alertSymbol);
maintenanceBox.appendChild(alertMessage);

document.body.prepend(maintenanceBox);