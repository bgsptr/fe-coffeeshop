import { useEffect, useState } from "react";
import line3 from "../assets/candra/line-3.svg";
import line4 from "../assets/candra/line-4.svg";
import line5 from "../assets/candra/line-5.svg";
import rectangle37 from "../assets/candra/rectangle-37.png";
import buttonMin from "../assets/candra/button-order-min.svg";
import buttonPlus from "../assets/candra/button-order-plus.svg";
import { Item, OrderData } from "../pages/Menu";
import { sendData } from "../utils/sendData";
import { useNavigate } from "react-router-dom";

export const MenuCard = (props: {
  item: Item;
  isOrdered: boolean;
  orderId: number | null;
}) => {
  const { item, isOrdered, orderId } = props;
  const navigate = useNavigate();

  const [data, setData] = useState<OrderData>({
    itemId: item.id.toString(),
    quantity: 0,
  });

  const clickSendData = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (data.quantity <= 0) return;

    const url = `http://localhost:3000/orders`;
    try {
      await sendData(url, data);
      navigate(0);
    } catch (err) {
      console.log(err);
    }
  };

  const addOrSubs = (buttonName: string) => {
    setData((prev) => ({
      ...prev,
      quantity:
        buttonName === "add"
          ? prev.quantity + 1
          : prev.quantity > 0
          ? prev.quantity - 1
          : 0,
    }));
  };

  useEffect(() => {
    console.log(orderId);
    setData((prev) => ({
      ...prev,
      orderId: orderId !== null ? orderId.toString() : undefined,
    }));
  }, [orderId]);

  return (
    <div key={item.id} className="card w-[18rem] h-[25rem] relative">
      {/* Image with hover effect */}
      <div className="relative group overflow-hidden">
        <img
          src={rectangle37}
          alt=""
          className="w-full h-auto transition-opacity duration-300 group-hover:opacity-25"
        />
        {/* Button that appears on hover */}
        <div className="absolute inset-0 flex flex-col gap-9 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {!isOrdered ? (
            <div className="flex gap-5 items-center">
              <button name="substract" onClick={() => addOrSubs("subs")}>
                <img
                  src={buttonMin}
                  alt=""
                  className="w-[4rem] h-[4rem] cursor-pointer"
                />
              </button>
              <p className="text-xl">{data.quantity}</p>
              <button name="add" onClick={() => addOrSubs("add")}>
                <img
                  src={buttonPlus}
                  alt=""
                  className="w-[4rem] h-[4rem] cursor-pointer"
                />
              </button>
            </div>
          ) : (
            <button
            onClick={() => navigate(`../cart/${orderId}`)}
             className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600">
              View Cart
            </button>
          )}

          {data.quantity > 0 && (
            <button
              onClick={clickSendData}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>

      {/* Rest of the card content */}
      <img src={line4} alt="" className="mt-4 mb-1 w-4/5" />
      <div className="flex gap-3 items-center">
        <h6 className="text-xs">{item.name}</h6>
        <img src={line3} alt="" />
        <h6 className="text-xs">Rp. {item.price}</h6>
      </div>
      <img src={line5} alt="" className="mt-1 w-4/5" />
      <p className="text-xs mt-2">
        Maison du Café is more than just a café—it's a destination where every
        visit leaves you with lasting memories.
      </p>
      <p className="text-xs mt-2">Stock: {item.stock}</p>
    </div>
  );
};
