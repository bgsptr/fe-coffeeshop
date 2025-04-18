export const OrderCard = () => {
  return (
    <>
      {/* {items} */}
      <div className="border-1 rounded-2xl">
        <div className="w-full h-10">
          <div className="px-3 flex items-center h-full text-sm gap-3 bg-[#f8f8f8] rounded-t-2xl">
            <input type="checkbox" className="w-10 h-1/2" />
            <p className="font-bold text-ggb00">Shipping ID</p>
            <p className="font-normal">12 Jan 2018 13:14</p>
            <div className="border-1 px-2 bg-white">
              <p className="font-semibold text-xs">Pesanan Baru</p>
            </div>
          </div>
        </div>
        <div className="w-full h-[10rem]">
          <div className="p-[1.5rem] flex justify-between">
            <img src="" alt="" className="w-10 h-10 flex-[5%]" />
            <div className="flex flex-col gap-2 flex-[40%]">
              <h6 className="text-sm text-ggb00 font-bold">Order ID - 123</h6>
              <p className="text-sm">2 Produk</p>
              <q className="text-sm">
                <i>
                  Tolong tehnya disimpan dalam kemasan. Tolong tehnya disimpan
                  dalam kemasan. Tolong tehnya disimpan dalam kemasan
                </i>
              </q>
            </div>
            <div className="text-sm flex-[25%] px-7">
              <h6 className="font-bold mb-2">Alamat Pengiriman</h6>
              <p>Br. Bindu Mekar Bhuana</p>
              <p>Abiansemal, Badung 80352</p>
            </div>
            <div className="text-sm flex-[20%]">
              <h6 className="font-bold mb-2">Kurir</h6>
              <p>JNE - Reguler (Rp15.000)</p>
            </div>
            <div className="text-xl flex-[10%]">
              <h6 className="font-bold text-sm mb-2">Total Harga</h6>
              <p className="text-ob052 font-bold">Rp800.000</p>
            </div>
          </div>
        </div>
        <div className="w-full h-[3.6rem] border-t-1">
          {/* button cancel and terima pesanan */}
          <div className="h-full flex items-center p-4 gap-4 flex-row-reverse">
            <button className="text-sm font-medium px-10 py-[0.5rem] border-1 rounded-lg bg-ggb00 hover:bg-hggb00 text-white">
              Terima Pesanan
            </button>
            <button className="bg-[#E63946] hover:bg-[#C72C3C] text-white text-sm font-medium px-10 py-[0.5rem] border-1 rounded-lg">
              Cancel Pesanan
            </button>
          </div>
          {/* button cancel and terima pesanan */}
        </div>
      </div>
      {/* {items} */}
    </>
  );
};
