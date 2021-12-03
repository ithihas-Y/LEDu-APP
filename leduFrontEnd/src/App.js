import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Bridge from "./pages/Bridge/Bridge";

// import { useWeb3React } from "@web3-react/core";
// import { useEffect, useState } from "react";
// import {
//   getBalance,
//   stake,
//   withdraw,
//   approve,
//   getStakedInfo,
// } from "./functions";

function App() {
  // const {account,chainId} = useWeb3React()

  // let input

  // const [networkName,SetNN] = useState(null)
  // const [bal,SetBal] = useState(null)
  // //const [input,setInput] = useState(null)
  // const [info,setInfo] = useState(null)

  // useEffect(()=>{
  //   SetNN(chainId)
  //   getBalance().then(x=>{
  //     SetBal(x)
  //   })
  //   getStakedInfo().then(y=>{
  //     setInfo(y)
  //   })
  // },[chainId,account])

  // /*
  // useEffect(()=>{
  //   if(input !=null){
  //     setInput(web3.utils.toWei(input.toString()))
  //   }
  // },[input])
  // */

  // function display() {
  //   if(networkName){
  //     if(networkName===1){
  //       return 'ETHEREUM'
  //     }
  //     if(networkName===2){
  //       return 'KOVAN'
  //     }
  //     if(networkName ===3){
  //       return 'ROPSTEN'
  //     }
  //     if(networkName ===4){
  //       return 'RINKEBY'
  //     }
  //   }
  // }

  // function approveRender() {
  //   if (bal && bal[1] == 0) {
  //     return (
  //       <>
  //         <button className="btn" onClick={() => approve()}>
  //           Approve
  //         </button>
  //       </>
  //     );
  //   } else {
  //     return (
  //       <>
  //         <button className="btn" onClick={() => stake(input)}>
  //           Stake
  //         </button>
  //         <button className="btn" onClick={() => withdraw(input)}>
  //           Withdraw
  //         </button>
  //       </>
  //     );
  //   }
  // }

  return (
    <>
      {/* <div id="home-page">
        <div className="content-holder">
          <div className="text-box">
            <div className="heads">
              <h1 className="main-head">Your LEDU Balance is :: 
                <h6>{bal && bal[0]}</h6>
              </h1>
            </div>
            <h4 className="text-tag">
              CONNECTED TO<span> {display()}</span> NETWORK
            </h4>
            <h5 className="your-address">YOUR ADDRESS is {account}</h5>
            <input type="number" min="0" step="1" max={bal && bal[0]} className="input-field" onChange={(e)=>{input = e.target.value}} />
            <h6 className="show-address">SHOW CONTRACT ADDESS</h6>
            <div className="buttons">
              {approveRender()}
            </div>
          </div>
          <div className="card">
            <div className="card-container">
              <div className="staked-balance">
                <h2 className="text-desc">Your staked balance</h2>
                <h2 className="value-desc">{info && info[0].toPrecision(10)} LEDU</h2>
              </div>
              <div className="rewards-unstake">
                <h2 className="text-desc">Rewards if un-staked today</h2>
                <h2 className="value-desc">{info && info[1].toPrecision(10)} LEDU</h2>
              </div>
              <div className="rewards-maturity">
                <h2 className="text-desc">Rewards at maturity</h2>
                <h2 className="value-desc">0 LEDU</h2>
              </div>
              <div className="early-withdraws">
                <h2 className="text-desc">Early withdraw starts</h2>
                <h2 className="value-time">07/09/2021, 01:30:00</h2>
              </div>
              <div className="maturity">
                <h2 className="text-desc">Maturity</h2>
                <h2 className="value-time">07/10/2021, 01:30:00</h2>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bridge" element={<Bridge />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
