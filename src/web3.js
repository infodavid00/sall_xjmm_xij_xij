import Web3 from "web3";

var web3;

if (typeof window !== "undefined") {
  if (typeof window.web3 !== "undefined") {
    // Use Mist/MetaMask's provider.
    web3 = new Web3(window.web3.currentProvider);
  } else {
    // console.log('using infura provider')
    const infura = `https://goerli.infura.io/v3/`;

    web3 = new Web3(new Web3.providers.HttpProvider(infura));
  }
}
export default web3;
