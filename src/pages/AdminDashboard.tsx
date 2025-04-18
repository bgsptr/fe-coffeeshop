import { ButtonFilter } from "../components/ButtonFilter";
import { Navbar } from "../components/Navbar";
import { OrderCard } from "../components/OrderCard";

export const AdminDashboard = () => {
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
            <OrderCard />
            <OrderCard />
          </div>
        </div>
      </div>
    </div>
  );
};
