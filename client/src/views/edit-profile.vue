<template>
  <main class="flex flex-col gap-0 border border-gray-400 w-[1080px]">
    <header-component></header-component>
    <div class="flex-1 overflow-auto h-[700px] bg-white shadow-md p-4" v-motion-fade>
      <div
        class="flex flex-row w-full justify-between items-center gap-4 border-b pb-2 border-gray-400"
      >
        <div class="flex gap-2">
          <router-link
            to="/chat"
            class="bg-slate-100 px-3 py-1.5 border border-slate-400 text-[#29487d] font-bold cursor-pointer flex items-center gap-2 hover:bg-slate-200 hover:translate-y-[-1.5px] duration-200"
          >
            <ph-arrow-bend-down-left></ph-arrow-bend-down-left>
            Back
          </router-link>

          <button
            style="background: linear-gradient(rgb(98, 122, 173), rgb(89, 114, 168))"
            @click="saveHandler"
            class="bg-[#29487d] text-white px-3 py-1.5 border border-slate-400 font-bold cursor-pointer flex items-center gap-2 hover:translate-y-[-1.5px] duration-200"
          >
            <ph-floppy-disk></ph-floppy-disk>
            Save
          </button>
        </div>

        <h2 class="font-bold text-[#29487d] text-end">edit profile</h2>
      </div>

      <!-- form -->
      <div class="flex flex-col justify-center mt-2">
        <div class="w-full flex justify-between gap-8 items-center">
          <img src="/def_pfp_1.jpg" alt="" class="object-cover w-20 h-20" />

          <div class="flex-1 flex flex-col gap-2 p-2">
            <input
              type="file"
              @change="fileHandler"
              accept=".jpg, .png"
              class="bg-gray-100 p-2 border border-gray-400 w-full cursor-pointer hover:translate-y-[-3px] hover:shadow-md duration-200"
            />
            <div>
              <label for="username" class="block font-bold">username</label>
              <input
                type="text"
                id="username"
                v-model="username"
                class="border w-full border-gray-400 outline-none p-2 shadow-inner focus:translate-y-[-1.2px] focus:border-gray-900 focus:shadow-none duration-200"
              />
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-5">
          <!-- display name -->
          <div>
            <label for="displayName" class="block font-bold">display name</label>
            <input
              type="text"
              id="displayName"
              v-model="displayName"
              placeholder="the name displayed in chats"
              class="border w-full border-gray-400 outline-none p-2 shadow-inner focus:shadow-none"
            />
          </div>
          <!-- about me -->
          <div>
            <label for="aboutMe" class="block font-bold">about me</label>
            <textarea
              name=""
              id="aboutMe"
              v-model="aboutMe"
              class="border w-full border-gray-400 outline-none p-2 shadow-inner focus:shadow-none"
            ></textarea>
            <small class="text-gray-500">(max 200 characters)</small>
          </div>
          <!-- gemder -->
          <div>
            <label for="gender" class="block font-bold">gender</label>
            <select
              name=""
              id="gender"
              v-model="gender"
              class="border w-full border-gray-400 outline-none p-2 shadow-inner focus:shadow-none"
            >
              <option disabled selected>----- please select -----</option>
              <option value="Male">male</option>
              <option value="Female">female</option>
              <option value="Other">other</option>
            </select>
          </div>

          <!-- country -->
          <div>
            <label for="gender" class="block font-bold">country</label>
            <select
              name=""
              id="gender"
              v-model="country"
              class="border w-full border-gray-400 outline-none p-2 shadow-inner focus:shadow-none"
            >
              <option disabled selected>----- please select -----</option>
              <option v-for="country in countries" :value="country">{{ country }}</option>
            </select>
          </div>

          <!-- likes -->
          <div>
            <label for="aboutMe" class="block font-bold">likes</label>
            <textarea
              name=""
              id="aboutMe"
              v-model="likes"
              class="border w-full border-gray-400 outline-none p-2 shadow-inner focus:shadow-none"
            ></textarea>
            <small class="text-gray-500">(max 200 characters)</small>
          </div>

          <!-- dislikes -->
          <div>
            <label for="dislikes" class="block font-bold">dislikes</label>
            <textarea
              name=""
              id="dislikes"
              v-model="dislikes"
              class="border w-full border-gray-400 outline-none p-2 shadow-inner focus:shadow-none"
            ></textarea>
            <small class="text-gray-500">(max 200 characters)</small>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.header {
  background: linear-gradient(to bottom, #4e69a2, #3b5998);
}
* {
  font-size: 12px;
}
</style>

<script>
// TODO (PRIORITY): IMPLEMENT CROPPER JS FOR PROFILE PICTURE
import { PhArrowBendDownLeft, PhFloppyDisk } from "@phosphor-icons/vue";
import userApi from "@/utils/api/user.api";
import HeaderComponent from "@/components/header-component.vue";
import { useStore } from "@/store";

export default {
  data() {
    return {
      countries: [
        "Afghanistan",
        "Armenia",
        "Azerbaijan",
        "Bahrain",
        "Bangladesh",
        "Bhutan",
        "Brunei",
        "Cambodia",
        "China",
        "Cyprus",
        "Georgia",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Israel",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Lebanon",
        "Malaysia",
        "Maldives",
        "Mongolia",
        "Myanmar",
        "Nepal",
        "North Korea",
        "Oman",
        "Pakistan",
        "Palestine",
        "Philippines",
        "Qatar",
        "Saudi Arabia",
        "Singapore",
        "South Korea",
        "Sri Lanka",
        "Syria",
        "Taiwan",
        "Tajikistan",
        "Thailand",
        "Timor-Leste",
        "Turkey",
        "Turkmenistan",
        "United Arab Emirates",
        "Uzbekistan",
        "Vietnam",
        "Yemen",
      ],
      username: "", // instead of null
      imageFile: null, // this one is fine as null
      displayName: "",
      aboutMe: "",
      gender: "",
      country: "",
      likes: "",
      dislikes: "",
    };
  },
  components: {
    HeaderComponent,
    PhFloppyDisk,
    PhArrowBendDownLeft,
  },
  computed: {
    authStore() {
      return useStore();
    },
  },

  methods: {
    async fetchUser() {
      // const user = await userApi.getMe();
      // const user = this.$store.state.user;
      const user = this.authStore.getUser;
      this.username = user.username;
    },

    fileHandler(e) {
      this.imageFile = e.target.files[0];
    },

    async saveHandler() {
      alert("processing");
      const formData = new FormData();
      if (this.imageFile) formData.append("imageFile", this.imageFile);
      if (this.username) formData.append("username", this.username);
      if (this.displayName) formData.append("displayName", this.displayName);
      if (this.aboutMe) formData.append("aboutMe", this.aboutMe);
      if (this.gender) formData.append("gender", this.gender);
      if (this.country) formData.append("country", this.country);
      if (this.likes) formData.append("likes", this.likes);
      if (this.dislikes) formData.append("dislikes", this.dislikes);

      // await userApi.updateProfile(formData);
    },
  },
  mounted() {
    this.fetchUser();
  },
};
</script>
