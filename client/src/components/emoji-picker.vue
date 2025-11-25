<template>
  <Transition>
    <div
      v-if="showEmoji"
      class="absolute bottom-full right-30 z-10 mb-2 bg-gray-100 rounded-xs border border-gray-200 p-4 w-[200px]"
    >
      <div class="flex flex-row gap-5">
        <div v-for="emoji in availableEmojis">
          <button type="button" @click="clickHandler(emoji)">
            <img :src="emoji.path" alt="" class="emoji" />
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  scale: 1.1;
  transition: all 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  scale: 0;
}

.emoji:hover {
  scale: 1.2;
}

.emoji {
  width: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  object-fit: cover;
}
</style>

<script>
export default {
  props: {
    showEmoji: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      availableEmojis: [
        { path: "/assets/emojis/heart_face.png", emoji: "😍" },
        { path: "/assets/emojis/crying_face.png", emoji: "😭" },
      ],
    };
  },

  methods: {
    clickHandler({ emoji }) {
      //   console.log(emoji);
      this.$emit("emoji-selected", emoji);
    },
  },
};
</script>
