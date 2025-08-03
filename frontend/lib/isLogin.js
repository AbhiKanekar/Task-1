import axios from "axios";

const isLogin = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/me`, {
            withCredentials: true,
        });

        if (res.data && res.data._id) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.error("User not authenticated:", err);
        return false;
    }
};

export default isLogin;
