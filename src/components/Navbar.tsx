import { useNavigate } from "react-router-dom";
import logo from "../assets/candra/logo.svg";
import { useEffect, useState } from "react";
import { fetchData } from "../utils/fetchData";
import { variables } from "../constants/variable";
import useCart from "../hooks/useCart";
import IconButtonWithBadge from "./IconButtonWithBadge";

export interface SwitchCart {
  orderId: number;
  isChecked: boolean;
}

export const Navbar = () => {
  const navigate = useNavigate();

  const navigatePage = (param: string) => {
    navigate(`../${param}`);
  };

  const [dropdownIsHovered, ] = useState(false);
  const [carts, setCarts] = useState<any[]>([]);
  const [selectedSwitch, ] = useState<SwitchCart[]>([]);

  useEffect(() => {
    // console.log(dropdownIsHovered)
    // alert(dropdownIsHovered)
  }, [dropdownIsHovered]);

  const cartSwitch = useCart();

  const fetchCartOrder = async () => {
    try {
      const url = `${variables.BASE_URL}/orders/users/me`;
      const data = await fetchData(url);
      console.log(data);

      setCarts(data.result);
      const { result } = data;
      // setSelectedSwitch(
      //   result.map((res: any) => ({
      //     orderId: res.id,
      //     isChecked: false,
      //   }))
      // );

      cartSwitch.setCarts(
        result.map((res: any) => ({
          orderId: res.id,
          isChecked: false,
        }))
      );

      cartSwitch.updateCart(Number(localStorage.getItem("order_id")));

      //
      cartSwitch.setCartRefresh(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCartOrder();
  }, []);

  useEffect(() => {
    console.log(selectedSwitch);
  }, [selectedSwitch]);

  const resetCartState = () => {
    localStorage.removeItem("cart_id");
    cartSwitch.reset();
    cartSwitch.setItems([]);
    navigate(0);
  };

  return (
    <div className="flex justify-between p-5 text-[#FFFFFF] bg-[#2D3E70] items-center">
      <div className="flex gap-4 items-center">
        <img src={logo} alt="Maison du Café Logo" />
        <h3>Maison du Café</h3>
      </div>
      <div className="relative group inline-block">
        {/* <button
          onMouseOut={() => setDropdownIsHovered(false)}
          onMouseOver={() => setDropdownIsHovered(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Hover me
        </button> */}

        {/* <button className="relative w-10 h-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-full h-full text-gray-800"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.424M7.5 14.25h11.118c.621 0 1.164-.39 1.36-.978l2.122-6.366a.75.75 0 00-.716-.981H6.375m1.125 8.25l-1.5 4.5m0 0a1.125 1.125 0 102.25 0m-2.25 0H18m-5.25-4.5v-6m0 0L9 9m3.75-1.5L15 9"
            />
          </svg>

          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
            {carts.length}
          </div>
        </button> */}


      </div>
      <ul className="flex gap-9 items-center">
        <IconButtonWithBadge carts={carts} resetCartState={resetCartState} />
        <li onClick={() => navigatePage("home")} className="cursor-pointer">
          Home
        </li>
        <li onClick={() => navigatePage("menu")} className="cursor-pointer">
          Menus
        </li>
        <li onClick={() => navigatePage("about")} className="cursor-pointer">
          About
        </li>
      </ul>
    </div>
  );
};
