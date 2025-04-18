import { ChangeEvent, useEffect, useState } from "react";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
import axios from "axios";
import { fetchData } from "../utils/fetchData";
import { variables } from "../constants/variable";
import { sendData } from "../utils/sendData";
import { useNavigate } from "react-router-dom";
import { Radio } from "@mui/material";

export interface Position {
  lat: string;
  lng: string;
}

// input alamat
export interface AddressDetail {
  street: string;
  village: string;
  district: string;
  regency: string;
  province: string;
  country: string;
  postalCode: string;
  fullAddress: string;
}

export interface ShippingAddressInformation {
  addressId?: string;
  label: string;
  lat: string;
  lng: string;
  distance: number;
  estimatedTime: number;
  addressData: AddressDetail;
}

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  subtotal: number;
  // price: number;
}

export interface CheckoutData {
  cart_items?: CartItem[];
  total_price: number;
  total_items: number;
  payment_method?: string;
  shipping_cost: number;
  tax_amount: number;
  grand_total: number;
  customer_note?: string;
}

export const Checkout = () => {
  const [addressBar, setAddressBar] = useState<boolean>(false);
  const [location, setLocation] = useState("");
  const [isClicked, setIsClicked] = useState(true);
  const [predictLocation, setPredictLocation] = useState<string[]>([]);
  const [positionObject, setPositionObject] = useState<Position>();
  const [, setAddresses] = useState([]);
  const [shippingCost, setShippingCost] = useState("");

  const defaultAddress: ShippingAddressInformation = {
    label: "",
    lat: "",
    lng: "",
    distance: 0,
    estimatedTime: 0,
    addressData: {
      street: "",
      village: "",
      district: "",
      regency: "",
      province: "",
      country: "",
      postalCode: "",
      fullAddress: "",
    },
  };

  const [addressFetchDetail, setAddressFetchDetail] =
    useState<ShippingAddressInformation>(defaultAddress);

  useEffect(() => {
    if (!location || location.trim().length < 2) {
      setPredictLocation([]);
      return;
    }

    console.log("you type: ", location);
    const googleMapUrl = `https://places.googleapis.com/v1/places:autocomplete?regionCode=ID`;

    const controller = new AbortController();
    const { signal } = controller;

    const showAutocompleteData = async () => {
      try {
        const res = await axios.post(
          googleMapUrl,
          {
            input: location,
            regionCode: "ID",
            languageCode: "id",
          },
          {
            headers: {
              "Content-Type": "application/json",
              "X-Goog-Api-Key": variables.API_KEY_GMAPS,
            },
            signal,
          }
        );

        console.log(res.data);

        const mapDataArray: any[] = res.data.suggestions ?? [];

        const data = mapDataArray?.map(
          (val: any) => val.placePrediction.text.text
        );

        console.log(data);
        setPredictLocation(data);
      } catch (err) {
        console.error(err);
      }
    };

    const debounceTimeout = setTimeout(() => {
      showAutocompleteData();
    }, 300);

    // showAutocompleteData();

    return () => {
      clearTimeout(debounceTimeout);
      controller.abort();
    };
  }, [location]);

  const [distance] = useState("");
  const [, setDistanceValue] = useState(0);
  const [, setDurationValue] = useState(0);

  const origin = { lat: -8.5496664, lng: 115.2304305 }; // Bindu: Dagang Kopi
  // const destination = { lat: 34.0522, lng: -118.2437 }; // Los Angeles

  //test async distance matrix
  const calculateDistance = async (
    address: string
  ): Promise<{ duration: number; distance: number }> => {
    return new Promise((resolve, reject) => {
      const service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [address],
          travelMode: google.maps.TravelMode.DRIVING,
          avoidTolls: true,
        },
        (response, status) => {
          if (status === "OK") {
            console.log("dataaaaaaaa:", response);

            // const durationText = response?.rows[0].elements[0].duration.text || 0;
            // const distanceText = response?.rows[0].elements[0].distance.text || 0;
            const duration = response?.rows[0].elements[0].duration.value || 0;
            const distance = response?.rows[0].elements[0].distance.value || 0;

            setDistanceValue(distance);
            setDurationValue(duration);

            resolve({ duration, distance });
          } else {
            console.error(`Error: ${status}`);
            reject(new Error(`Error: ${status}`));
          }
        }
      );
    });
  };

  //alamat input

  const handleOnclickDatalist = async (place: string) => {
    setLocation(place.split(",")[0]);
    setPredictLocation([]);
    setIsClicked(false);

    const urlForLongAndLat = `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=${variables.API_KEY_GMAPS}`;

    try {
      const res = await axios.get(urlForLongAndLat, {
        headers: {
          "Content-Type": "application/json",
          // "X-Goog-Api-Key": `AIzaSyBM3BKrq2ds79JvBFsHuUZVwYdEMxhYSEs`,
        },
      });

      console.log("lang data: ", res.data.results[0]);

      const {
        address_components: addressComponents,
        formatted_address: detailAddress,
        geometry,
      } = res.data.results[0];

      const { lat, lng } = geometry.location;

      console.log("component: ", addressComponents);
      console.log("detail address: ", detailAddress);

      const [
        addressNumber,
        street,
        // village,
        // district,
        // regency,
        // province,
        // country,
        // postalCode,
      ] = addressComponents;

      const village = addressComponents[addressComponents.length - 6];
      const district = addressComponents[addressComponents.length - 5];
      const regency = addressComponents[addressComponents.length - 4];
      const province = addressComponents[addressComponents.length - 3];
      const country = addressComponents[addressComponents.length - 2];
      const postalCode = addressComponents[addressComponents.length - 1];

      setPositionObject({ lat, lng });

      try {
        const { duration, distance } = await calculateDistance(detailAddress);

        const addressData: AddressDetail = {
          street: street?.long_name.concat(" ", addressNumber?.long_name),
          village: village?.long_name,
          district: district?.long_name.split(" ")[1],
          regency: regency?.long_name.split(" ")[1],
          province: province?.long_name,
          country: country?.long_name,
          postalCode: postalCode?.long_name,
          fullAddress: detailAddress,
        };

        const shippingAddress: Partial<ShippingAddressInformation> = {
          // label: "",
          addressData,
          lat,
          lng,
          distance,
          estimatedTime: duration,
        };

        setAddressFetchDetail((prev) => ({
          ...prev,
          ...shippingAddress,
        }));

        setShippingCost(
          new Intl.NumberFormat("id-ID", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 3,
          }).format(distance * 2)
        );

        setCheckoutData((prev) => ({
          ...prev,
          grand_total:
            (prev.total_price ?? 0) + (prev.tax_amount ?? 0) + distance * 2,
        }));
      } catch (err) {
        console.error("error in address", err);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAuto = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log("click name")
    const { name, value } = e.target;

    setAddressFetchDetail((prev) => ({
      ...prev,
      addressData: {
        ...prev.addressData,
        [name]: value,
      },
    }));
  };

  // useEffect(() => {
  //   function getHighAccuracyLocation() {
  //     if ("geolocation" in navigator) {
  //         navigator.geolocation.watchPosition(
  //             (position) => {
  //                 console.log("Latitude:", position.coords.latitude);
  //                 console.log("Longitude:", position.coords.longitude);
  //                 console.log("Accuracy:", position.coords.accuracy, "meters");
  //             },
  //             (error) => {
  //                 console.error("Error getting location:", error.message);
  //             },
  //             {
  //                 enableHighAccuracy: true, // Enables GPS for better accuracy
  //                 timeout: 15000, // Wait up to 15 seconds
  //                 maximumAge: 0 // Do not use cached location
  //             }
  //         );
  //     } else {
  //         console.error("Geolocation is not supported by this browser.");
  //     }
  // }

  // // Call function
  // getHighAccuracyLocation();

  // })

  useEffect(() => {
    console.log(distance);
  }, [distance]);

  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    cart_items: [],
    total_price: 0,
    total_items: 0,
    payment_method: "",
    shipping_cost: 0,
    tax_amount: 0,
    grand_total: 0,
    customer_note: "",
  });

  const navigate = useNavigate();
  const [blurCheckout, setBlurCheckout] = useState(false);

  const fetchCheckoutSession = async () => {
    console.log("data");
    const url = `${variables.BASE_URL}/sessions/checkout`;
    try {
      const { result } = await fetchData(url);
      console.log("checkout data: ", result);
      // setCheckoutData(result.data);
      const totalPrice = Number(result.data.total_price);
      const taxAmount = (totalPrice * 12) / 100;
      setCheckoutData((prev) => ({
        ...prev,
        ...result.data,
        cart_items: result.data.cart_items,
        total_price: totalPrice,
        tax_amount: taxAmount,
        grand_total: totalPrice + taxAmount + (prev.shipping_cost ?? 0),
      }));
    } catch (err) {
      console.error(err);

      // if no session kick back to cart/:cart_id
      setBlurCheckout(true);
      setTimeout(() => {
        navigate(-1);
      }, 5000);
    }
  };

  const createAddress = async () => {
    console.log("data");
    const url = `${variables.BASE_URL}/addresses`;
    try {
      const { result } = await sendData(url, addressFetchDetail);
      console.log("address data: ", result);
      // setCheckoutData(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createOnClickAddress = () => {
    // setViewAllAddress(true)

    createAddress();
    setAddressBar(false);
  };

  const fetchFirstCreatedAddress = async () => {
    const url = `${variables.BASE_URL}/addresses?sort=created_at&order=asc&limit=1`;

    try {
      const response = await fetchData(url);
      console.log(response);

      if (!response?.result?.addresses) {
        console.log("No address found");
        return;
      }

      const address = response.result.addresses;

      setAddressFetchDetail({
        addressId: address.id,
        label: address.label ?? "",
        lat: address.lat?.toString() ?? "",
        lng: address.lng?.toString() ?? "",
        distance: address.distance ?? 0,
        estimatedTime: address.estimatedTime ?? 0,
        addressData: {
          street: address.street ?? "",
          village: address.village ?? "",
          district: address.district ?? "",
          regency: address.regency ?? "",
          province: address.province ?? "",
          country: address.country ?? "",
          postalCode: address.postalCode ?? "",
          fullAddress: address.fullAddress ?? "",
        },
      });

      setLocation(address.street);

      setShippingCost(
        new Intl.NumberFormat("id-ID", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 3,
        }).format(address.distance * 2)
      );

      setCheckoutData((prev) => {
        if (!prev) return prev;

        const shippingCost = address.distance * 2;

        return {
          ...prev,
          shipping_cost: shippingCost,
          grand_total:
            (prev.total_price ?? 0) + (prev.tax_amount ?? 0) + shippingCost,
        };
      });
    } catch (err) {
      console.error("Error when fetching user's addresses", err);
    }
  };

  useEffect(() => {
    //taruh fetch alamat
    fetchFirstCreatedAddress();

    //fetch data belanja
    fetchCheckoutSession();

    return () => {
      setIsClicked(false);
    };
  }, []);

  useEffect(() => {
    // console.log(positionObject);
    // console.log(addressFetchDetail);
    console.log("data in useeffect: ", checkoutData);
  }, [checkoutData]);

  const onClickAddressChanger = async () => {
    setAddressBar(true);

    const url = `${variables.BASE_URL}/addresses`;
    try {
      const result = await fetchData(url);

      setAddresses(result);
    } catch (err) {
      console.error(err);
    }
  };

  const [timer, setTimer] = useState(5);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(countdown);
          return 0;
        }

        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const payButton = async () => {
    const onlinePaymentUrl = `${variables.BASE_URL}/payments/online`;
    // const serverKey = process.env.SERVER_KEY_MIDTRANS;
    // const base64ServerKey = Buffer.from(serverKey + ":").toString("base64");

    try {
      const res = await axios.post(
        onlinePaymentUrl,
        JSON.stringify({
          transaction_details: {
            order_id: "5",
            gross_amount: 100,
          },
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { token, redirect_url } = res.data.result;

      console.log("pay clicked");
      window.snap.embed(token, {
        embedId: "snap-container",
        onSuccess: function (result) {
          /* You may add your own implementation here */
          alert("payment success!");
          console.log(result);
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          alert("wating your payment!");
          console.log(result);
        },
        onError: function (result) {
          /* You may add your own implementation here */
          alert("payment failed!");
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (err) {}
  };

  const [selectedRadioBank, setSelectedRadioBank] = useState("bca");

  const handleRadioBankChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedRadioBank(e.target.value);
  };

  const radioIsChecked = (buttonName: string) => {
    return selectedRadioBank === buttonName;
  };

  return (
    <div className="relative z-0">
      {blurCheckout && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* redirect modal after missing checkout session */}
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 text-center">
            {/* Loading spinner icon */}
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Redirect you back in {timer} seconds
            </h3>

            {/* Description */}
            <p className="text-gray-500 mb-6">
              You do not have any session checkout
            </p>

            {/* Button */}
            <button
              onClick={() => navigate(-1)} // or your dashboard route
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Go back previous page
            </button>
          </div>
        </div>
      )}

      {/* redirect modal after missing checkout session */}

      {addressBar && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/5 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-center mb-5">
              Alamat Pengantaran
            </h2>
            {/* <button className="border-1 rounded-xl py-2 w-full border-[#00AA5B] font-semibold text-[#00AA5B]">
              Tambah Alamat Baru
            </button> */}

            {/* floatInput */}
            <div className="relative mt-6">
              <input
                type="text"
                id="floatingInput"
                value={addressFetchDetail?.label}
                name="label"
                onChange={handleAuto}
                className="peer block w-full rounded-md border border-gray-300 bg-transparent px-3 pt-7 pb-2 text-gray-900 focus:pt-7 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder=" "
                required
              />
              <label
                htmlFor="floatingInput"
                className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-green-600"
              >
                Nama Alamat
              </label>
            </div>
            {/* floatInput */}

            {/* map */}
            <div className="mt-8">
              <APIProvider apiKey={variables.API_KEY_GMAPS}>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "60vh",
                  }}
                >
                  {/* Input Field Over Map */}
                  <div className="relative mt-6 mb-8">
                    <input
                      type="text"
                      id="floatingInput"
                      value={location}
                      name="location"
                      onChange={(e) => {
                        setIsClicked(true);
                        setLocation(e.currentTarget.value);
                      }}
                      className="peer block w-full rounded-md border border-gray-300 bg-transparent px-3 pt-7 pb-2 text-gray-900 focus:pt-7 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                      placeholder=""
                    />
                    <label
                      htmlFor="floatingInput"
                      className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-green-600"
                    >
                      Alamat Lengkap
                    </label>
                  </div>

                  {isClicked && predictLocation?.length > 0 ? (
                    <ul
                      style={{
                        position: "absolute",
                        width: "100%",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        background: "#fff",
                        listStyleType: "none",
                        padding: "0",
                        margin: "0",
                        zIndex: 10,
                        maxHeight: "150px",
                        overflowY: "auto",
                      }}
                    >
                      {predictLocation.map((place, index) => (
                        <li
                          key={index}
                          onClick={() => handleOnclickDatalist(place)}
                          style={{
                            padding: "8px",
                            cursor: "pointer",
                            borderBottom: "1px solid #ddd",
                          }}
                        >
                          {place}
                        </li>
                      ))}
                    </ul>
                  ) : isClicked && location?.length > 2 ? (
                    <p
                      style={{
                        position: "absolute",
                        width: "100%",
                        background: "#fff",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        padding: "8px",
                        margin: "0",
                        zIndex: 10,
                      }}
                    >
                      No results found
                    </p>
                  ) : null}

                  {/* input */}

                  {distance && <p>Distance: {distance}</p>}

                  {/* Google Map */}
                  <Map
                    style={{ width: "100%", height: "100%" }}
                    //set default location by allowed user position
                    defaultCenter={{
                      lat: addressFetchDetail
                        ? Number(addressFetchDetail.lat)
                        : Number(positionObject?.lat),
                      lng: addressFetchDetail
                        ? Number(addressFetchDetail.lng)
                        : Number(positionObject?.lng),
                    }}
                    defaultZoom={4}
                    gestureHandling={"greedy"}
                    disableDefaultUI={true}
                    mapId={variables.GMAP_ID}
                    center={{
                      lat: addressFetchDetail
                        ? Number(addressFetchDetail.lat)
                        : Number(positionObject?.lat),
                      lng: addressFetchDetail
                        ? Number(addressFetchDetail.lng)
                        : Number(positionObject?.lng),
                    }}
                    zoom={17}
                  >
                    <AdvancedMarker
                      position={{
                        lat: addressFetchDetail
                          ? Number(addressFetchDetail.lat)
                          : Number(positionObject?.lat),
                        lng: addressFetchDetail
                          ? Number(addressFetchDetail.lng)
                          : Number(positionObject?.lng),
                      }}
                    >
                      <Pin
                        background={"#0f9d58"}
                        borderColor={"#006425"}
                        glyphColor={"#60d98f"}
                      />
                    </AdvancedMarker>
                  </Map>
                </div>
              </APIProvider>
            </div>
            {/* map */}

            {/* floatInput */}
            <div className="relative mt-[7rem]">
              <input
                type="text"
                id="floatingInput"
                value={addressFetchDetail?.addressData.village}
                name="village"
                onChange={handleAuto}
                className="peer block w-full rounded-md border border-gray-300 bg-transparent px-3 pt-7 pb-2 text-gray-900 focus:pt-7 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder=" "
              />
              <label
                htmlFor="floatingInput"
                className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-green-600"
              >
                Kelurahan
              </label>
            </div>
            {/* floatInput */}

            {/* floatInput */}
            <div className="relative mt-6">
              <input
                type="text"
                id="floatingInput"
                value={addressFetchDetail?.addressData.regency}
                name="regency"
                onChange={handleAuto}
                className="peer block w-full rounded-md border border-gray-300 bg-transparent px-3 pt-7 pb-2 text-gray-900 focus:pt-7 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder=" "
              />
              <label
                htmlFor="floatingInput"
                className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-green-600"
              >
                Kota & Kabupaten
              </label>
            </div>
            {/* floatInput */}

            {/* floatInput */}
            <div className="flex w-full gap-9">
              <div className="relative mt-6 w-1/2">
                <input
                  type="text"
                  id="floatingInput1"
                  value={addressFetchDetail?.addressData.province}
                  name="province"
                  onChange={handleAuto}
                  className="peer block w-full rounded-md border border-gray-300 bg-transparent px-3 pt-7 pb-2 text-gray-900 focus:pt-7 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder=" "
                />
                <label
                  htmlFor="floatingInput1"
                  className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-green-600"
                >
                  Provinsi
                </label>
              </div>

              <div className="relative mt-6 w-1/2">
                <input
                  type="text"
                  id="floatingInput2"
                  value={addressFetchDetail?.addressData.postalCode}
                  name="postalCode"
                  onChange={handleAuto}
                  className="peer block w-full rounded-md border border-gray-300 bg-transparent px-3 pt-7 pb-2 text-gray-900 focus:pt-7 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder=" "
                />
                <label
                  htmlFor="floatingInput2"
                  className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-green-600"
                >
                  Kode Pos
                </label>
              </div>
            </div>
            {/* floatInput */}

            {/* float */}
            {/* <div className="relative mt-6">
              <textarea
                id="floatingTextarea"
                // value={textareaValue}
                // onChange={(e) => setTextareaValue(e.target.value)}
                rows={4}
                className="resize-none peer block w-full rounded-md border border-gray-300 bg-transparent px-3 pt-7 pb-1 text-gray-900 focus:border-green-500 focus:outline-none focus:pt-7 focus:ring-1 focus:ring-green-500"
                placeholder=" "
              ></textarea>
              <label
                htmlFor="floatingTextarea"
                className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-green-600"
              >
                Alamat Lengkap
              </label>
            </div> */}
            {/* float */}

            {/* close button */}
            <div className="flex justify-start gap-5">
              <button
                onClick={() => setAddressBar(false)}
                className="px-4 py-2 text-white bg-red-500 rounded-lg mt-[4rem]"
              >
                Close
              </button>

              <button
                onClick={createOnClickAddress}
                className="px-4 py-2 text-white bg-green-500 rounded-lg mt-[4rem]"
              >
                Update / Create
              </button>
            </div>
            {/* close button */}
          </div>
        </div>
      )}

      {/* modal */}

      <div
        className={`px-[6rem] py-[2.4rem] bg-[#F0F3F7] min-h-screen ${
          blurCheckout ? "blur-lg" : ""
        }`}
      >
        <h6 className="mb-5 font-bold text-2xl">Checkout</h6>
        <div className="flex gap-9">
          {/* Left Section (70%) */}
          <div className="flex-[70%] font-semibold">
            {/* Shipping Address */}
            <div className="rounded-md bg-white p-6 mb-4 shadow-sm">
              <h6 className="text-gray-600 font-bold">ALAMAT PENGIRIMAN</h6>
              <div className="flex items-center gap-2 text-gray-700 mt-2">
                <p className="font-semibold">{addressFetchDetail?.label}</p>
                <div>•</div>
                <p>Killua</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-gray-600 text-sm">
                  {/* wsa, Denpasar Barat, Kota Denpasar, Bali, 6281338494371 */}
                  {addressFetchDetail?.addressData.fullAddress}
                </p>
                <button
                  onClick={onClickAddressChanger}
                  className="text-blue-500 border px-4 py-1 rounded-md"
                >
                  Ganti
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h6 className="font-bold mb-3">Items</h6>
              {checkoutData?.cart_items?.map((data) => (
                <div
                  key={data.id}
                  className="flex items-center gap-4 border-b pb-3 mb-3"
                >
                  <img
                    src=""
                    alt="Product"
                    className="w-16 h-16 bg-gray-200 rounded-md"
                  />
                  <div className="flex justify-between w-full">
                    <p className="text-gray-700">
                      {data.name} - {data.quantity} pcs
                    </p>
                    <p className="font-bold">Rp{data.subtotal}</p>
                  </div>
                </div>
              ))}
            </div>
            <button id="pay-button" onClick={payButton}>
              Pay!
            </button>

            <div id="snap-container"></div>
          </div>

          {/* Right Section (30%) */}
          <div className="flex-[30%] bg-white rounded-lg shadow-sm">
            {/* overflow y */}
            <div className="overflow-y-scroll max-h-[400px] p-6">
              <div className="flex justify-between items-center">
                <h6 className="font-bold text-md">Metode Pembayaran</h6>
                <button className="text-blue-500 text-md font-semibold">
                  Lihat Semua
                </button>
              </div>
              <div className="mt-3 border-b pb-3">
                <div className="flex gap-3 justify-between">
                  <img src="" alt="" />
                  <div>
                    <p className="font-semibold">BCA Virtual Account</p>
                    <p className="text-gray-600 text-sm">
                      Mudah & terverifikasi otomatis
                    </p>
                  </div>
                  <Radio
                    checked={radioIsChecked("bca")}
                    onChange={handleRadioBankChange}
                    value="bca"
                    name="radio-buttons"
                  />
                </div>
              </div>
              <div className="mt-3 border-b pb-3">
                <div className="flex gap-3 justify-between">
                  <img src="" alt="" />
                  <div>
                    <p className="font-semibold">QRIS</p>
                    <p className="text-gray-600 text-sm">
                      Bayar dengan Sekali Scan
                    </p>
                  </div>
                  <Radio
                    checked={radioIsChecked("qris")}
                    onChange={handleRadioBankChange}
                    value="qris"
                    name="radio-buttons"
                  />
                </div>
              </div>
              <div className="mt-3 border-b pb-3">
                <div className="flex gap-3 justify-between">
                  <img src="" alt="" />
                  <div>
                    <p className="font-semibold">BRI Virtual Account</p>
                    <p className="text-gray-600 text-sm">
                      Mudah & terverifikasi otomatis
                    </p>
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
                    <p className="text-gray-600 text-sm">
                      Mudah & terverifikasi otomatis
                    </p>
                  </div>
                  <Radio
                    checked={radioIsChecked("mandiri")}
                    onChange={handleRadioBankChange}
                    value="mandiri"
                    name="radio-buttons"
                  />
                </div>
              </div>
              <div className="mt-4">
                <h6 className="font-bold text-md mb-2">
                  Cek Ringkasan Transaksi
                </h6>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-gray-700">
                    <p>
                      Total Harga ({checkoutData?.cart_items?.length} Barang)
                    </p>
                    Rp{""}
                    {checkoutData?.total_price
                      ? new Intl.NumberFormat("id-ID", {
                          minimumFractionDigits: 2,
                        }).format(checkoutData.total_price)
                      : "0.00"}
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <p>Total Pajak PPN (12%)</p>
                    <p>
                      Rp
                      {checkoutData?.total_price
                        ? new Intl.NumberFormat("id-ID", {
                            minimumFractionDigits: 2,
                          }).format((checkoutData.total_price * 12) / 100)
                        : "0.00"}
                    </p>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <p>Total Ongkos Kirim</p>
                    <p>
                      Rp
                      {shippingCost}
                    </p>
                  </div>
                </div>

                {/* overflow y */}
              </div>
            </div>

            <div className="p-6">
              <div className="border-1 mt-2"></div>
              <div className="flex justify-between font-bold mt-2 text-lg mt-8">
                <p>Total Tagihan</p>
                <p>
                  Rp
                  {checkoutData?.grand_total
                    ? new Intl.NumberFormat("id-ID", {
                        minimumFractionDigits: 2,
                      }).format(checkoutData.grand_total)
                    : "0.00"}
                </p>
              </div>
              <button className="w-full mt-4 bg-green-500 text-white font-bold py-2 rounded-md flex items-center justify-center gap-2">
                <span>✔</span> Bayar Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
