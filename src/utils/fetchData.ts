import axios from "axios";
import Cookies from "js-cookie";

export const fetchData = async (url: string) => {
  const token = Cookies.get("token");
    try {
      const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        // withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.error("Error fetching order:", err);
      throw err;
    }
  };