import api from ".";

export default {
    async login(username, password) {
        try {
            const response = api.post("/auth/login", {
                username,
                password
            });

            return response;
        } catch (error) {
            console.error(error)
        }

    },

    async logout() {
        try {
            await api.post("/auth/logout");
        } catch(error) {
            console.error(error)
        }
        
    }
}