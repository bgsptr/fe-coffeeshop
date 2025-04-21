// import vector2 from "../assets/candra/vector-2.svg";
// import vector from "../assets/candra/vector.svg";
// import rectangle37 from "../assets/candra/rectangle-37.png";
import { MenuCard } from "../components/MenuCard";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { useEffect, useState } from "react";
import { fetchData } from "../utils/fetchData";
import useCart from "../hooks/useCart";
import { LoadingSpinner } from "../components/LoadingSpinner";

export interface Item {
  category: string; //ENUM
  createdAt: Date;
  description: string;
  id: number;
  image: string;
  name: string;
  price: string;
  status: string; //ENUM
  stock: number;
}

export interface OrderData {
  itemId: string;
  quantity: number;
  orderId?: string;
}

export const Menu = (): JSX.Element => {
  const [keyword] = useState("");
  const [orderId, setOrderId] = useState(null);
  const [localStoreOrderId] = useState(localStorage.getItem("cart_id"));
  // const [localStoreOrderId] = useCart();
  // const [items, setItems] = useState<Item[]>([]);
  const [orderItemsId, setOrderItemsId] = useState<string[]>([]);
  const [buttonAddCart, setButtonAddCart] = useState<boolean>(false);

  const cartSwitch = useCart();

  useEffect(() => {
    const fetchItem = async () => {
      const url = `http://localhost:3000/items?keyword=${keyword}`;
      try {
        const res = await fetchData(url);
        console.log(res);
        // setItems(res.result);
        cartSwitch.setItems(res.result);
      } catch (err) {
        console.log(err);
      }
    };

    const compareItemInCart = async () => {
      if (!localStorage.getItem("cart_id")) return;
      // const url = `http://localhost:3000/orders/first/orderItems`;
      // const url = `http://localhost:3000/orders/${localStoreOrderId}/orderItems`;
      const url = `http://localhost:3000/orders/${cartSwitch.cartInit}/orderItems`;
      try {
        const res = await fetchData(url);
        console.log("compare cart: ", res);
        setOrderItemsId(res.result.orderItemsId);
        
        setOrderId(res.result.orderId);
      } catch (err) {
        console.log(err);
      }
    };

    fetchItem();
    compareItemInCart();

    cartSwitch.setCartRefresh(false);

    return () => {
      cartSwitch.setItems([]);
      // cartSwitch.setCartRefresh(false);
    };
  }, [cartSwitch.carts]);

  useEffect(() => {
    console.log(orderItemsId);
    console.log("exist id order: ", orderId);
  }, [orderItemsId]);

  return (
    <div className="font-poppins flex flex-col min-h-screen">
      <Navbar />
      {/* body */}
      {cartSwitch.cartIsRefresh ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-[#B5B5B5] flex-grow">
          {/* card */}
          <div className="p-[3rem]">
            <div className="flex gap-[4rem] flex-wrap justify-center">
              {cartSwitch.items?.map((item) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  isOrdered={orderItemsId.some(
                    (value) => parseInt(value, 10) === item.id
                  )}
                  orderId={orderId}
                />
              ))}
            </div>
          </div>
          {/* card */}
        </div>
      )}
      {/* body */}
      <Footer />
    </div>
  );
};
