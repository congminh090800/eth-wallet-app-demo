<template>
  <div class="w-full p-4 bg-gray-100">
    <main
      role="main"
      class="w-full flex flex-col h-screen content-center justify-center"
    >
      <div class="w-full sm:w-1/2 bg-white rounded-xl m-auto p-8">
        <div class="font-bold text-3xl text-center">
          Choose your way to get started!
        </div>
        <div class="pt-5">
          <div
            v-if="wallet && wallet.address"
            class="relative z-10 before:-z-10 my-4 block p-[4px] cursor-pointer rounded-2xl before:rounded-2xl before:transition-all before:hover:w-full before:h-full before:top-0 before:left-0 before:absolute before:w-0 before:bg-gradient-to-r before:from-[#6EE7B7] before:to-[#3B82F6] shadow-md"
          >
            <NuxtLink to="/wallet">
              <div
                class="p-4 rounded-xl overflow-hidden bg-gradient-to-r from-[#6EE7B7] to-[#ffffff] shadow-md border border-none"
              >
                <h5
                  class="break-all text-xl font-medium tracking-tight text-gray-900"
                >
                  Keep using wallet {{ wallet.address }}
                </h5>
              </div>
            </NuxtLink>
          </div>
          <div
            class="relative z-10 before:-z-10 my-4 block p-[4px] cursor-pointer rounded-2xl before:rounded-2xl before:transition-all before:hover:w-full before:h-full before:top-0 before:left-0 before:absolute before:w-0 before:bg-gradient-to-r before:from-[#6EE7B7] before:to-[#3B82F6] shadow-md"
          >
            <NuxtLink to="/create">
              <div
                class="p-4 rounded-xl overflow-hidden bg-white border border-none"
              >
                <h5 class="text-xl font-medium tracking-tight text-gray-900">
                  Create new wallet
                </h5>
              </div>
            </NuxtLink>
          </div>
          <div
            class="relative z-10 before:-z-10 my-4 block p-[4px] cursor-pointer rounded-2xl before:rounded-2xl before:transition-all before:hover:w-full before:h-full before:top-0 before:left-0 before:absolute before:w-0 before:bg-gradient-to-r before:from-[#6EE7B7] before:to-[#3B82F6] shadow-md"
          >
            <NuxtLink to="/import">
              <div
                class="p-4 rounded-xl overflow-hidden bg-white border border-none"
              >
                <h5 class="text-xl font-medium tracking-tight text-gray-900">
                  Import existing wallet
                </h5>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getProvider } from "~/utils/ethers-helper";

export default Vue.extend({
  name: "IndexPage",
  head() {
    return {
      title: "An easy to go ETH wallet",
    };
  },
  computed: {
    wallet() {
      return this.$store.state.wallet.walletInfo;
    },
  },
});
</script>
