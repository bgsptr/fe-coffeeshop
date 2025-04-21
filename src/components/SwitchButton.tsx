import { useEffect } from "react";
import useCart from "../hooks/useCart";
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function SwitchButton(props: {
  orderId: number;
  // isChecked: boolean;
}) {
  const data = useCart();

  useEffect(() => {
    console.log(data.carts);
  }, [data.carts]);

  return (
    <Switch
      key={props.orderId}
      {...label}
      name={props.orderId?.toString()}
      checked={
        data.carts.find((cart) => cart.orderId === props.orderId)?.isChecked
      }
      onChange={(e) => {
        data.reset();
        data.setCartInit(Number(e.currentTarget.name));
        data.updateCart(Number(e.currentTarget.name));
        localStorage.setItem("cart_id", e.currentTarget.name);
      }}
    />
  );
}
