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
        <div class="font-bold text-2xl text-center mb-8">
          Create Wallet with Mnemonic Phrase
        </div>
        <CreateWalletMultistepForm></CreateWalletMultistepForm>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  head() {
    return {
      title: "Create wallet",
    };
  },
});
</script>
