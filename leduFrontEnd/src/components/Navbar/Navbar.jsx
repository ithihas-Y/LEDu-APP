import { useWeb3React } from "@web3-react/core";
import React, { useState } from "react";
import { InjectedConnector } from "@web3-react/injected-connector";
import "./Navbar.css";
import Web3 from "web3";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [wallet, setWalllet] = useState();
  const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 56,97, 137],
  });

  const { account, activate, connector } = useWeb3React();

  async function connect() {
    const web3 = new Web3(window.ethereum);
    const addr = await window.ethereum.send("eth_requestAccounts");
    const x = web3.eth.accounts.hashMessage("hello");
    console.log(x);
    try {
      await activate(injected);
      if (window.ethereum) {
        setWalllet(true);
        window.alert("Connected");
      } else {
        window.alert("No Web3 Wallet Found, Use web3 based Browser");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="nav-bg">
      <Link to="/" className="logo">
        LEDU
      </Link>
      <div className="nav-links">
        <Link className="nav-link" to="/bridge">
          Bridge
        </Link>
        <button
          className={wallet ? "connected-wallet" : "connect-wallet-btn"}
          onClick={() => {
            connect();
          }}
        >
          {wallet ? "Wallet Connected" : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
