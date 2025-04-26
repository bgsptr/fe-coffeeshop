import { useEffect, useState } from "react";
import CustomLineChart from "../components/CustomLineChart";
import { Navbar } from "../components/Navbar";
import { fetchData } from "../utils/fetchData";
import { variables } from "../constants/variable";
import { useNavigate } from "react-router-dom";
import { PaymentStatusEnum, PaymentTypeEnum } from "../components/types";
import DatePickerWithRange from "../components/DatePickerWithRange";

export interface Transaction {
  id: string;
  userId: number;
  orderId: number;
  amount: number;
  paymentType: PaymentTypeEnum;
  paymentStatus: PaymentStatusEnum;
  transactionDate: Date | any;
  channel: string;
  user: {
    email: string;
  };
}

export const AdminTransaction = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  // const transactions = [
  //   {
  //     date: "2025-03-21 10:30 AM",
  //     orderId: "#ORD12345",
  //     type: "Payment",
  //     channel: "Credit Card",
  //     status: "Success",
  //     amount: "Rp1.500.000",
  //     email: "customer@example.com",
  //   },
  //   {
  //     date: "2025-03-21 11:15 AM",
  //     orderId: "#ORD12346",
  //     type: "Cash",
  //     channel: "QRIS",
  //     status: "Pending",
  //     amount: "Rp500.000",
  //     email: "user@example.com",
  //   },
  // ];

  const fetchTransactionData = async () => {
    const url = `${variables.BASE_URL}/payments`;

    try {
      // const { success, statusCode, message, result } = await fetchData(url);
      const { result } = await fetchData(url);

      console.log(result);

      // setTransactions({
      //   ...result,
      //   channel: "cash",
      // });

      setTransactions(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTransactionData();
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="flex-[5%] bg-white min-h-screen border-1 shadow-xl"></div>
        <div className="flex-[95%] p-[2.4rem] bg-gref8 relative z-10">
          <div className="h-1/4 z-[-10] absolute left-0 top-0 w-full bg-[linear-gradient(to_bottom,white_10%,#BFDBFE_90%)]"></div>
          <h6 className="font-bold text-2xl mb-6">Transaction List</h6>
          <div className="bg-white shadow-md border-md rounded-md pt-9">
            <div className="flex w-full">
              <div className="pb-11 ml-[4rem] mb-9 border-1 rounded-md w-1/6 relative rounded-xl shadow-md">
                <h6 className="p-3 text-nn600 font-semibold">Pendapatan</h6>
                <p className="px-3 font-bold text-xl">Rp560.000</p>
                <div className="absolute bottom-0 bg-ggb00 w-full h-2 rounded-b-xl shadow-md"></div>
              </div>
              <div className="pb-11 ml-[4rem] mb-9 border-1 rounded-xl w-1/6 relative">
                <h6 className="p-3 text-nn600 font-semibold">Terjual</h6>
                <p className="px-3 font-bold text-xl">5000</p>
                <div className="absolute bottom-0 bg-sec w-full h-2 rounded-b-xl"></div>
              </div>
              <DatePickerWithRange />
            </div>

            <CustomLineChart />
          </div>

          <div className="w-full min-h-screen bg-white mt-6 p-9 shadow-md border-md rounded-md">
            {/* dasboard total penjualan */}
            <div className="w-full">
              <div className="flex h-full justify-between items-center">
                <div className="flex gap-9 items-center h-full mb-4 mt-3">
                  <div className="flex-[60%] relative w-1/5 top-2 mb-4">
                    <input
                      type="text"
                      placeholder="Cari produk, order ID..."
                      className="h-10 pl-4 pr-12 border-2 rounded-lg text-gray-700 shadow-sm focus:ring focus:ring-green-200 focus:outline-none"
                    />
                    <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gref8 hover:bg-green-600 text-white py-[0.4rem] px-[0.5rem] rounded-md">
                      🔍
                    </button>
                  </div>

                  <button className="flex-[27.5%] py-2 text-sm font-medium px-5 border-2 rounded-lg text-nn600 rounded-xl">
                    Product Sold
                  </button>
                  <button className="flex-[10%] py-2 text-sm font-medium px-6 border-2 rounded-lg text-nn600 rounded-xl">
                    Transaction
                  </button>
                </div>
                <button
                  onClick={() => navigate("../admin/product")}
                  className="text-sm font-medium h-10 px-10 rounded-lg bg-ggb00 hover:bg-hggb00 text-white"
                >
                  Buat Menu Baru
                </button>
              </div>
            </div>
            <table className="w-full border-collapse">
              {/* Table Header */}
              <thead>
                <tr className="border-t-1 border-b-1 text-gray-600 text-left text-sm font-semibold">
                  <th className="py-5 px-3">DATE & TIME</th>
                  <th className="py-5 px-3">ORDER ID</th>
                  <th className="py-5 px-3">TRANSACTION TYPE</th>
                  <th className="py-5 px-3">CHANNEL</th>
                  <th className="py-5 px-3">STATUS</th>
                  <th className="py-5 px-3">AMOUNT</th>
                  <th className="py-5 px-3">CUSTOMER E-MAIL</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {transactions &&
                  transactions?.map((tx, index) => (
                    <tr
                      key={tx.id}
                      className={`border-b text-gray-700 text-sm ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100 transition`}
                    >
                      <td className="p-3">{tx.transactionDate}</td>
                      <td className="p-3">{tx.orderId}</td>
                      <td className="p-3">{tx.paymentType}</td>
                      <td className="p-3">{tx.channel}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-lg ${
                            tx.paymentStatus === PaymentStatusEnum.PAID
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {tx.paymentStatus}
                        </span>
                      </td>
                      <td className="p-3">{tx.amount}</td>
                      <td className="p-3">{tx.user.email}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {/* dasboard total penjualan */}
          </div>
        </div>
      </div>
    </div>
  );
};
