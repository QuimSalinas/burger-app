import axios from "axios";

const instance = axios.create({
    baseURL: "https://react-my-burger-8fc2b.firebaseio.com/"
})

export default instance;