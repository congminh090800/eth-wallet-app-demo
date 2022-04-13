<template>
  <div class="w-full p-4 bg-gray-100">
    <button
      type="button"
      @click="$router.push('/')"
      class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
    >
      <span class="sr-only">Close menu</span>
      <!-- Heroicon name: outline/x -->
      <svg
        class="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
    <main role="main" class="w-full flex flex-col h-screen content-center">
      <div class="w-full bg-white rounded-xl mx-auto my-4 p-8">
        <div
          @click="copyToClipboard"
          class="cursor-pointer break-all font-bold text-lg mb-4"
        >
          <span>Wallet: {{ wallet.address }}</span>
          <span class="inline-block relative top-1"
            ><img src="@/assets/images/copy.svg" width="20" height="20"
          /></span>
        </div>
        <div class="break-all font-medium text-base">
          Balance: {{ wallet.balance }}
        </div>
      </div>
      <div class="w-full bg-white rounded-xl mx-auto my-4 p-8">
        <div class="break-all font-bold text-lg mb-4">
          <div class="mb-4">Send ETH</div>
          <form v-if="!sending" onsubmit="return false;">
            <div class="mb-4">
              <label
                class="block text-gray-700 text-base font-bold mb-2"
                for="address"
              >
                Address:
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                type="text"
                placeholder="Enter ETH address"
                @input="onAddressInput"
              />
            </div>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-base font-bold mb-2"
                for="amount"
              >
                Amount:
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="amount"
                type="number"
                placeholder="Enter amount"
                @input="onAmountInput"
              />
            </div>
            <div class="flex items-center justify-end">
              <button
                class="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                @click="sendEth"
              >
                Send
              </button>
            </div>
          </form>
          <div v-else>Loading...</div>
        </div>
      </div>
      <div class="w-full bg-white rounded-xl mx-auto my-4 p-8">
        <table
          class="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Txn Hash</th>
              <th scope="col" class="px-6 py-3">Block</th>
              <th scope="col" class="px-6 py-3">From</th>
              <th scope="col" class="px-6 py-3">To</th>
              <th scope="col" class="px-6 py-3">Value</th>
              <th scope="col" class="px-6 py-3">Fee</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="tx in transactions"
              :key="tx.hash"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td class="px-6 py-4">{{ tx.hash | truncate(20, 4, 4) }}</td>
              <td class="px-6 py-4">{{ tx.blockNumber }}</td>
              <td class="px-6 py-4">{{ tx.from | truncate(20, 4, 4) }}</td>
              <td class="px-6 py-4">{{ tx.to | truncate(20, 4, 4) }}</td>
              <td class="px-6 py-4">{{ tx.value / 1e18 }}</td>
              <td class="px-6 py-4">{{ (tx.gasPrice * tx.gasUsed) / 1e18 }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  computed: {
    wallet() {
      return this.$store.state.wallet.walletInfo;
    },
  },
  data() {
    return {
      transactions: [],
      addressInput: "",
      amountInput: 0,
      sending: false,
    };
  },
  async mounted() {
    await this.$store.dispatch("wallet/getBalance");

    try {
      const address = this.$store.state.wallet.walletInfo.address;
      if (address) {
        const res = await this.$axios.$get(
          "https://api-rinkeby.etherscan.io/api",
          {
            params: {
              apikey: process.env.NUXT_ENV_ETHERSCAN_API_KEY,
              module: "account",
              action: "txlist",
              address: address,
              sort: "asc",
            },
          }
        );
        if (res.status === "1") {
          this.transactions = res.result;
        }
      }
    } catch (err) {
      console.log("error in fetching txs", err);
    }
  },
  methods: {
    async copyToClipboard() {
      await navigator.clipboard.writeText(this.wallet.address);
    },
    onAddressInput(event) {
      this.addressInput = event.target.value;
      console.log(this.addressInput);
    },
    onAmountInput(event) {
      this.amountInput = event.target.value;
      console.log(this.amountInput);
    },
    async sendEth() {
      const payload = {
        address: this.addressInput,
        amount: this.amountInput,
      };
      try {
        this.sending = true;
        await this.$store.dispatch("wallet/sendEth", payload);
        await this.$store.dispatch("wallet/getBalance");
        this.sending = false;
      } catch (err) {
        console.log("error in send: ", err.message);
      }
    },
  },
});
</script>
