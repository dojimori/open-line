<template>
  <!-- user profile section -->
  <div
    v-motion-slide-right
    class="bg-white border border-gray-200 p-4 shadow-lg md:w-[200px] w-full overflow-y-auto"
  >
    <div v-if="user" class="flex flex-col items-center justify-center">
      <!-- pfp -->
      <img
        :src="
          user.profile.profilePicture
            ? `http://localhost:8080${user.profile.profilePicture}`
            : '/def_pfp_6.jpg'
        "
        class="pfp border-2 border-gray-400"
      />
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
          <span class="text-xs text-gray-500">{{ user.createdAt }}</span>
        </div>

        <!-- gender -->
        <div class="flex justify-between">
          <span class="font-bold text-gray-600">gender</span>
          <span v-if="!user.profile.gender || user.profile.gender == 'null'">-</span>
          <span v-else>{{ user.profile.gender }}</span>
        </div>

        <!-- country -->
        <div class="flex justify-between">
          <span class="font-bold text-gray-600">country</span>
          <span v-if="!user.profile.country || user.profile.country == 'null'">-</span>
          <span v-else>{{ user.profile.country }}</span>
        </div>

        <!-- relationships -->
        <div class="flex justify-between">
          <span class="font-bold text-gray-600">relationship</span>
          <span v-if="!user.profile.relationship || user.profile.relationship == 'null'"
            >-</span
          >
          <span v-else>{{ user.profile.relationship }}</span>
        </div>

        <!-- interested in -->
        <div class="flex justify-between">
          <span class="font-bold text-gray-600">interested in</span>
          <span v-if="!user.profile.interests || user.profile.interests == 'null'"
            >-</span
          >
          <span v-else>{{ user.profile.interests }}</span>
        </div>

        <!-- likes -->
        <div :class="['flex justify-between', { 'flex-col gap-2': user.profile.likes }]">
          <span class="font-bold text-gray-600">likes</span>
          <span v-if="!user.profile.likes">-</span>
          <span
            v-else
            class="bg-blue-500/5 p-2 border border-gray-300 rounded-sm hover:-translate-y-1 cursor-pointer duration-150"
            >{{ user.profile.likes }}</span
          >
        </div>

        <!-- dislikes -->
        <div
          :class="['flex justify-between', { 'flex-col gap-2': user.profile.dislikes }]"
        >
          <span class="font-bold text-gray-600">dislikes</span>
          <span v-if="!user.profile.dislikes">-</span>
          <span
            v-else
            class="bg-blue-500/5 p-2 border border-gray-300 rounded-sm hover:-translate-y-1 cursor-pointer duration-150"
            >{{ user.profile.dislikes }}</span
          >
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
import { useStore } from "@/store";
export default {
  data() {
    return {
      user: null,
    };
  },

  components: {
    PhPencilSimple,
  },

  computed: {
    store() {
      return useStore();
    },
  },

  async mounted() {
    // this.user = await userApi.getMe();
    // this.user = this.$store.state.user;
    this.user = this.store.getUser;
  },
};
</script>
