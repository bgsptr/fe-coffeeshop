import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const GoogleLogin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      Cookies.remove("token");
      Cookies.set("token", token);
      navigate("/menu");
    }
  }, []);

  return <p>Logging in with Google...</p>;
};
