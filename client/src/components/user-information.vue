<template>
  <!-- user profile section -->
  <div
    class="bg-white border border-gray-200 p-4 shadow-lg md:w-[250px] w-full overflow-y-auto"
  >
    <div>
      <div class="mb-2 flex flex-row items-center justify-between">
        <h2 class="font-bold text-[#29487d]">Me</h2>
        <router-link
          to="/profile/edit"
          class="bg-slate-100 px-3 py-1.5 border border-slate-400 text-[#29487d] font-bold cursor-pointer flex items-center gap-2 hover:bg-slate-200 hover:translate-y-[-3px] duration-200"
        >
          <ph-pencil-simple></ph-pencil-simple>
          edit profile
        </router-link>
      </div>
      <div class="border-t border-gray-400 mb-2"></div>
    </div>

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
