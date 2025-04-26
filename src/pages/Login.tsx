import axios from "axios";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { variables } from "../constants/variable";
import leftLogin from "../assets/candra/left-login-cafe.svg";
import Cookies from "js-cookie";
import CustomInput from "../components/CustomInput";
import { CustomInputType } from "../components/types";
import { RoundedLoginButton } from "../components/RoundedLoginButton";
import { Divider } from "@mui/material";

const Login = () => {
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const googleSignIn = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("google click");

    const url = `${variables.BASE_URL}/users/oauth2/google`;
    try {
      const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { result } = res.data;

      if (result) {
        console.log(result);
        localStorage.clear();

        window.open(result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const url = `${variables.BASE_URL}/users/login`;

  const changedLoginData = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(url, JSON.stringify(login), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log("token", res.data);
      const { token } = res.data;
      Cookies.set("token", token, { expires: 7 })
      // localStorage.setItem("token", token);
      localStorage.clear();

      setTimeout(() => {
        navigate("/menu");
        // navigate(0)
      }, 100);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-[radial-gradient(white,_#f6f6f6)]">
      {/* <img src="/left-login.png" className="w-1/2" /> */}
      <div className="w-1/2 flex justify-center relative">
        <div className="absolute w-3/5 h-3/5 bg-[linear-gradient(to_bottom,_#2D3E70,_#2F8258)] rounded-full bottom-[35%]" />
        <img src={leftLogin} alt="" className="absolute w-3/4 bottom-0" />
      </div>
      <div className="py-[5rem] w-1/2 px-[10rem] flex flex-col gap-2 flex justify-center">
        {/* <div className="flex items-center gap-3">
          <img src="logo-myclinic.png" alt="" className="w-[32px] h-[32px]" />
          <h1 className="font-semibold text-lg">ClinicMate</h1>
        </div> */}
        <h1 className="text-3xl font-bold text-[#525252]">
          Sign In to your Account
        </h1>
        <p className="text-md text-black font-normal text-[#525252] mb-4">
          See what is going on with your business
        </p>

        <form action="h-full flex flex-col gap-9" method="POST">
          <RoundedLoginButton
            name="Continue with Google"
            event={googleSignIn}
          />
          <Divider className="text-grey">Or</Divider>
          <div className="w-full">
            {/* <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              onChange={handleChange}
              value={login.email}
              className="mb-6 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Masukkan Email"
              required
            /> */}

            <CustomInput
              elementName="email"
              visibleName="Email"
              value={login.email}
              handleValueChange={handleChange}
            />
          </div>
          <div className="w-full">
            {/* <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={handleChange}
              value={login.password}
              className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Masukkan Password"
              required
            /> */}

            <CustomInput
              elementName="password"
              visibleName="Password"
              value={login.password}
              handleValueChange={handleChange}
              type={CustomInputType.PASSWORD}
            />

            <div className="flex justify-between">
              <div className="flex mb-4 gap-2">
                <input type="checkbox" />
                <p>Remember Me</p>
              </div>
              <h3 className="text-[#2D426E] font-medium">Lupa password?</h3>
            </div>

            <button
              type="submit"
              onClick={changedLoginData}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Log In
            </button>

            <h3 className="text-center mt-3">
              Don't have an account ?{" "}
              <span className="text-[#478CCF]">Signup now</span>
            </h3>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
