import { OnlinePaymentOrderCard } from "../components/OnlinePaymentOrderCard";
import { ButtonFilter } from "../components/ButtonFilter";
import { CustomizeSearchInput } from "../components/CustomizeSearchInput";
import DatePickerWithRange from "../components/DatePickerWithRange";
import { Navbar } from "../components/Navbar";
import { useEffect, useState } from "react";
import { fetchData } from "../utils/fetchData";
import { variables } from "../constants/variable";
import CustomizedDialogs from "../components/CustomizedDialogs";
import useDialog from "../hooks/useDialog";

const OrderHistory = () => {
  const [orderList, setOrderList] = useState<any[]>([]);

  // const { url, qrString, isClosed, openDialog, closeDialog, onUnmoutDialog } =
  //   useDialog((state) => ({
  //     url: state.url,
  //     qrString: state.qrString,
  //     isClosed: state.isClosed,
  //     openDialog: state.openDialog,
  //     closeDialog: state.closeDialog,
  //     onUnmountDialog: state.onUnmountDialog,
  //   }));

  const dialog = useDialog();

  // const [dialogIsOpen, setDialogIsOpen] = useState(true);

  const fetchPaymentOrderList = async () => {
    try {
      const url = `${variables.BASE_URL}/payments/list/online`;
      const data = await fetchData(url);

      console.log(data);
      setOrderList(data.result);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPaymentOrderList();
  }, []);

  return (
    <div>
      {!dialog.isClosed && <CustomizedDialogs />}
      <Navbar />
      <div className="flex">
        <div className="flex-[100%] p-[2.4rem] px-[8rem] bg-gref8 relative z-10">
          <div className="h-1/4 z-[-10] absolute left-0 top-0 w-full bg-[linear-gradient(to_bottom,white_10%,#BFDBFE_90%)]"></div>
          <h6 className="font-bold text-2xl mb-6">Histori Order</h6>

          <div className="w-full min-h-screen bg-white mt-6 p-9 shadow-md border-md rounded-md">
            {/* dasboard total penjualan */}
            <div className="w-full">
              <div className="flex h-full justify-between items-center">
                <div className="flex gap-9 items-center h-full mb-4 mt-3">
                  <div className="flex-[60%] relative w-1/5 top-2 mb-4">
                    <CustomizeSearchInput />
                  </div>

                  <DatePickerWithRange />
                </div>
              </div>
            </div>

            <div className="flex gap-5 items-center">
              <p className="text-sm font-bold">Status</p>
              <ButtonFilter buttonName="Semua" />
              <ButtonFilter buttonName="Sedang Diantarkan" />
              <ButtonFilter buttonName="Berhasil" />
              <ButtonFilter buttonName="Gagal" />
            </div>
            {orderList.map((list) => (
              <OnlinePaymentOrderCard list={list} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
