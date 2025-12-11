<template>
  <!-- Users List Section -->
  <div v-motion-slide-left class="bg-white shadow-lg lg:w-[170px]">
    <div>
      <h2 class="header p-2 font-bold text-white text-center">Active Users</h2>
      <div class="flex flex-col">
        <!-- TODO: this will be clickable and redirect to user's profile page :) -->
        <div
          v-for="user in activeUsers"
          class="p-2 flex gap-5 hover:bg-gray-100 cursor-pointer"
        >
          <img
            :src="
              user.profilePicture
                ? `http://localhost:8080${user.profilePicture}`
                : '/def_pfp_6.jpg'
            "
            class="pfp border-2 border-gray-400"
          />

          <h4>{{ user.username }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  background: linear-gradient(to bottom, #4e69a2, #3b5998);
}

.pfp {
  max-width: 28px;
  max-height: 28px;
  object-fit: cover;
}
</style>

<script>
export default {
  props: {
    activeUsers: {
      type: Array,
      required: true,
    },
  },
};
</script>
