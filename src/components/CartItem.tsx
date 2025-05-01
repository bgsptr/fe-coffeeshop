// import rectangle37 from "../assets/candra/rectangle-37.png";
import line3 from "../assets/candra/line-3.svg";
import line4 from "../assets/candra/line-4.svg";
import line5 from "../assets/candra/line-5.svg";
import buttonMin from "../assets/candra/button-order-min.svg";
import buttonPlus from "../assets/candra/button-order-plus.svg";
import { ItemInCart } from "../pages/Cart";
import { MouseEvent, useEffect } from "react";
import { variables } from "../constants/variable";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export const CartItem = (props: {
  order: ItemInCart;
  clickedQty: any;
  isReloaded: boolean;
  qty: number;
}) => {
  const { order, clickedQty } = props;
  const navigate = useNavigate();

  const removeButtonOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    console.log("button remove clicked");
    const token = Cookies.get("token");

    const deleteItemInCart = async () => {
      try {
        const url = `${variables.BASE_URL}/order_items/${e.currentTarget.id}`;
        const res = await axios.delete(url, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          // withCredentials: true
        });

        console.log("delete data happen");

        if (res.data.result.items_remaining <= 1) {
          navigate("../../menu")
        }

        window.location.reload();
        
      } catch (err) {
        throw err;
      }
    }

    deleteItemInCart();
  }

  useEffect(() => {
    console.log(clickedQty);
  }, [clickedQty]);

  return (
    <div className="bg-[#EAE4E4] w-[90%] max-w-4xl mx-auto mb-6 p-5 rounded-md">
      <div className="flex flex-col md:flex-row gap-5">
        {/* Product Image */}
        <div className="flex justify-center md:w-1/3">
          <img
            src={order.image}
            alt="Product"
            className="w-[12rem] md:w-[16rem] rounded-md"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <img src={line4} alt="" className="mt-2 w-1/2 mb-2" />
          <div className="flex flex-wrap items-center gap-2 text-center">
            <h6 className="text-sm font-semibold">{order.name}</h6>
            <img src={line3} alt="" />
            {/* order.subtotal add + order price, if button add clicker, otherwise - order price */}
            <h6
              className="text-sm font-semibold text-gray-700"
              id={order.id.toString()}
            >
              {/* Rp. { qty === 0 ? order.subtotal : parseInt(order.subtotal, 10) / order.quantity * qty } */}
              Rp. {order.subtotal}
            </h6>
          </div>
          <img src={line5} alt="" className="w-1/2 mt-2 mb-3" />
          <p className="text-gray-500 text-sm">{order.description}</p>
        </div>

        {/* Quantity & Checkout */}
        <div className="flex flex-col md:justify-between items-center md:items-end gap-4 md:w-1/4">
          <div className="flex items-center gap-2 flex-row-reverse">
            <button
              onClick={(e) => clickedQty(e, order.id, order.quantity + 1)}
              name="add"
            >
              <img
                src={buttonPlus}
                alt="Increase"
                className="w-16 h-16 cursor-pointer"
              />
            </button>
            <p className="text-lg font-semibold">{order.quantity}</p>
            <button
              onClick={(e) => clickedQty(e, order.id, order.quantity - 1)}
              name="substract"
            >
              <img
                src={buttonMin}
                alt="Decrease"
                className="w-16 h-16 cursor-pointer"
              />
            </button>
          </div>
          <button
          id={order.id.toString()}
            onClick={removeButtonOnClick}
            className="h-10 px-5 bg-[#E63946] hover:bg-[#C72C3C] text-white text-sm font-medium rounded-md hover:bg-[#1f2c50] transition"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
