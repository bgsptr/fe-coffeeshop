import axios from "axios";

export const sendData = async (url: string, body: any) => {
  try {
    const res = await axios.post(url, body, {
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
