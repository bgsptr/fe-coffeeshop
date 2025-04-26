import axios from "axios";
import Cookies from "js-cookie";

const patchData = async (url: string, body: any) => {
    const token = Cookies.get("token");
  try {
    const res = await axios.patch(url, body, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      // withCredentials: true,
    });
    console.log(res.data);
  } catch (err) {
    console.error("Error fetching order:", err);
    throw err;
  }
};

export default patchData;