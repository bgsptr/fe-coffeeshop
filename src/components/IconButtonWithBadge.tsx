import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Badge, { badgeClasses } from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import SwitchButton from "./SwitchButton";

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -2px;
    right: -2px;
  }
`;

export default function IconButtonWithBadge(props: {
  carts: any[];
  resetCartState: () => void;
}) {
  return (
    <div className="relative group">
      <IconButton>
        <CartBadge
          badgeContent={props.carts.length}
          color="primary"
          overlap="circular"
        >
          <ShoppingCartIcon
            fontSize="large"
            className="text-white"
            sx={{ strokeWidth: 1 }}
          />
        </CartBadge>
      </IconButton>

      {/* Dropdown panel */}
      <div className="absolute hidden group-hover:block text-black bg-white border rounded shadow-lg left-[-600%] w-[30rem] z-[10]">
        <div className="flex items-center justify-between p-4">
          <p>Keranjang ({props.carts.length})</p>
          <button onClick={props.resetCartState}>Reset / Keranjang Baru</button>
        </div>
        <div className="overflow-y-auto max-h-[300px]">
          {props.carts?.map((cart) => (
            <div key={cart.id} className="block px-4 py-2">
              <div className="flex justify-between">
                <p className="mb-2 font-bold">ID: {cart.id}</p>
                <SwitchButton orderId={cart.id} />
              </div>
              <div className="flex justify-between">
                <div className="flex items-start gap-3">
                  <img
                    src=""
                    alt="product"
                    className="w-12 h-12 object-cover"
                  />
                  <a href="#" className="hover:bg-gray-100">
                    Product Name
                  </a>
                </div>
                <p className="font-bold">Rp{cart.totalPrice}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
