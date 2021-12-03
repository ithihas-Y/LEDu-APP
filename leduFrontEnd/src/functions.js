import abi from './abis/SmartChefInitializable.json'
import bep20 from './abis/IBEP20.json'
import Web3 from 'web3'
import Babi from './abis/bridgeETH.json'


const provider = new Web3.providers.HttpProvider(process.env.REACT_APP_RPC)

export const web3 = new Web3(provider)


const smartCHef = new web3.eth.Contract(
  abi.abi,
  '0xbc046d9cDD95E171E5cD62e57f6cB0f293bb8206'
)

const bridge = new web3.eth.Contract(Babi,'0x3B5b63500845863a0B738f20a08c48B2EdaFb5A6')

const ledu = new web3.eth.Contract(bep20.abi,'0x73e7040B225bF6bB72F511e954e845CF4c218685')

const ethereum = window.ethereum

export async function depositBridge(amt) {
  try {
    if (typeof ethereum !== "undefined" && ethereum !== "") {
      const tx = bridge.methods.deposit(web3.utils.toWei(amt.toString())).encodeABI()
      const transactionParameters = {
        to: '0x3B5b63500845863a0B738f20a08c48B2EdaFb5A6',
        from: ethereum.selectedAddress,
        data: tx,
      }
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      })
    } else {
      console.log("Please install MetaMask!")
    }
  } catch (e) {
    console.log(e.message)
  }
}

export async function withdrawBridge(amt) {
  try {
    if (typeof ethereum !== "undefined" && ethereum !== "") {
      const tx = bridge.methods.withdraw(ethereum.selectedAddress,web3.utils.toWei(amt.toString())).encodeABI()
      const transactionParameters = {
        to: '0x2aaF31e6c9abd2353b2CAF9dAa5B9dC0E04A42A8',
        from: ethereum.selectedAddress,
        data: tx,
      }
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      })
    } else {
      console.log("Please install MetaMask!")
    }
  } catch (e) {
    console.log(e.message)
  }
}




export async function stake(amt) {
    try {
        if (typeof ethereum !== "undefined" && ethereum !== "") {
          const tx = smartCHef.methods.deposit(web3.utils.toWei(amt.toString())).encodeABI()
          const transactionParameters = {
            to: '0xbc046d9cDD95E171E5cD62e57f6cB0f293bb8206',
            from: ethereum.selectedAddress,
            data: tx,
          }
          await ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
          })
        } else {
          console.log("Please install MetaMask!")
        }
      } catch (e) {
        console.log(e.message)
      }
}
export async function withdraw(amt) {
  try {
      if (typeof ethereum !== "undefined" && ethereum !== "") {
        const tx = smartCHef.methods.withdraw(web3.utils.toWei(amt.toString())).encodeABI()
        const transactionParameters = {
          to: '0xbc046d9cDD95E171E5cD62e57f6cB0f293bb8206',
          from: ethereum.selectedAddress,
          data: tx,
        }
        await ethereum.request({
          method: "eth_sendTransaction",
          params: [transactionParameters],
        })
      } else {
        console.log("Please install MetaMask!")
      }
    } catch (e) {
      console.log(e.message)
    }
}

export async function approve(){
  try {
    if (typeof ethereum !== "undefined" && ethereum !== "") {
      const tx = ledu.methods.approve('0xbc046d9cDD95E171E5cD62e57f6cB0f293bb8206','1000000000000000000000000000').encodeABI()
      const transactionParameters = {
        to: '0x73e7040B225bF6bB72F511e954e845CF4c218685',
        from: ethereum.selectedAddress,
        data: tx,
      }
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      })
    } else {
      console.log("Please install MetaMask!")
    }
  } catch (e) {
    console.log(e.message)
  }
}

export async function getStakedInfo(){
  if(typeof ethereum !=="undefined" && ethereum !==""){
    if(ethereum.selectedAddress != null){
      const info = await smartCHef.methods.userInfo(ethereum.selectedAddress).call()
      return [info.amount/(10**18),info.rewardDebt/(10**18)]
    }
  }
}

export async function getBalance(){
  
  if (typeof ethereum !== "undefined" && ethereum !== ""){
    if (ethereum.selectedAddress != null) {
      const balance = await ledu.methods.balanceOf(ethereum.selectedAddress).call()
      const allowance = await ledu.methods.allowance(ethereum.selectedAddress,'0xbc046d9cDD95E171E5cD62e57f6cB0f293bb8206').call()
      return [(balance/10**18),allowance]
    }
  }else{
    return "Wallet not Connected"
  }
  
}