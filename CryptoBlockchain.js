const SHA256 = require('crypto-js/sha256');
 const EC= require('elliptic').ec;
 const ec= new EC('secp256k1');
 const {NetworkObserver}= require('./NetworkObserver');
 class Transaction
 {
constructor(fromAddress, toAddress, amount)
 {
 this.fromAddress = fromAddress;
 this.toAddress = toAddress;
 this.amount = amount;
 }
 calculateHash()
 {
 return SHA256(this.fromAddress + this.toAddress +
 this.amount).toString();
 }
 signTransaction(signingKey)
 {
 if(signingKey.getPublic('hex') !== this.fromAddress )
 {
 throw new Error('You cannot sign transaction for other wallets.'); }
 const hashTx= this.calculateHash();
 const sig= signingKey.sign(hashTx,'base64');
 this.signature= sig.toDER('hex');
 }
 isValid()
 {
 if(this.fromAddress === null)
 {
 console.log("1");
 return true;
 }
 if(this.signature.length === 0)
 {
 throw new Error('No signature in this transaction.');
 }
 const publicKey= ec.keyFromPublic(this.fromAddress, 'hex');
 console.log("\nNew Transaction");
 console.log("\nThe signature is: "+this.signature);
 return publicKey.verify(this.calculateHash(), this.signature);
 }
 }
 class CryptoBlock{
 constructor(timestamp, transactions, precedingHash=" "){
 this.timestamp = timestamp;
 this.transactions = transactions;
 this.precedingHash = precedingHash;
 this.hash = this.computeHash();
 this.nonce = 0;
 this.ne=null;
}
 computeHash() {
 return SHA256(
 this.precedingHash +
 this.timestamp +
 JSON.stringify(this.transactions) +
 this.nonce
 ).toString();
 }
 mineBlock(difficulty) {
 while (
 this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0") ) {
 this.nonce++;
 this.hash = this.computeHash();
 }
 console.log("Block Mined: "+ this.hash);
 console.log("Timestamp: "+ this.timestamp);
 }
 }
 class CryptoBlockchain{
 constructor(){
 this.currenthash = "0";
 this.blockchain = [this.startGenesisBlock()];
 this.difficulty = 4;
 this.pendingTransactions = ["0"];
 this.miningReward = 10;
 }
 startGenesisBlock(){
 let cb= new CryptoBlock(0,Date.now(),"0");
 this.currenthash = cb.hash;
 return cb;
 }
 obtainLatestBlock(){
 return this.blockchain[this.blockchain.length- 1];
}
 minePendingTransactions(miningRewardAddress)
 {
 let block= new CryptoBlock(Date.now(), this.pendingTransactions,
 this.currenthash);
 block.mineBlock(this.difficulty);
 console.log('Block successfully mined!');
 this.blockchain.push(block);
 this.currenthash= block.hash;
 }
 addTransaction(transaction)
 {
 if(!transaction.fromAddress || !transaction.toAddress)
 {
 console.log(transaction.fromAddress);
 console.log(transaction.toAddress);
 throw new Error('Transaction must include from and to address'); }
 if(!transaction.isValid())
 {
 throw new Error('Cannot add invalid transaction to blockchain');
 }
 this.pendingTransactions.push(transaction);
 }
 getBalanceOfAddress(address)
 {
 var balance= 10;
 console.log("\nInitial balance was: "+balance);
 for(const block of this.blockchain)
{
 if(block.transactions.length>0)
 {
 for(const trans of block.transactions)
 {
 if(trans.fromAddress === address)
 {
 balance-= trans.amount;
}
 if(trans.toAddress === address)
 {
 balance+= trans.amount;
 }
 }
 }
 }
 return balance;
 }
 checkChainValidity() {
 for (let i = 1; i < this.blockchain.length; i++) {
 const currentBlock = this.blockchain[i];
 const precedingBlock = this.blockchain[i- 1];
 if(!currentBlock.hasValidTransactions())
 {
 return false;
 }
 if (currentBlock.hash !== currentBlock.computeHash()) {
 return false;
 }
 if (currentBlock.precedingHash !== precedingBlock.hash) return false; }
 return true;
 }
 }
 module.exports.CryptoBlockchain= CryptoBlockchain;
 module.exports.CryptoBlock= CryptoBlock;
 module.exports.Transaction= Transaction;
