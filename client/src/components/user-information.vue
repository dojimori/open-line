<template>
  <!-- user profile section -->
  <div
    v-motion-slide-right
    class="bg-white border border-gray-200 p-4 shadow-lg md:w-[200px] w-full overflow-y-auto"
  >
    <div v-if="user" class="flex flex-col items-center justify-center">
      <!-- pfp -->
      <img src="/def_pfp_6.jpg" class="pfp" />
      <!-- username -->
      <h1 class="mt-4 font-bold">
        {{ user.username }}
        <small class="block font-normal text-gray-600">@{{ user.username }}</small>
      </h1>
      <!-- bio -->
      <div class="my-4 border-b border-gray-400 w-full text-center">
        <span><i>no bio yet...</i></span>
      </div>
      <!-- end bio -->

      <!-- user info's -->
      <div class="w-full flex flex-col gap-3">
        <!-- joined at -->
        <div class="flex justify-between">
          <span class="font-bold text-gray-600">joined at</span>
          <span>11/24/2025</span>
        </div>

        <!-- gender -->
        <div class="flex justify-between">
          <span class="font-bold text-gray-600">gender</span>
          <span>-</span>
        </div>

        <!-- country -->
        <div class="flex justify-between">
          <span class="font-bold text-gray-600">country</span>
          <span>-</span>
        </div>

        <!-- relationships -->
        <div class="flex justify-between">
          <span class="font-bold text-gray-600">relationships</span>
          <span>-</span>
        </div>

        <!-- interested in -->
        <div class="flex justify-between">
          <span class="font-bold text-gray-600">interested in</span>
          <span>-</span>
        </div>

        <!-- likes -->
        <div class="flex justify-between">
          <span class="font-bold text-gray-600">likes</span>
          <span>-</span>
        </div>

        <!-- dislikes -->
        <div class="flex justify-between">
          <span class="font-bold text-gray-600">dislikes</span>
          <span>-</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pfp {
  width: 75px;
}
* {
  font-size: 12px;
}
</style>

<script>
import userApi from "@/utils/api/user.api";
// import { PhPencilSimple } from "@phosphor-icons";
import { PhPencilSimple } from "@phosphor-icons/vue";

export default {
  data() {
    return {
      user: null,
    };
  },

  components: {
    PhPencilSimple,
  },

  async mounted() {
    this.user = await userApi.getMe();
  },
};
</script>
