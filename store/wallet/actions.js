import {
  generateRandomWallet,
  createWalletFromMnemonic,
  createWalletFromPrivateKey,
  getSigner,
} from "@/utils/ethers-helper";
import { ethers } from "ethers";
export default {
  initWallet({ commit }) {
    const preCreateWallet = generateRandomWallet();
    commit("initWallet", preCreateWallet);
  },

  usePreCreateWallet({ commit }) {
    commit("usePreCreateWallet");
  },

  importWallet({ commit }, data) {
    let wallet;
    switch (data.type) {
      case "mnemonic": {
        wallet = createWalletFromMnemonic(data.payload);
        commit("importWallet", wallet);
        break;
      }
      case "privateKey": {
        wallet = createWalletFromPrivateKey(data.payload);
        commit("importWallet", wallet);
        break;
      }
      default:
        break;
    }
    return wallet;
  },

  async getBalance({ commit, state }) {
    const privateKey = state.walletInfo.privateKey;
    const signer = getSigner(privateKey);
    const wei = await signer.getBalance();
    const balance = ethers.utils.formatEther(wei);
    commit("getBalance", balance);
  },

  async sendEth({ commit, state }, payload) {
    const privateKey = state.walletInfo.privateKey;
    const signer = getSigner(privateKey);
    const amountInEther = payload.amount;
    const tx = {
      to: payload.address,
      value: ethers.utils.parseEther(amountInEther),
    };
    const txResp = await signer.sendTransaction(tx);
    const txReceipt = await txResp.wait();
    return txReceipt;
  },
};
