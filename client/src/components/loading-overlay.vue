<template>
  <Transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-show="loading"
      class="absolute z-100 top-0 left-0 w-screen h-screen bg-white/50 flex gap-2 flex-col items-center justify-center"
    >
      <vue-spinner-beat color="#29487d"></vue-spinner-beat>
      <small class="text-[#29487d]">Please wait...</small>
    </div>
  </Transition>
</template>

<script>
import { VueSpinnerBeat } from "vue3-spinners";
import { Transition } from "vue";
export default {
  components: {
    VueSpinnerBeat,
    Transition,
  },

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
