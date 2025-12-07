import api from ".";

export default {
    async getMe() {
        const response = await api.get('/users/getme');
        const { fetchedUser } = response.data;
        return fetchedUser;
    },

    async updateProfile(credentials) {
        const response = await api.post('/users/profile/update', credentials, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        return response
    }
}
