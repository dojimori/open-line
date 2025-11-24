<template>

    <form 
        v-motion-fade 
        class="bg-white p-4 w-[300px] border border-slate-400 shadow-md"
        @submit.prevent="submitHandler"
    >

        <h4 class="text-lg">join chat</h4>
        <div class="border w-full border-gray-300"></div>

        <div class="mt-4">
            <input type="text" placeholder="Username" v-model="username"
                class="border border-gray-400 px-4 py-1.5 w-full shadow-inner outline-none">
            <button class="w-full p-1.5 text-white mt-2 shadow-inner cursor-pointer "><span class="font-bold tracking-wider">enter</span></button>
        </div>

    </form>

</template>

<style scoped>
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
import { socket } from '@/utils/socket';
export default {
    name: 'LoginView',
    data() {
        return {
            username: ''
        }
    },

    methods: {
        submitHandler() {
            // localStorage.setItem('username', this.username);
            socket.emit('join', this.username);
            this.$router.push('/chat')
        }
    }

}

</script>