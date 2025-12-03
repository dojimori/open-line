import api from '@/utils/api.js'


export const getMe = async() => {
    try {
        // const response = await fetch('http://localhost:8080/api/users/getme', { credentials: "include" });
        const response = await api.get('/users/getme');
        const { user } = response.data;
        return user;
    } catch(error) {
        console.log(error)
    }
}