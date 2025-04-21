import { Item } from "../pages/Menu";
import { SwitchCart } from "../components/Navbar";
import { create } from "zustand";

export interface CartState {
  carts: SwitchCart[];
  items: Item[];
  cartInit: number;
  cartIsRefresh: boolean;
  setCartInit: (cartId: number) => void;
  setCarts: (data: SwitchCart[]) => void;
  setItems: (data: Item[]) => void;
  reset: () => void;
  updateCart: (id: number) => void;
  setCartRefresh: (data: boolean) => void;
}

  // const [items, setItems] = useState<Item[]>([]);

const useCart = create<CartState>((set) => ({
  cartIsRefresh: false,
  cartInit: Number(localStorage.getItem("cart_id")) || 0,
  carts: [],

  items: [],

  setItems: (data: Item[]) => set(() => ({
    items: data
  })),

  setCartInit: (cartId: number) =>
    set(() => ({
      cartInit: cartId,
    })),

  setCarts: (data: SwitchCart[]) =>
    set(() => ({
      carts: data.map((d) =>
        d.orderId === Number(localStorage.getItem("cart_id"))
          ? ({
              ...d,
              isChecked: true,
            } as SwitchCart)
          : d
      ),
    })),

  // setCarts: (data: SwitchCart[], currentCartId?: number) =>
  //   set(() => {
  //     const activeCartId = currentCartId ?? Number(localStorage.getItem("cart_id"));
  //     return {
  //       carts: data.map((d) => ({
  //         ...d,
  //         isChecked: d.orderId === activeCartId,
  //       }))
  //     };
  //   }),

  setCartRefresh: (data: boolean) =>
    set(() => ({
      cartIsRefresh: data,
    })),

  reset: () =>
    set((state) => ({
      carts: state.carts.map((cart) => ({
        ...cart,
        isChecked: false,
      })),
    })),

  updateCart: (id: number) =>
    set((state) => ({
      carts: state.carts.map((cart: SwitchCart) =>
        cart.orderId === id
          ? ({
              ...cart,
              isChecked: true,
            } as SwitchCart)
          : cart
      ),
    })),
}));

export default useCart;
