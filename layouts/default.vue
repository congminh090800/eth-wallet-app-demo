<template>
  <Nuxt />
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  head() {
    return {
      titleTemplate: "My ETH Wallet - %s",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Lê Phan Công Minh",
        },
      ],
    };
  },
});
</script>

<style></style>
