import "get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";

let provider;
let signer;

export function generateRandomWallet() {
  const randomWallet = ethers.Wallet.createRandom();
  return randomWallet;
}

export function createWalletFromMnemonic(menmonic) {
  return ethers.Wallet.fromMnemonic(menmonic);
}

export function createWalletFromPrivateKey(privateKey) {
  return new ethers.Wallet(privateKey);
}

export function getProvider() {
  if (!provider) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
  }
  return provider;
}

export function getSigner(privateKey) {
  let provider = getProvider();
  if (!signer || signer.privateKey != privateKey) {
    const wallet = createWalletFromPrivateKey(privateKey);
    signer = wallet.connect(provider);
  }
  return signer;
}
