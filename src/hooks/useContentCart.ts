import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ProductCartShow {
  itemId: number;
  name: string;
  quantity?: number;
  image?: string;
}

export interface ContentCartState {
  firstImageInItemCart: string;
  products: ProductCartShow[];
  setFirstImageInItemCart: (imageUrl: string) => void;
  setProducts: (allProducts: ProductCartShow[]) => void;
}

const useContentCart = create<ContentCartState>()(
  persist(
    (set) => ({
      firstImageInItemCart: "",
      products: [],

      setFirstImageInItemCart: (imageUrl: string) =>
        set(() => ({
          firstImageInItemCart: imageUrl,
        })),

      setProducts: (allProducts: ProductCartShow[]) =>
        set(() => ({
          products: allProducts,
        })),
    }),
    {
      name: "content-cart-storage",
    }
  )
);

export default useContentCart;
