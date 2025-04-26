import { Navbar } from "../components/Navbar";
import { CartItem } from "../components/CartItem";
import cartIcon from "../assets/candra/cart-icon.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { variables } from "../constants/variable";
import { sendData } from "../utils/sendData";
import { fetchData } from "../utils/fetchData";

export interface ItemInCart {
  id: number;
  name: string;
  description: string;
  subtotal: string;
  quantity: number;
}

export interface CheckoutDto {
  // user_id: string;
  order_id: number
  cart_items: Partial<ItemInCart>[];
  total_price: number;
  shipping_address: string | null;
  distance: number | null;
  lat: string | null;
  lng: string | null;
}

// export interface SelectedItem {
//   id: number;
//   quantity: number;
// }

export const Cart = () => {
  // const [orderId] = useState(localStorage.getItem("orderId"));
  const [orderData, setOrderData] = useState<ItemInCart[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [, setError] = useState("");
  const params = useParams();
  const [reloaded, ] = useState<boolean>(false);
  const [qty, setQty] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(params);
  }, [])

  // const fetchData = async (url: string) => {
  //   try {
  //     const res = await axios.get(url, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       withCredentials: true,
  //     });
  //     const { result } = res.data;
  //     return result;
  //   } catch (err) {
  //     console.error("Error fetching order:", err);
  //     throw err;
  //   }
  // };

  const patchData = async (url: string, body: any) => {
    try {
      const res = await axios.patch(url, body, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(res.data);
    } catch (err) {
      console.error("Error fetching order:", err);
      throw err;
    }
  };

  useEffect(() => {
    const url = `${variables.BASE_URL}/orders/${params.cart_id}`;

    const fetchOrder = async () => {
      try {
        const data = await fetchData(url);
        if (data?.items.length === 0) navigate("../menu", { replace: true });
        setOrderData(data.items);
        setTotalPrice(data.totalPrice);
      } catch (err) {
        setError("Failed to fetch order data");
      }
    };

    fetchOrder();
  }, []);

  const onClickAddOrMin = (e: any, orderItemId: number, currQty: number) => {
    e.preventDefault();

    console.log("min plus, aku ditekan, orderitemId: ", orderItemId);
    console.log("name ", e.currentTarget.name);

    // const currentQuantity = isNaN(prevOrder.quantity) ? 0 : prevOrder.quantity;

    if (e.currentTarget.name === "substract") {

      setOrderData(
        orderData.map((prevOrder) => {
          if (prevOrder.id === orderItemId) {
            return {
              ...prevOrder,
              quantity: prevOrder.quantity > 0 ? prevOrder.quantity - 1 : 0,
            };
          }
          return prevOrder;
        })
      );

    } else if (e.currentTarget.name === "add") {
      setOrderData(
        orderData.map((prevOrder) => {
          if (prevOrder.id === orderItemId) {
            return {
              ...prevOrder,
              quantity: !isNaN(prevOrder.quantity) ? (prevOrder.quantity + 1) : 0,
            };
          }
          return prevOrder;
        })
      );
    }
    console.log(e.currentTarget.dataset.value)

    const url = `${variables.BASE_URL}/order_items/${orderItemId}`;
    const updatedOrder = orderData.find((order) => order.id === orderItemId);
    if (updatedOrder && Number(currQty) !== 0) {
      console.log(typeof currQty)
      patchData(url, { quantity: currQty });
      setQty(currQty)
      // setReloaded(true);
    }
  };

  useEffect(() => {
    console.log(orderData[0]?.quantity)
  }, [orderData])

  const onClickCheckoutCart = async () => {

    console.log("button checkout clicked")
    const url = `${variables.BASE_URL}/sessions/checkout`;
    const data: CheckoutDto = {
      order_id: Number(params.cart_id),
      cart_items: orderData,
      total_price: totalPrice,
      shipping_address: null,
      distance: null,
      lat: null,
      lng: null,
    };

    try {
      await sendData(url, data);

      navigate("../cart/checkout")
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="font-poppins w-full">
      <Navbar />

      {/* body */}
      <div className="bg-[#B5B5B5] min-h-screen w-full py-[2.3rem]">
        {/* card cart */}
        {orderData?.map((order: ItemInCart) => (
          <CartItem order={order} clickedQty={onClickAddOrMin} isReloaded={reloaded} qty={qty} />
        ))}

        <div className="bg-[#EAE4E4] w-4/5 mx-auto h-[4rem] rounded-lg flex justify-between items-center fixed bottom-0 left-[10%]">
          <div className="p-5">
            <img src={cartIcon} alt="" className="w-[2.5rem] h-[2.5rem]" />
          </div>
          <div className="flex items-center gap-9 p-8">
            <h6 className="text-lg">Rp.{totalPrice}</h6>
            <button 
            onClick={onClickCheckoutCart}
            className="bg-[#2D3E70] text-white rounded-md px-6 py-3">
              Checkout
            </button>
          </div>
        </div>

        {/* card cart */}
      </div>
      {/* body */}
    </div>
  );
};
