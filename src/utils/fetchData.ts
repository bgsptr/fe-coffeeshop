import axios from "axios";

export const fetchData = async (url: string) => {
    try {
      const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.error("Error fetching order:", err);
      throw err;
    }
  };