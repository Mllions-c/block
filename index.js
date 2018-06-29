const Web3 = require('web3')
const big = require('bignumber.js')
web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/iGzMxUGPZdCKNwPFgJ8U"))
web3.eth.blockNumber
const balanceWei = web3.eth.getBalance('0xa49650f4cb9ed4a867721a903bcfc953b59822d6').toNumber()

web3.fromWei(balanceWei, 'ether')
