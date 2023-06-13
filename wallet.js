// Import libraries
const ethUtil = require('ethereumjs-util');
const crypto = require('crypto');
const Web3 = require('web3');


// API Key & New Web3 Instance
const infuraProjectId = '2d76f685972f4c6e80ae9899e7daec25'; 
const web3 = new Web3.default(`https://sepolia.infura.io/v3/${infuraProjectId}`);

// generate a new Keypair
const privateKeyBuffer = crypto.randomBytes(32);
const privateKey = ethUtil.bufferToHex(privateKeyBuffer);
const publicKeyBuffer = ethUtil.privateToPublic(privateKeyBuffer);
const publicKey = ethUtil.bufferToHex(publicKeyBuffer);

// Generate Address
const address = ethUtil.bufferToHex(ethUtil.pubToAddress(publicKeyBuffer));

console.log("Private Key: " + privateKey);
console.log("Public Key: " + publicKey);
console.log("Address: " + address);

// Check Balance
checkBalance(address);

async function checkBalance(address) {
    let balance = await web3.eth.getBalance(address);
    console.log("Balance: " + web3.utils.fromWei(balance, 'ether') + " ETH");
}
