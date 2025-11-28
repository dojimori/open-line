export const getMe = async() => {
    try {
        const response = await fetch('http://localhost:8080/api/users/getme', { credentials: "include" });
        const data = await response.json();        

        return data;
    } catch(error) {
        console.log(error)
    }
}