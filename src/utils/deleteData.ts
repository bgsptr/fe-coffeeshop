import axios from "axios";
import Cookies from "js-cookie";

export const deleteData = async (url: string) => {
  const token = Cookies.get("token");
  try {
    await axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // withCredentials: true
    });
  } catch (err) {
    console.error("Error delete data");
    throw err;
  }
};
