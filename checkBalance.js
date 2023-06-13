//Imports
const ethUtil = require('ethereumjs-util');
const crypto = require('crypto');
const Web3 = require('web3');
const prompt = require('prompt-sync')();


// API Key & New Web3 Instance
const infuraProjectId = '2d76f685972f4c6e80ae9899e7daec25'; 
const web3 = new Web3.default(`https://sepolia.infura.io/v3/${infuraProjectId}`);

// Static declaration of address you want to check
// This is the address I created in wallet.js you can use it to test
// Or you can create your own address and use it here
let address = prompt("Please enter the address to check: ");

// Check Balance
checkBalance(address);

async function checkBalance(address) {
    let balance = await web3.eth.getBalance(address);
    console.log("Balance: " + web3.utils.fromWei(balance, 'ether') + " ETH");
}
