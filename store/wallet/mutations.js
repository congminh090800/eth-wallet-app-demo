export default {
  initWallet(state, wallet) {
    state.preCreateWallet = {
      ...wallet,
      mnemonic: wallet.mnemonic,
      privateKey: wallet.privateKey,
      publicKey: wallet.publicKey,
    };
  },
  usePreCreateWallet(state) {
    state.walletInfo = state.preCreateWallet;
  },
  importWallet(state, wallet) {
    state.walletInfo = {
      ...wallet,
      provider: wallet.provider,
      mnemonic: wallet.mnemonic,
      privateKey: wallet.privateKey,
      publicKey: wallet.publicKey,
    };
  },
  getBalance(state, balance) {
    state.walletInfo.balance = balance;
  },
};
