<template>
  <div class="multistep-form">
    <div class="mb-1 text-base font-medium text-emerald-300">
      {{ steps[currentStep].name }} ({{ currentStep + 1 }} / {{ steps.length }})
    </div>
    <div class="w-full bg-gray-200 rounded-full h-2.5">
      <div
        class="bg-emerald-300 h-2.5 rounded-full"
        :style="{ width: `${((currentStep + 1) / steps.length) * 100}%` }"
      ></div>
    </div>
    <h6 class="mt-4 text-gray-400 font-medium">
      Step {{ currentStep + 1 }}. {{ steps[currentStep].name }}
    </h6>
    <component
      @next="() => currentStep++"
      @back="() => currentStep--"
      :is="steps[currentStep].component"
      class="mt-2"
    >
    </component>
  </div>
</template>

<script>
import ShowPassphrase from "@/components/create-wallet/show-passphrase.vue";
import Verification from "@/components/create-wallet/verification.vue";
import WellDoneNotification from "@/components/create-wallet/well-done-notification.vue";
import Vue from "vue";
export default Vue.extend({
  components: {
    ShowPassphrase,
    Verification,
    WellDoneNotification,
  },
  data() {
    return {
      steps: [
        {
          name: "Write down the words",
          component: ShowPassphrase,
        },
        {
          name: "Verification",
          component: Verification,
        },
        {
          name: "Well done",
          component: WellDoneNotification,
        },
      ],
      currentStep: 0,
    };
  },
});
</script>
<style></style>
