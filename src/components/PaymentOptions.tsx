import { useState } from "react";
import { Radio } from "@mui/material"; // or your custom Radio component

export default function PaymentOptions() {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [isOnlineDropdownOpen, setOnlineDropdownOpen] = useState(false);

  const handleRadioBankChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMethod(event.target.value);
  };

  const radioIsChecked = (value: string) => selectedMethod === value;

  const toggleOnlineDropdown = () => {
    setOnlineDropdownOpen((prev) => !prev);
  };

  return (
    <div>
      {/* COD */}
      <div className="mt-3 border-b pb-3">
        <div className="flex gap-3 justify-between">
          <img src="" alt="" />
          <div>
            <p className="font-semibold">COD</p>
            <p className="text-gray-600 text-sm">Bayar Langsung di Tempat</p>
          </div>
          <Radio
            checked={radioIsChecked("cash")}
            onChange={handleRadioBankChange}
            value="cash"
            name="radio-buttons"
          />
        </div>
      </div>

      {/* Pembayaran Online */}
      <div className="mt-3 border-b pb-3 cursor-pointer" onClick={toggleOnlineDropdown}>
        <div className="flex gap-3 justify-between items-center">
          <img src="" alt="" />
          <div className="flex-1">
            <p className="font-semibold">Pembayaran Online</p>
            <p className="text-gray-600 text-sm">Mudah & terverifikasi otomatis</p>
          </div>
          <span className="text-blue-500">{isOnlineDropdownOpen ? "▲" : "▼"}</span>
        </div>

        {/* Dropdown items */}
        {isOnlineDropdownOpen && (
          <div className="mt-3 ml-8 space-y-3">
            {/* QRIS */}
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">QRIS</p>
                <p className="text-gray-600 text-sm">Bayar dengan Sekali Scan</p>
              </div>
              <Radio
                checked={radioIsChecked("qris")}
                onChange={handleRadioBankChange}
                value="qris"
                name="radio-buttons"
              />
            </div>

            {/* BCA */}
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">BCA Virtual Account</p>
                <p className="text-gray-600 text-sm">Mudah & terverifikasi otomatis</p>
              </div>
              <Radio
                checked={radioIsChecked("bca")}
                onChange={handleRadioBankChange}
                value="bca"
                name="radio-buttons"
              />
            </div>
          </div>
        )}
      </div>

      {/* Other banks */}
      <div className="mt-3 border-b pb-3">
        <div className="flex gap-3 justify-between">
          <img src="" alt="" />
          <div>
            <p className="font-semibold">BRI Virtual Account</p>
            <p className="text-gray-600 text-sm">Mudah & terverifikasi otomatis</p>
          </div>
          <Radio
            checked={radioIsChecked("bri")}
            onChange={handleRadioBankChange}
            value="bri"
            name="radio-buttons"
          />
        </div>
      </div>

      <div className="mt-3 border-b pb-3">
        <div className="flex gap-3 justify-between">
          <img src="" alt="" />
          <div>
            <p className="font-semibold">Mandiri Virtual Account</p>
            <p className="text-gray-600 text-sm">Mudah & terverifikasi otomatis</p>
          </div>
          <Radio
            checked={radioIsChecked("mandiri")}
            onChange={handleRadioBankChange}
            value="mandiri"
            name="radio-buttons"
          />
        </div>
      </div>
    </div>
  );
}
