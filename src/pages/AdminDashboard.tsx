import { useEffect, useState } from "react";
import { ButtonFilter } from "../components/ButtonFilter";
import { Navbar } from "../components/Navbar";
import { OrderCard } from "../components/OrderCard";
import { variables } from "../constants/variable";
import { fetchData } from "../utils/fetchData";
import { PaymentTypeEnum } from "../components/types";

export interface OrderDashboard {
  id: string;
  amount: string;
  paymentType: PaymentTypeEnum;
  transactionDate: string;
  order: {
    id: number;
    totalPrice: string;
  };
  user: {
    addresses: [
      {
        fullAddress: string;
        postalCode: string;
        estimatedTime: number;
      }
    ];
  };
}

export const AdminDashboard = () => {
  const [orderDashboard, setOrderDashboard] = useState<OrderDashboard[]>([]);
  const fetchOrderDashboardData = async () => {
    const url = `${variables.BASE_URL}/payments/list/orders`;
    try {
      const response = await fetchData(url);
      setOrderDashboard(response.result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrderDashboardData();
  }, []);

  useEffect(() => {
    console.log(orderDashboard);
  }, [orderDashboard]);

  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="flex-[5%] bg-white min-h-screen border-1"></div>
        <div className="flex-[95%] p-[2.4rem]">
          <h6 className="font-bold text-xl mb-6">Daftar Pesanan</h6>
          <div className="flex gap-3 items-center mb-12">
            <h6 className="font-bold">Status</h6>
            <ButtonFilter buttonName="Semua Pesanan" />
            <ButtonFilter buttonName="Pesanan Baru" />
            <ButtonFilter buttonName="Sedang Diproses & Siap Dikirim" />
            <ButtonFilter buttonName="Sedang Dikirim" />
            <ButtonFilter buttonName="Pesanan Selesai" />
            <ButtonFilter buttonName="Pesanan Dibatalkan" />
          </div>
          <div className="flex flex-col gap-7">
            {orderDashboard.map((order) => (
              <OrderCard payment={order} />
            ))}
            {/* <OrderCard order={orderDashboard} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
