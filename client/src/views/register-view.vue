<template>
  <form
    v-motion-fade
    class="bg-white p-4 w-[300px] border border-slate-400 shadow-md"
    @submit.prevent="register"
  >
    <h4 class="text-4xl font-bold text-center">Register</h4>
    <div class="border w-full border-gray-300"></div>
    <div class="flex items-center justify-center">
      <span
        v-motion-fade
        v-if="errorMessage"
        class="flex-1 bg-red-100 border border-red-300-300 p-2 text-red-800 shadow-inner mt-2"
        >{{ errorMessage }}</span
      >
    </div>

    <div class="mt-2">
      <input
        type="text"
        placeholder="Username"
        v-model="username"
        name="username"
        :disabled="isLoading"
        class="border border-gray-400 px-4 py-1.5 w-full shadow-inner outline-none"
      />

      <input
        type="password"
        placeholder="Password"
        v-model="password"
        :disabled="isLoading"
        name="password"
        class="border border-gray-400 px-4 py-1.5 w-full shadow-inner outline-none mt-2"
      />

      <button
        :disabled="isLoading"
        class="w-full p-1.5 text-white mt-2 shadow-inner flex items-center justify-center cursor-pointer hover:shadow-md enter-btn"
      >
        <vue-spinner v-if="isLoading" size="20"></vue-spinner>
        <span v-else class="font-bold tracking-wider">register</span>
      </button>
      <router-link to="/" class="flex-1 text-center">
        <button
          :disabled="isLoading"
          class="text-[#29487d] w-full p-1.5 mt-2 shadow-inner border border-gray-200 cursor-pointer hover:scale-105 duration-200 transition-all ease-in flex items-center gap-2"
        >
          <i class="ph ph-arrow-left text-gray-600"></i>

          <span class="font-bold">back</span>
        </button>
      </router-link>
    </div>
  </form>

  <div class="w-full text-center">
    <small class="cursor-pointer">
      <a href="https://github.com/dojimori" target="_blank" class="text-center underline">
        github
      </a>
      |
      <a
        href="https://www.facebook.com/jo.jyn626"
        target="_blank"
        class="text-center underline"
      >
        facebook
      </a>
    </small>
  </div>
</template>

<style scoped>
.enter-btn {
  background-color: #29487d;
  background: linear-gradient(rgb(98, 122, 173), rgb(89, 114, 168));
  transition: all 0.3s ease;
}

.enter-btn:hover {
  scale: 1.1;
  transform: rotate(1deg);
}

input {
  animation: default 0.3s forwards;
}

input:focus {
  animation: lift 0.3s forwards;
}

@keyframes lift {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-4px);
  }
}

@keyframes default {
  from {
    transform: translateY(-4px);
  }

  to {
    transform: translateY(0);
  }
}
</style>

<script>
import { VueSpinner } from "vue3-spinners";
// import api from "@/utils/api";
import authApi from "@/utils/api/auth.api";

export default {
  name: "RegisterView",
  data() {
    return {
      username: "",
      password: "",
      isLoading: false,
      errorMessage: null,
    };
  },
  components: {
    VueSpinner,
  },

  methods: {
    // submitHandler() {
    //   if (!this.username.trim()) return;
    //   localStorage.setItem("username", this.username.trim());
    //   this.$router.push("/chat");
    // },

    async register() {
      try {
        this.isLoading = true;
        // const response = await fetch("http://localhost:8080/api/auth/register", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     username: this.username,
        //     password: this.password,
        //   }),
        // });

        const { data } = await authApi.register(this.username, this.password);

        // const data = await response.json();
        // const { data } = response;
        // console.log(response);
        // if (response.status == 409 || response.status == 500) {
        //   this.errorMessage = data.message || "Something wen't terribly wrong :(";
        //   return;
        // }

        this.$router.push({ name: "login", query: { message: data.message } });
      } catch (error) {
        this.errorMessage =
          error.response.data.message || "Something wen't terribly wrong :(";
        console.error("error", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
