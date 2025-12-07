import { createStore } from "vuex";
import userApi from "../utils/api/user.api";
import { defineStore } from "pinia";
const store = createStore({
    state() {
        return {
            user: null
        }
    },

    mutations: {
        setUser(state, value) {
            state.user = value;
        }
    },

    actions: {
        async fetchUser({ commit }) {
            const user = await userApi.getMe();
            commit('setUser', user);
        }
    }
})


export { store }


export const useStore = defineStore('auth', {
    state: () => ({
        user: null,
        isLoading: false,
        isAuthenticated: false,
    }),

    getters: {
        getUser: (state) => state.user,
        isLoggedIn: (state) => state.isAuthenticated,
    },
    actions: {
        async fetchUser() {
            if (this.user) return this.user; // Return cached user

            this.isLoading = true;
            try {
                const user = await userApi.getMe();
                if (user) {
                    this.user = user;
                    this.isAuthenticated = true;
                }
                return user;
            } catch (error) {
                this.user = null;
                this.isAuthenticated = false;
                return null;
            } finally {
                this.isLoading = false;
            }
        },

        async updateUser(credentials) {
            this.isLoading = true;
            try {
                await userApi.updateProfile(credentials);
            } catch (error) {
                throw error;
            } finally {
                this.isLoading = false;
            }
        },

        clearUser() {
            this.user = null;
            this.isAuthenticated = false;
        }
    }


})