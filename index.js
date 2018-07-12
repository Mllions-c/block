const Web3 = require('web3')
const big = require('bignumber.js')


const web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/iGzMxUGPZdCKNwPFgJ8U"))
// 最新区块
console.log(web3)
console.log('web3.eth.blockNumber', web3.eth.blockNumber)

// 查询余额
const balanceWei = web3.eth.getBalance('0xa49650f4cb9ed4a867721a903bcfc953b59822d6')
web3.fromWei(balanceWei, 'ether')


const signature = we3.sha3("balanceOf('0xb384951aac17747eea4c025ba985a5273373e483')").substr(2,8)
const params = {
    "jsonrpc":"2.0",
    "method":"eth_call",
    "params":[
        {
            "to":"0x86Fa049857E0209aa7D9e616F7eb3b3B78ECfdb0",
            "data":`0x${signature}`
        },
        "latest"
    ],
    "id":123
}