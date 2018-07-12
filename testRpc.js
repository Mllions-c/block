const Web3 = require('web3')
const solc = require('solc')
const util = require('util')
//let web3 = new Web3(new Web3.providers.HttpProvider("localhost:8545"))
const web3 = new Web3('https://rinkeby.infura.io/iGzMxUGPZdCKNwPFgJ8U')
//web3.setProvider(new Web3.providers.HttpProvider("localhost:8545"))
let source = `pragma solidity ^0.4.0;
contract Calc{
  uint count;
  function add(uint a, uint b) returns(uint){
    count++;
    return a + b;
  }
  function getCount() constant returns (uint){
    return count;
  }
}`

// web3.eth.compile.solidity(source).then(console.log)
const solcOutput = solc.compile({sources: {main: source}}, 1)
// ABI
const ABI = JSON.parse(solcOutput.contracts['main:Calc'].interface)
// 字节码
const code = solcOutput.contracts['main:Calc'].bytecode
// 获取地址
// web3.eth.getAccounts().then(console.log)
const fromAddress = '0xb384951aac17747eea4c025ba985a5273373e483'
web3.eth.estimateGas({
    to: '0x38ee8dA55ecEFDa8C6b625f42CA86adc2b2b9104',
    data: '0x514556860000000000000000000000000000000000000000000000000000000000000003'
}).then(console.log)
// 创建合约
const myContact = new web3.eth.Contract(ABI, '0x38ee8dA55ecEFDa8C6b625f42CA86adc2b2b9104',{
    from: fromAddress,
    gas: 21464 * 10,
    data: code,
    gasPrice: '20000000000'
})
// 发布合约

myContact.deploy({data: code})
.send()
.on('transactionHash', function(transactionHash){
    util.log("deploy transaction hash: ", transactionHash)
})
.on('receipt', function(receipt){
    util.log("deploy receipt: ", receipt)
})
.on('confirmation', function(confirmationNum, receipt){
    util.log("got confirmations number: ", confirmationNum)
})
.then(async function(myContactInstance){
    util.log("deployed successfully.")
    util.log("now the addr %o balance is %o", fromAddress, await web3.eth.getBalance(fromAddress))

    testContact(myContactInstance)
})
.catch(err => {
    util.log("Error: failed to deploy, detail:", err)
})
