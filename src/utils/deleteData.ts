import axios from "axios"

export const deleteData = async (url: string) => {
    try {
        await axios.delete(url, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
    } catch (err) {
        console.error("Error delete data");
        throw err;
    }
}