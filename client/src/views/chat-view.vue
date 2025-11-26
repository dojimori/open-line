<template>
  <!-- main window -->
  <div class="min-w-[400px] md:w-[620px] bg-white shadow-lg shadow-blue-100">
    <!-- chat box -->
    <div
      v-motion
      :initial="{ opacity: 0, y: 100 }"
      :enter="{ opacity: 1, y: 0 }"
      :duration="400"
      class="shadow-xl"
    >
      <!-- chat header -->
      <div class="text-center border-b border-gray-300 py-2 flex justify-between px-2">
        <small>chat global</small>
        <button
          @click="logout"
          class="bg-[#29487d] text-white py-0.5 px-1.5 cursor-pointer"
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
              <img src="/def_pfp_2.jpg" width="36" height="28" class="object-cover" />
              <span
                class="flex items-center text-xs bg-blue-50 border border-blue-100 px-2.5 py-0.5"
              >
                <span v-html="renderMessage(data.message)"> </span>
              </span>
            </div>
            <p class="font-bold text-[#29487d] mt-2">
              <span class="mr-2">{{ data.username }}</span>
              <span class="text-gray-400 font-normal">{{ data.time }}</span>
            </p>
          </div>
          <!-- joined message -->
          <!-- <div v-else-if="data.type == 'joined'" class="text-center"> -->
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
        <input
          v-model="message"
          ref="messageInput"
          placeholder="Type a message..."
          type="text"
          class="flex-1 shadow-inner outline-none border border-gray-200 p-2 text-sm bg-gray-50 rounded-xs"
        />

        <!-- emoji container -->
        <!-- <Transition>
          <div
            v-if="showEmoji"
            class="absolute bottom-full right-30 z-10 mb-2 bg-gray-100 rounded-xs border border-gray-200 p-4"
          >
            <img src="/assets/emojis/bento-box.gif" alt="" class="emoji" />
          </div>
        </Transition> -->

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
</template>

<style scoped>
input::placeholder {
  font-size: 12px;
}

input {
  font-size: 12px;
}

.send-btn {
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
  scale: 1.2;
  transform: rotate(-15deg);
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
import { ref, render } from "vue";
import { socket } from "../utils/socket";
import EmojiPicker from "@/components/emoji-picker.vue";

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
    };
  },

  methods: {
    sendMessage() {
      // Replace to communicate with an API later
      socket.emit("chat:message", {
        message: this.message,
        time: this.currentTime,
      });
      // this.messages.push(this.message)
      this.message = "";
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

      Object.entries(this.emojiMap).map((entry) => {
        let imgEl = `<img src='${entry[1]}' alt='${entry[0]}' class='message-emoji'/>`;
        rendered = rendered.split(entry[0]).join(imgEl);
      });

      return rendered;
    },

    logout() {
      localStorage.removeItem("username");
      this.$router.push("/");
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const el = this.$refs.chatBox;
        if (el) el.scrollTop = el.scrollHeight;
      });
    },
  },
  mounted() {
    const username = localStorage.getItem("username");
    socket.emit("join", username);
    socket.on("joined", (data) => {
      // console.log(data);
      this.messages.push({
        message: data,
        type: "joined",
      });

      this.scrollToBottom();
    });

    socket.on("left", (data) => {
      // console.log(data);
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
        username: data.username,
        type: "chat",
      });
      this.scrollToBottom();
    });

    // this.$nextTick(() => this.$nextTick(() => this.scrollToBottom()));
  },
};
</script>
