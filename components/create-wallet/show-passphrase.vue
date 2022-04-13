<template>
  <div v-if="wallet.mnemonic" class="show-passphrase">
    <div
      class="cursor-pointer text-right mb-1 text-emerald-300 flex flex-row-reverse"
      @click="renewPassphrase"
    >
      Generate new passphrase&nbsp;
      <img src="@/assets/images/refresh.svg" width="20" height="20" />
    </div>
    <div class="rounded-lg border-emerald-300 border p-4 mb-4">
      <div class="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
        <div
          v-for="(word, index) in wallet.mnemonic.phrase.split(' ')"
          :key="index"
        >
          {{ index + 1 }}. {{ word }}
          <hr />
        </div>
      </div>
    </div>
    <div class="px-12">
      <button
        @click="$emit('next')"
        class="w-full bg-emerald-300 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-full"
      >
        I have written down these words
      </button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  computed: {
    wallet() {
      return this.$store.state.wallet.preCreateWallet || {};
    },
  },
  mounted() {
    this.$store.dispatch("wallet/initWallet");
  },
  methods: {
    renewPassphrase() {
      this.$store.dispatch("wallet/initWallet");
    },
  },
});
</script>
