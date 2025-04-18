import { Divider } from "@mui/material";
import { CustomButton } from "./CustomButton";

export interface OrderDetails {
  itemId: number;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

export interface QrisPaymentDetail {
  transactionId: string;
  paymentExpiryAt: string;
  paymentCreatedAt: string;
  transactionStatus: string;
  url: string;
  qrString: string;
}

export interface OnlinePaymentOrderCardProps {
  paymentId: string;
  orderId: number;
  orderDetails: OrderDetails[];
  amount: number;
  paymentMethod: string;
  paymentDetail: QrisPaymentDetail;
  // addressId: string;
  // fullAddress: string;
}

export const OnlinePaymentOrderCard = (props: {
  list: OnlinePaymentOrderCardProps;
}) => {

  // const openDialog = useDialog(state => state.openDialog);

  const {
    amount,
    paymentDetail,
    paymentMethod,
    paymentId,
    orderId,
    orderDetails,
  } = props.list;
  return (
    <div
      key={paymentId}
      className="mt-6 w-full border border-gray-200 shadow-md rounded-xl overflow-hidden"
    >
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-gray-700">
            No. Pesanan: #{orderId}
          </p>
          <span className="text-xs text-red-500 font-semibold">
            {/* Belum Selesai */}
            {paymentDetail.transactionStatus}
          </span>
        </div>

        <Divider sx={{ height: 1 }} />

        {/* Product Info */}
        <div className="flex gap-4 items-start justify-between">
          <div className="">
            {/* <div className="flex gap-3 mt-3">
              <img
                src="https://via.placeholder.com/80"
                alt="Produk"
                className="w-20 h-20 object-cover rounded-md border"
              />
              <div className="flex flex-col">
                <h6 className="text-base font-semibold">ChatGPT Premium</h6>
                <p className="text-sm text-gray-600">Rp60.000 x 2</p>
                <p className="text-blue-600 text-sm mt-1 hover:underline cursor-pointer">
                  Pesanan selengkapnya
                </p>
              </div>
            </div> */}

            {orderDetails.map((order) => (
              <div key={order.itemId} className="flex gap-3 mt-3">
                <img
                  src={order.imageUrl}
                  alt="Produk"
                  className="w-20 h-20 object-cover rounded-md border"
                />
                <div className="flex flex-col">
                  <h6 className="text-base font-semibold">{order.name}</h6>
                  <p className="text-sm text-gray-600">Rp{order.price}x {order.quantity}</p>
                  <p className="text-blue-600 text-sm mt-1 hover:underline cursor-pointer">
                    Pesanan selengkapnya
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">Jumlah yang Dibayarkan</p>
            <p className="text-base font-bold text-gray-800">Rp{amount}</p>
          </div>
        </div>

        <Divider sx={{ height: 1 }} />

        {/* Payment Info */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Pesanan dibuat:{" "}
            {/* <span className="font-medium text-gray-800">18-04-2025 08:28</span>{" "} */}
            <span className="font-medium text-gray-800">
              {paymentDetail.paymentCreatedAt}
            </span>{" "}
          </p>

          <p className="text-sm text-gray-600">
            Bayar sebelum{" "}
            {/* <span className="font-medium text-gray-800">18-04-2025 08:28</span>{" "} */}
            <span className="font-medium text-gray-800">
              {paymentDetail.paymentExpiryAt}
            </span>{" "}
            dengan{" "}
            <span className="font-medium text-gray-800">
              {paymentMethod.toUpperCase()}
            </span>
          </p>

          <CustomButton name="Bayar Sekarang" url={paymentDetail.url} />
        </div>
      </div>
    </div>
  );
};
