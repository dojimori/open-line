<template>
  <!-- header -->
  <div class="header w-full py-2.5 px-4 flex md:flex-row flex-col justify-between items-center">
    <h1 class="text-white font-bold">> Open Line</h1>

    <div>
      <router-link to="/chat" class="header-btn hover:translate-y-[-1.5px] cursor-pointer">
        <ph-globe></ph-globe>
        open line
      </router-link>

      <router-link to="/chat" class="header-btn hover:translate-y-[-1.5px] cursor-pointer">
        <ph-user></ph-user>
        profile
      </router-link>

      <router-link to="/profile/edit" class="header-btn hover:translate-y-[-1.5px] cursor-pointer">
        <ph-pencil-simple></ph-pencil-simple>
        edit profile
      </router-link>

      <button class="header-btn hover:translate-y-[-1.5px] cursor-pointer" @click="logout">
        <ph-sign-out></ph-sign-out>
        Logout
      </button>
    </div>
  </div>
</template>

<script>
import { PhSignOut, PhPencilSimple, PhGlobe, PhUser } from "@phosphor-icons/vue";
import authApi from "@/utils/api/auth.api";
import { socket } from "@/utils/socket";
import { useStore } from "@/store";

export default {
  components: {
    PhPencilSimple,
    PhSignOut,
    PhGlobe,
    PhUser,
  },

  // props: {
  //   logout: {
  //     type: Function,
  //     required: true,
  //   },
  // },

  computed: {
    store() {
      return useStore();
    },
  },

  methods: {
    async logout() {
      try {
        await authApi.logout();
        // this.store.isAuthenticated = false;
        // this.store.user = null;
        this.store.clearUser();
        this.$router.push("/");
        socket.emit("left");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
