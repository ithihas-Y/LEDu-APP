import React, { useEffect, useState } from "react";
import "./Bridge.css";
import { useWeb3React } from "@web3-react/core";
import {depositBridge,getBalance,withdrawBridge} from '../../functions'

const Bridge = () => {

  const {chainId} = useWeb3React()
  const [bal,setBal] = useState(null)
  let input
  let input2

  useEffect(()=>{
    getBalance().then(x=>{
      setBal(x)
    })
  },[chainId])
  return (
    <div className="bridge-whole">
      <div className="bridge-boxes-container">
        <div className="card-holder">
          <h1 className="card-head">Eth</h1>
          <div className="bridge-card">
            <h3>{bal && bal[0]}</h3>
            <input className="input-field" type="text" placeholder="0.00" onChange={e=>{input = e.target.value}} />
            <div className="button-holder">
              <button className="btn-1" onClick={()=>depositBridge(input)}>Deposit</button>
              <button className="btn-2">Withdraw</button>
            </div>
          </div>
        </div>
        <div className="card-holder">
          <h1 className="card-head">Binance</h1>
          <div className="bridge-card">
            <h3>$0.00 USD</h3>
            <input className="input-field" type="text" placeholder="0.00" onChange={e=>{input2=e.target.value}} />
            <div className="button-holder">
              <button className="btn-1">Deposit</button>
              <button className="btn-2" onClick={()=>withdrawBridge(input2)}>Withdraw</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bridge;
