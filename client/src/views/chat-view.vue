<template>
  <!-- main window -->
  <div class="flex flex-col md:flex-row justify-center gap-2 w-full mx-auto p-4">
    <!-- user profile section -->
    <div class="bg-white border border-gray-200 p-4 shadow-lg md:w-[250px] w-full">
      <div>
        <h2 class="font-bold text-[#29487d] mb-4 border-b border-gray-300 pb-2">Me</h2>
        <div class="flex flex-col gap-2"></div>
      </div>
    </div>

    <!-- Chat Section -->
    <div class="flex-1 bg-white shadow-lg shadow-blue-100 w-[600px]">
      <!-- chat box -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 100 }"
        :enter="{ opacity: 1, y: 0 }"
        :duration="300"
        class="shadow-xl"
      >
        <!-- chat header -->
        <div class="text-center border-b border-gray-300 py-2 flex justify-between px-2">
          <h2 class="font-bold text-[#29487d]">Open Line</h2>
          <button
            @click="logout"
            class="logout-btn text-white py-0.5 px-1.5 cursor-pointer rounded-sm"
          >
            logout
          </button>
        </div>

        <!-- chat-body -->
        <div class="h-[60vh] p-2 flex flex-col gap-3 overflow-y-scroll" ref="chatBox">
          <div
            v-motion
            :initial="{ opacity: 0, x: -50 }"
            :enter="{ opacity: 1, x: 0 }"
            :duration="400"
            v-for="(data, index) in messages"
            :key="index"
            class="flex flex-col p-1.5 gap-1"
          >
            <!-- chat message -->
            <div v-if="data.type == 'chat'">
              <div class="flex flex-row flex-wrap gap-4">
                <img src="/def_pfp_6.jpg" class="pfp" />
                <span
                  class="flex break-all items-center text-xs bg-blue-50 border border-blue-100 px-2.5 py-0.5 cursor-pointer message-box max-w-[300px]"
                  v-html="renderMessage(data.message)"
                >
                </span>
              </div>
              <p
                :class="[
                  'font-bold text-[#29487d] mt-2',
                  { 'text-green-600': data.userId == user.id },
                ]"
              >
                <small class="mr-2">{{
                  data.userId == user.id ? "You" : data.username
                }}</small>
                <small class="text-gray-400 font-light">{{ data.time }}</small>
              </p>
            </div>
            <!-- joined message -->
            <div v-else class="text-center">
              <small class="text-gray-600">{{ data.message }}</small>
            </div>
          </div>
        </div>

        <!-- chat actions -->
        <form
          class="flex gap-2 p-2 bg-gray-100 border-t-2 border-gray-200 relative"
          @submit.prevent="sendMessage"
        >
          <span
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1 }"
            :leave="{ opacity: 0 }"
            v-if="isTyping"
            class="w-full text-center text-gray-500 absolute bottom-full"
          >
            <small>{{ typingText }}</small>
          </span>
          <input
            v-model="message"
            ref="messageInput"
            placeholder="Type a message..."
            type="text"
            @input="onTyping"
            @blur="onStopTyping"
            class="flex-1 shadow-inner outline-none border border-gray-200 p-2 text-sm bg-gray-50 rounded-xs"
          />

          <emoji-picker
            :showEmoji="showEmoji"
            @emoji-selected="emojiHandler"
          ></emoji-picker>

          <button
            type="button"
            @click="showEmoji = !showEmoji"
            class="emoji-btn text-xs cursor-pointer text-gray-600 mx-2"
          >
            <i class="ph ph-smiley text-lg"></i>
          </button>

          <button
            type="submit"
            class="send-btn text-xs cursor-pointer text-white p-2 shadow-inner"
          >
            send
          </button>
        </form>
      </div>
    </div>

    <!-- Users List Section -->
    <div class="bg-white border border-gray-200 p-4 shadow-lg md:w-[250px] w-full">
      <div>
        <h2 class="font-bold text-[#29487d] mb-4 border-b border-gray-300 pb-2">
          Active Users
        </h2>
        <div class="flex flex-col gap-2">
          <!-- TODO: replace with your actual user list -->
          <div
            class="flex items-center cursor-pointer gap-2 p-2 hover:bg-gray-50 rounded"
          >
            <!-- <div class="w-8 h-8 bg-blue-200 rounded-full"></div> -->
            <img src="/def_pfp_2.jpg" class="pfp" />
            <span class="text-sm">nko</span>
          </div>
          <div
            class="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-50 rounded"
          >
            <img src="/def_pfp_3.jpg" class="pfp" />
            <span class="text-sm">yohiori</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
  opacity: 1;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

input::placeholder {
  font-size: 12px;
}

input {
  font-size: 12px;
}

.pfp {
  max-width: 28px;
  max-height: 28px;
  object-fit: cover;
}

.send-btn,
.logout-btn {
  background-color: #29487d;
  background: linear-gradient(rgb(98, 122, 173), rgb(89, 114, 168));
}

input {
  animation: default 0.3s forwards;
}

input:focus {
  animation: lift 0.3s forwards;
}

.emoji-btn,
img {
  transition: all 0.3s ease;
  cursor: pointer;
}

.emoji-btn:hover,
img:hover {
  scale: 1.05;
  /* transform: rotate(-15deg); */
}

.message-box {
  transition: all 0.3s ease;
}

.message-box:active {
  transform: scale(1.02);
}

:deep(.message-emoji) {
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
  margin: 0 2px;
}

@keyframes lift {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-2px);
  }
}

@keyframes default {
  from {
    transform: translateY(-2px);
  }

  to {
    transform: translateY(0);
  }
}
</style>

<script>
import { ref, render, Transition } from "vue";
import { socket } from "@/utils/socket";
import EmojiPicker from "@/components/emoji-picker.vue";
import { getMe } from "@/utils/user";
import { emojis } from "@/utils/emojis";
export default {
  name: "ChatView",
  components: {
    EmojiPicker,
  },
  data() {
    return {
      messages: [],
      message: "",
      currentTime: new Date().toLocaleTimeString([], { timeStyle: "short" }),
      showEmoji: false,
      emojiMap: {},
      user: null,
      typingText: null,
      isTyping: false,
    };
  },

  computed: {},

  methods: {
    async sendMessage() {
      // TODO: replace to communicate with an API later

      if (this.message.trim() == "") return;

      socket.emit("chat:message", {
        message: this.message,
        time: this.currentTime,
        userId: this.user.id,
      });
      // this.messages.push(this.message)
      this.message = "";
      this.showEmoji = false;
    },

    onTyping() {
      this.isTyping = true;
      socket.emit("typing", `${this.user.username} is typing...`);
    },

    onStopTyping() {
      socket.emit("stop_typing");
    },

    emojiHandler({ path, emoji }) {
      this.emojiMap[emoji] = path;
      const input = this.$refs.messageInput;
      const start = input.selectionStart;
      const end = input.selectionEnd;
      this.message =
        this.message.substring(0, start) + emoji + this.message.substring(end);

      this.$nextTick(() => {
        input.focus();
        const newPosition = start + emoji.length;
        input.setSelectionRange(newPosition, newPosition);
      });
      // this.showEmoji = false;
    },

    renderMessage(raw) {
      let rendered = raw;

      emojis.map(({ emoji, path }) => {
        let imgEl = `<img src='${path}' alt='${emoji}' class='message-emoji'/>`;
        rendered = rendered.replaceAll(emoji, imgEl);
      });
      // console.log(`<span class='w-[300px] text-red text-wrap'>${rendered}</span>`);
      return `<span class='text-red text-wrap'>${rendered}</span>`;
    },

    async logout() {
      // localStorage.removeItem("user");
      await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      socket.emit("left");

      this.$router.push("/");
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const el = this.$refs.chatBox;
        if (el) el.scrollTop = el.scrollHeight;
      });
    },
  },
  async mounted() {
    const { user } = await getMe();
    this.user = user;

    socket.emit("join", {
      username: this.user.username,
      id: this.user.id,
    });
    socket.on("joined", (data) => {
      this.messages.push({
        message: data,
        type: "joined",
      });

      this.scrollToBottom();
    });

    socket.on("left", (data) => {
      this.messages.push({
        message: data,
        type: "left",
      });

      this.scrollToBottom();
    });

    socket.on("chat:message", (data) => {
      this.messages.push({
        message: data.message,
        time: data.time,
        username: data.user.username,
        type: "chat",
        userId: data.user.id,
      });

      this.scrollToBottom();
    });

    socket.on("typing", (data) => {
      this.typingText = data;
    });

    socket.on("stop_typing", (data) => {
      this.typingText = null;
    });

    // this.$nextTick(() => this.$nextTick(() => this.scrollToBottom()));
  },
};
</script>
