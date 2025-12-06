<template>
  <!-- header -->
  <div class="header w-full py-2.5 px-4 flex flex-row justify-between">
    <h1 class="text-white font-bold">> Open Line</h1>

    <div>
      <router-link
        to="/chat"
        class="header-btn hover:translate-y-[-1.5px] cursor-pointer"
      >
        <ph-globe></ph-globe>
        open line
      </router-link>
      <router-link
        to="/profile/edit"
        class="header-btn hover:translate-y-[-1.5px] cursor-pointer"
      >
        <ph-pencil-simple></ph-pencil-simple>
        edit profile
      </router-link>

      <button
        class="header-btn hover:translate-y-[-1.5px] cursor-pointer"
        @click="logout"
      >
        <ph-sign-out></ph-sign-out>
        Logout
      </button>
    </div>
  </div>
</template>

<script>
import { PhSignOut, PhPencilSimple, PhGlobe } from "@phosphor-icons/vue";
import authApi from "@/utils/api/auth.api";
export default {
  components: {
    PhPencilSimple,
    PhSignOut,
    PhGlobe,
  },

  methods: {
    async logout() {
      // localStorage.removeItem("user");
      // await fetch("http://localhost:8080/api/auth/logout", {
      //   method: "POST",
      //   credentials: "include",
      // });

      await authApi.logout();

      socket.emit("left");

      this.$router.push("/");
    },
  },
};
</script>
