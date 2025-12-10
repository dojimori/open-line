<template>
  <!-- Users List Section -->
  <div v-motion-slide-left class="bg-white shadow-lg lg:w-[170px]">
    <div>
      <h2 class="header p-2 font-bold text-white text-center">Active Users</h2>
      <div class="flex flex-col">
        <!-- TODO: replace with your actual user list -->
        <div class="flex items-center cursor-pointer gap-2 p-2">
          <!-- <div class="w-8 h-8 bg-blue-200 rounded-full"></div> -->
          <img src="/def_pfp_2.jpg" class="pfp" />
          <span class="text-xs">nko</span>

          <span class="w-2 h-2 rounded-full bg-green-600"></span>
        </div>
        <div class="flex items-center gap-2 cursor-pointer p-2">
          <img src="/def_pfp_3.jpg" class="pfp" />
          <span class="text-xs">yohiori</span>
          <span class="w-2 h-2 rounded-full bg-green-600"></span>
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
