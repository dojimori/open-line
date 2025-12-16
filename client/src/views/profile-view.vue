<template>
    <main class="flex flex-col gap-0 border border-gray-400 sm:w-3xl lg:w-[1080px]">
        <header-component></header-component>

        <div class="bg-white p-2" v-motion-fade>

            <div class="flex gap-12">
                <div class=" border-2 border-gray-300 p-2">
                    <img src="/def_pfp_3.jpg" class="w-[120px]" alt="">
                </div>

                <div class="mt-4">
                    <h4 v-if="this.user?.username" style="font-size: 1.2em; ">{{ this.user.username }}</h4>
                </div>
            </div>
            <div>
                <h1>timeline</h1>
            </div>
        </div>
    </main>
</template>

<script>
import HeaderComponent from '@/components/header-component.vue';
import { useStore } from '@/store';


export default {
    components: {
        HeaderComponent
    },

    data() {
        return {
            user: null
        }
    },

    computed: {
        store() {
            return useStore();
        }
    },

    mounted() {
        this.user = this.store.getUser
    }
}

</script>