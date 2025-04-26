import axios from "axios";
import Cookies from "js-cookie";

export const sendData = async (url: string, body: any) => {
  const token = Cookies.get("token");
  try {
    const res = await axios.post(url, body, {
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
