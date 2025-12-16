<template>
  <!-- main window -->
  <main class="flex flex-col gap-0 border border-gray-400 w-full sm:w-2xl md:w-3xl lg:w-7xl">
    <header-component></header-component>
    <div class="flex-1 flex flex-col lg:flex-row justify-center">
      <user-information></user-information>
      <!-- Chat Section -->
      <div class="flex-1 bg-white flex">
        <!-- chat box -->
        <div v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1 }" :duration="300"
          class="flex-1 flex flex-col justify-between">
          <!-- chat header -->
          <!-- <div
            class="text-center border-b border-gray-300 py-2 flex items-center justify-between px-2"
          >
            <h2 class="font-bold text-[#29487d]">Open Line</h2>
            <button
              @click="logout"
              class="bg-slate-100 px-3 py-1.5 border border-slate-400 text-[#29487d] font-bold cursor-pointer flex items-center gap-2 hover:bg-slate-200 hover:translate-y-[-3px] duration-200"
            >
              <ph-sign-out></ph-sign-out>
              Logout
            </button>
          </div> -->

          <!-- chat-body -->
          <div
            class="p-2 flex-1 flex flex-col gap-3 min-h-[400px] max-h-[400px] lg:min-h-[660px] lg:max-h-[660px] overflow-y-scroll"
            ref="chatBox">
            <div v-motion :initial="{ opacity: 0, x: -50 }" :enter="{ opacity: 1, x: 0 }" :duration="400"
              v-for="(data, index) in messages" :key="index" class="flex flex-col p-1.5 gap-1">
              <!-- chat message -->
              <div v-if="data.type == 'chat'">
                <div class="flex flex-row flex-wrap gap-4">
                  <!-- pfp -->
                  <img :src="data.profilePicture
                      ? `http://localhost:8080${data.profilePicture}`
                      : '/def_pfp_6.jpg'
                    " class="pfp border-2 border-gray-400" />
                  <span
                    class="flex break-all items-center text-xs bg-blue-50 border border-blue-100 px-2.5 py-0.5 cursor-pointer message-box max-w-[300px]"
                    v-html="renderMessage(data.message)">
                  </span>
                </div>
                <p :class="[
                  'font-bold text-[#29487d] mt-2',
                  { 'text-green-600': data.userId == user.id },
                ]">
                  <small class="mr-2">{{
                    data.userId == user.id ? "You" : data.username
                  }}</small>
                  <small class="text-gray-400 font-light">{{
                    new Date(data.time).toLocaleTimeString([], { timeStyle: "short" })
                  }}</small>
                </p>
              </div>
              <!-- joined message -->
              <div v-else class="text-center">
                <small class="text-gray-600">{{ data.message }}</small>
              </div>
            </div>
          </div>

          <!-- chat actions -->
          <form class="flex gap-2 p-2 bg-gray-100 border-t-2 border-gray-200 relative" @submit.prevent="sendMessage">
            <span v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1 }" :leave="{ opacity: 0 }" v-if="isTyping"
              class="w-full text-center text-gray-500 absolute bottom-full">
              <small>{{ typingText }}</small>
            </span>
            <input v-model="message" ref="messageInput" placeholder="Type a message..." type="text" @input="onTyping"
              @blur="onStopTyping"
              class="flex-1 shadow-inner outline-none border border-gray-200 p-2 text-sm bg-gray-50 rounded-xs" />

            <emoji-picker :showEmoji="showEmoji" @emoji-selected="emojiHandler"></emoji-picker>

            <button type="button" @click="showEmoji = !showEmoji" class="emoji-btn cursor-pointer text-gray-600 mx-2">
              <ph-smiley size="18"></ph-smiley>
            </button>

            <button type="submit"
              class="send-btn font-bold cursor-pointer text-white px-4 py-2 shadow-inner hover:opacity-90 hover:translate-y-[-3px] duration-200">
              <ph-paper-plane-right :size="14" weight="fill"></ph-paper-plane-right>
            </button>
          </form>
        </div>
      </div>

      <active-users :activeUsers="activeUsers"></active-users>
    </div>
  </main>
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
  scale: 1.05;
  /* transform: rotate(-15deg); */
}

.header {
  background: linear-gradient(to bottom, #4e69a2, #3b5998);
}

.message-box {
  transition: all 0.3s ease;
}

.message-box:active {
  transform: scale(1.02);
}

:deep(.message-emoji) {
  width: 25;
  height: 25px;
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
import { socket } from "@/utils/socket";
import EmojiPicker from "@/components/emoji-picker.vue";
import userApi from "@/utils/api/user.api";
import { emojis } from "@/utils/emojis";
import ActiveUsers from "@/components/active-users.vue";
import UserInformation from "@/components/user-information.vue";
import { PhPaperPlaneRight, PhSmiley } from "@phosphor-icons/vue";
// import api from "@/utils/api/";
import HeaderComponent from "@/components/header-component.vue";
import authApi from "@/utils/api/auth.api";
import { useStore } from "@/store";
import api from "@/utils/api";

export default {
  name: "ChatView",
  components: {
    EmojiPicker,
    ActiveUsers,
    UserInformation,
    PhPaperPlaneRight,
    HeaderComponent,
    PhSmiley,
  },
  data() {
    return {
      messages: [],
      message: "",
      showEmoji: false,
      emojiMap: {},
      user: null,
      typingText: null,
      isTyping: false,
      activeUsers: null,
    };
  },

  computed: {
    store() {
      return useStore();
    },
  },

  methods: {
    async fetchChats() {
      try {
        const { data } = await api.get("/chats");
        const { chats } = data;

        chats.forEach((chat) => {
          this.messages.push({
            message: chat.message,
            time: chat.time,
            username: chat.user.profile?.displayName || chat.user.username,
            type: "chat",
            profilePicture: chat.user.profile?.profilePicture || null,
            userId: chat.user.id,
          });
        });

        this.message.reverse();
      } catch (error) {
        console.log(error);
      }
    },

    async sendMessage() {
      // const currentTime = Date().now();
      const currentTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" });
      if (this.message.trim() == "") return;

      socket.emit("chat:message", {
        message: this.message,
        time: currentTime,
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

    // async logout() {
    //   // localStorage.removeItem("user");
    //   // await fetch("http://localhost:8080/api/auth/logout", {
    //   //   method: "POST",
    //   //   credentials: "include",
    //   // });

    //   await authApi.logout();

    //   socket.emit("left");

    //   this.$router.push("/");
    // },

    scrollToBottom() {
      this.$nextTick(() => {
        const el = this.$refs.chatBox;
        console.log(el.scrollHeight);
        if (el) el.scrollTop = el.scrollHeight;
      });
    },
  },

  async mounted() {
    await this.fetchChats();
    this.scrollToBottom;

    // this.user = await userApi.getMe();
    // this.user = this.$store.state.user;
    this.user = this.store.getUser;

    socket.emit("join", {
      username: this.user.username,
      id: this.user.id,
      type: "join",
      displayName: this.user.profile?.displayName,
      profilePicture: this.user.profile?.profilePicture,
    });

    socket.on("joined", (data) => {
      this.messages.push({
        message: data,
        type: "joined",
      });

      this.scrollToBottom();
    });

    socket.on("active-users", (users) => {
      this.activeUsers = users;
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
        username: data.user.displayName || data.user.username,
        type: "chat",
        profilePicture: data.user.profilePicture || null,
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
