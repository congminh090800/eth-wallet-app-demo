<template>
  <div class="px-12">
    <button
      @click="accessWallet"
      class="w-full bg-emerald-300 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-full"
    >
      Access your wallet
    </button>
    <button
      @click="$router.push('/')"
      class="mt-4 w-full bg-neutral-400 hover:bg-neutral-700 text-white font-bold py-2 px-4 rounded-full"
    >
      Go back to landing page
    </button>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  methods: {
    accessWallet() {
      this.$store.dispatch("wallet/usePreCreateWallet");
      this.$router.push("/wallet");
    },
  },
});
</script>
