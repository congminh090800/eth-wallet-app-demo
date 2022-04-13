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
      <div class="w-full sm:w-2/3 bg-white rounded-xl mx-auto my-4 p-8">
        <div
          v-if="error"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong class="font-bold">Error!</strong>
          <span class="block sm:inline">{{ error }}</span>
          <span
            @click="() => (error = '')"
            class="absolute top-0 bottom-0 right-0 px-4 py-3"
          >
            <svg
              class="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path
                d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
              />
            </svg>
          </span>
        </div>
        <div class="font-bold text-2xl text-center mb-8">Import wallet</div>
        <div>
          <div class="mb-3 w-full px-12">
            <div class="flex my-4 flex-row-reverse">
              <select
                class="block w-1/2 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label="import-wallet"
                v-model="type"
              >
                <option value="mnemonic">Mnemonic</option>
                <option value="privateKey">Private key</option>
              </select>
              <label>Import using:&nbsp;</label>
            </div>
            <textarea
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Your message"
              @input="onPhraseChange"
            ></textarea>
          </div>
          <div class="px-12">
            <button
              @click="generateWallet"
              class="w-full bg-emerald-300 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Access my wallet
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  head() {
    return {
      title: "Import wallet",
    };
  },
  data() {
    return {
      payload: "",
      type: "mnemonic",
      error: "",
      wallet: null,
    };
  },
  methods: {
    onPhraseChange(event) {
      this.payload = event.target.value;
    },
    generateWallet() {
      try {
        this.error = "";
        this.wallet = this.$store.dispatch("wallet/importWallet", {
          type: this.type,
          payload: this.payload,
        });
        if (this.wallet) {
          this.$router.push("/wallet");
        }
      } catch (err) {
        this.error = err.message;
      }
    },
  },
});
</script>
