const Web3 = require('web3')
//import Web3 from 'web3'
require('dotenv').config()
const abi = require('./bridge.json')
const Tx = require('ethereumjs-tx').Transaction
//import Tx from 'ethereumjs-tx'
const Common = require('ethereumjs-common')
//import Common, { Chain } from '@ethereumjs/common'


const commonBSC = Common.default.forCustomChain('mainnet', {
    name: 'bnb',
    networkId: 97,
    chainId: 97,
},'petersburg');


const web3BSC = new Web3('wss://speedy-nodes-nyc.moralis.io/c63aa27dafeaf0a01db49ea9/bsc/testnet/ws')

const web3ETH = new Web3('wss://speedy-nodes-nyc.moralis.io/c63aa27dafeaf0a01db49ea9/eth/ropsten/ws')

const EthBridge = new web3ETH.eth.Contract(abi,'0x3B5b63500845863a0B738f20a08c48B2EdaFb5A6')

const BscBridge = new web3BSC.eth.Contract(abi,'0x2aaF31e6c9abd2353b2CAF9dAa5B9dC0E04A42A8')

const eventEth = EthBridge.events.Deposited()

const eventBSC = BscBridge.events.Deposited()

const account = web3ETH.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY)

eventEth.on('data',async(x)=>{
    console.log(x)
    const user = x.returnValues.user
    const amount = x.returnValues.amount

    const txData = BscBridge.methods.updateDeposit(user,amount).encodeABI()

    const txCount = await web3BSC.eth.getTransactionCount(account.address)

    const txObject ={
        nonce:web3BSC.utils.toHex(txCount),
        gasLimit: web3BSC.utils.toHex(400000), 
        gasPrice: web3BSC.utils.toHex(web3BSC.utils.toWei('10', 'gwei')),
        to: "0x2aaF31e6c9abd2353b2CAF9dAa5B9dC0E04A42A8",
        value: "0x0",
        data: txData,
    }
    
    const tx = new Tx(txObject,{'common':commonBSC})
    const privateKey1Buffer = Buffer.from(process.env.PRIVATE_KEY, 'hex')

    tx.sign(privateKey1Buffer)
    const serializedTx = tx.serialize()
    const rawTx = '0x' + serializedTx.toString('hex')

    try {
        web3BSC.eth.sendSignedTransaction(rawTx).then(console.log)



      } catch (error) {
        console.log(error)

      }


})

eventBSC.on('data',(y)=>{
    console.log(y)
})

