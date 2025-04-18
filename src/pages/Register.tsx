import { ChangeEvent, FormEvent, useState } from "react";
import { variables } from "../constants/variable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import leftLogin from "../assets/candra/left-login-cafe.svg";
import CustomInput from "../components/CustomInput";
import { CustomInputType } from "../components/types";

const Register = () => {
  const [register, setRegister] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegister({
      ...register,
      [e.target.id]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const url = `${variables.BASE_URL}/users/register`;

  const changedRegisterData = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(url, JSON.stringify(register), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      navigate("/login");
    } catch (error) {}
  };

  return (
    <div className="flex w-full min-h-screen bg-[radial-gradient(white,_#f6f6f6)]">
      {/* <img src="/left-login.png" className="w-1/2" /> */}
      <div className="w-1/2 flex justify-center relative">
        <div className="absolute w-3/5 h-3/5 bg-[linear-gradient(to_bottom,_#2D3E70,_#2F8258)] rounded-full bottom-[35%]" />
        <img src={leftLogin} alt="" className="absolute w-3/4 bottom-0" />
      </div>
      <div className="py-[3rem] w-1/2 px-[10rem] flex flex-col gap-2 justify-center">
        {/* <div className="flex items-center gap-3">
          <img src="logo-myclinic.png" alt="" className="w-[32px] h-[32px]" />

          <h1 className="font-semibold text-lg">ClinicMate</h1>
        </div> */}
        <h1 className="text-3xl font-bold text-[#525252]">
          Sign Up to your Account
        </h1>
        <p className="text-md text-black font-normal text-[#525252]">
          See what is going on with your business
        </p>
        <form action="h-full flex flex-col gap-9">
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
              value={register.email}
              className="mb-6 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Masukkan Email"
              required
            /> */}

            <CustomInput
              elementName="email"
              visibleName="Email"
              value={register.email}
              handleValueChange={handleChange}
            />
          </div>

          {/* <div className="w-full">
            <label
              htmlFor="nama"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nama
            </label>
            <input
              type="nama"
              id="nama"
              className="mb-6 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Masukkan Nama"
              required
            />
          </div> */}

          <div className="w-full">
            <CustomInput
              elementName="password"
              visibleName="Password"
              value={register.password}
              handleValueChange={handleChange}
              type={CustomInputType.PASSWORD}
            />

            {/* <label
              htmlFor="password_confirmation"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Konfirmasi Password
            </label>
            <input
              type="password"
              id="password_confirmation"
              className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Masukkan Konfirmasi Password"
              required
            /> */}

            <CustomInput
              elementName="password_confirmation"
              visibleName="Confirm Password"
              value={register.password_confirmation}
              handleValueChange={handleChange}
              type={CustomInputType.PASSWORD}
            />

            <div className="flex justify-between">
              <div className="flex mb-4 gap-2">
                <input type="checkbox" />
                <p>I agree to all terms & conditions</p>
              </div>
              {/* <h3 className="underline">Lupa password?</h3> */}
            </div>

            <button
              type="submit"
              onClick={changedRegisterData}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign Up
            </button>

            <h3 className="text-center mt-3">
              Already have an account ?{" "}
              <span className="text-[#478CCF]">Login</span>
            </h3>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
