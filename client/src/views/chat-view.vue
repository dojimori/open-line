<template>
    <!-- main window -->
    <div class="min-w-[400px] md:w-[620px] bg-white shadow-lg shadow-blue-100 ">
        <!-- chat box -->
        <div v-motion :initial="{ opacity: 0, y: 100 }" :enter="{ opacity: 1, y: 0 }" :duration="400" class="shadow-xl">
            <!-- chat header -->
            <div class="text-center border-b border-gray-300 py-2">
                <small>chat global</small>
            </div>

            <!-- chat-body -->
            <div class="h-[60vh] p-2 flex flex-col gap-3 overflow-y-scroll">
                <div v-motion-slide-bottom v-for="data in messages" class="flex flex-col p-1.5 gap-1">
                    <div class="flex flex-row flex-wrap gap-4">
                        <img src="/def_pfp_2.jpg" width="36" height="28" class="object-cover"/>
                        <span
                            class="flex items-center text-xs bg-blue-50  border border-blue-100 px-2.5 py-0.5">
                            {{ data.message }}
                        </span>
                    </div>
                    <p class="font-bold text-[#29487d]">
                        {{ data.username }}
                        <span class="text-gray-400 font-normal">8:30 AM</span>
                    </p>
                </div>
            </div>

            <!-- chat actions -->
            <form class="flex gap-2 p-2 bg-gray-100 border-t-2 border-gray-200" @submit.prevent="sendMessage">
                <input v-model="message" placeholder="Type a message..." type="text"
                    class="flex-1 shadow-inner outline-none border border-gray-200 p-2 text-sm bg-gray-50 rounded-xs" />
                <button type="submit" class="text-xs cursor-pointer text-white p-2 shadow-inner">
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

button {
    background-color: #29487d;
    background: linear-gradient(rgb(98, 122, 173), rgb(89, 114, 168));
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
import { ref } from 'vue'
import { socket } from '../utils/socket';

export default {
    name: 'ChatView',
    data() {
        return {
            messages: [],
            message: '',
        }
    },
    methods: {
        sendMessage() {
            // Replace to communicate with an API later 
            socket.emit('chat:message', this.message);
            // this.messages.push(this.message)
            this.message = ''
        }
    },
    mounted() {
        socket.on("chat:message", (data) => {
            this.messages.push({
                message: data.message,
                username: data.username
            })
        })
    }
}

</script>