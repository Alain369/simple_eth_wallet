// Import der benötigten Bibliotheken
const Web3 = require('web3');
const prompt = require('prompt-sync')();

// Konfiguration der Web3-Instanz mit Ihrem Infura-Projekt
const infuraProjectId = '2d76f685972f4c6e80ae9899e7daec25';
const web3 = new Web3.default(`https://sepolia.infura.io/v3/${infuraProjectId}`);

// Erstellung und Hinzufügung Ihres Kontos zur Web3-Wallet
const account = web3.eth.accounts.privateKeyToAccount('0xd5101da01a2b8f810de9b4f99e0c5ad90c23a0ecc71fd0ffc5331c40ae5c2d1a'); 
web3.eth.accounts.wallet.add(account);

// Funktion zur Abfrage der ETH-Balance eines bestimmten Kontos
async function getBalance(address) {
    let balance = await web3.eth.getBalance(address);
    return web3.utils.fromWei(balance, 'ether');
}

// Funktion zum Senden von ETH an eine bestimmte Adresse
async function sendEther(toAddress, amount) {
    // Abfrage des aktuellen Gaspreises und Schätzung der für die Transaktion benötigten Gasmenge
    let gasPrice = await web3.eth.getGasPrice();
    let gasEstimate = await web3.eth.estimateGas({from: account.address, to: toAddress, value: web3.utils.toWei(amount, 'ether')});
    
    // Informiere den Nutzer über die geschätzten Transaktionskosten und frage, ob er fortfahren möchte
    let gasCost = web3.utils.fromWei((gasEstimate * gasPrice).toString(), 'ether');
    console.log("The estimated transaction fee is: ", gasCost, "ETH");

    let confirmation = prompt("Do you want to proceed with the transaction? (y/n) ");
    if (confirmation.toLowerCase() !== 'y') {
        console.log("Transaction cancelled.");
        return;
    }

    // Durchführung der Transaktion
    let tx = await web3.eth.sendTransaction({from: account.address, to: toAddress, value: web3.utils.toWei(amount, 'ether'), gas: gasEstimate, gasPrice: gasPrice});
    return tx;
}

// Hauptfunktion
async function main() {
    // Abfrage der aktuellen Balance des Kontos
    let balance = await getBalance(account.address);
    console.log("Your balance is: ", balance, "ETH");

    // Eingabeaufforderungen zur Angabe des zu sendenden Betrags und der Empfängeradresse
    let amount = prompt("Please enter the amount to send: ");
    let recieverAddress = prompt("Please enter the receiver address: ");

    // Überprüfung, ob genug ETH vorhanden ist, um die Transaktion durchzuführen
    if (balance < amount) {
        console.log("Not enough balance to send.");
        return;
    }

    // Durchführung der Transaktion und erneute Abfrage der Balance nach der Transaktion
    let tx = await sendEther(recieverAddress, amount); 
    balance = await getBalance(account.address);
    console.log("Your new balance is: ", balance, "ETH");
}

// Ausführung der Hauptfunktion
main().catch(console.error);
