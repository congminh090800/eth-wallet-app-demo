<template>
  <div>
    <div class="mb-3 w-full px-12">
      <label
        for="exampleFormControlTextarea1"
        class="form-label inline-block mb-2 text-gray-700"
        >Confirm your passphrase by writing it down here
      </label>
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
        :disabled="inputPassphrase.trim() != passphrase"
        @click="$emit('next')"
        class="w-full bg-emerald-300 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Verify
      </button>
      <button
        @click="$emit('back')"
        class="mt-4 w-full bg-neutral-400 hover:bg-neutral-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Back
      </button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  computed: {
    passphrase() {
      return this.$store.state.wallet?.preCreateWallet?.mnemonic?.phrase || "";
    },
  },
  mounted() {
    console.log("passphrase:", this.passphrase);
  },
  data() {
    return {
      inputPassphrase: "",
    };
  },
  methods: {
    onPhraseChange(event) {
      this.inputPassphrase = event.target.value;
    },
  },
});
</script>
