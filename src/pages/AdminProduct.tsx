import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useState,
} from "react";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { variables } from "../constants/variable";
import { sendData } from "../utils/sendData";
import {
  FileUploadAttribute,
  ItemCategory,
  Product,
} from "../components/types";
import FileUploadProgress from "../components/FileUploadProgress";

export const AdminProduct = () => {
  const productCategory = [
    {
      id: 1,
      name: ItemCategory.COFFEE,
    },
    {
      id: 2,
      name: ItemCategory.TEA,
    },
    {
      id: 3,
      name: ItemCategory.SNACK,
    },
    {
      id: 4,
      name: ItemCategory.DESSERT,
    },
  ];

  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [fileAttribute, setFileAttribute] =
    useState<FileUploadAttribute | null>(null);

  const [item, setItem] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    category: "",
    image: "",
    stock: 0,
    // status: "",
  });

  const [category, setCategory] = useState(productCategory);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const firstImgUploaded = e.target.files[0];
      setFile(firstImgUploaded);
      setFileAttribute({
        name: firstImgUploaded.name,
        size: firstImgUploaded.size / 1000,
      });
      setProgress(0);
    }
  };

  const handleInputProduct = async (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log("handle input");
    if (e) {
      setItem((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    if (name === "category") {
      console.log("category filter");
      const filteredProduct = productCategory.filter((val) =>
        val.name?.toLowerCase().includes(value.toLowerCase())
      );
      setCategory(filteredProduct);
    }
  };

  const submitNewProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const urlUploadImg = `${variables.BASE_URL}/images/upload/buffer`;
    const res = await axios.post(urlUploadImg, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (data) => {
        if (data.total) {
          setProgress(Math.round((100 * data.loaded) / data.total));
        }
      },
    });

    const { result: imgUrl } = res.data;

    const { image, ...itemNoImg } = item;

    try {
      const urlCreateProduct = `${variables.BASE_URL}/items`;
      const resCreatedJson = await sendData(urlCreateProduct, {
        ...itemNoImg,
        image: imgUrl,
      });

      console.log(resCreatedJson.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectCategory = (name: string) => {
    setItem((prev) => ({
      ...prev,
      category: name.toUpperCase(),
    }));

    setCategory([]);
  };

  const handleKeyboardEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && category.length > 0) {
      console.log("user click enter");
      handleSelectCategory(category[0].name);
    }
  };

  useEffect(() => {
    console.log(progress);
  }, [progress]);

  useEffect(() => {
    console.log(item);
  }, [item]);

  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="flex-[5%] bg-white min-h-screen border-1"></div>
        <div className="flex-[95%] p-[2.4rem]">
          <h6 className="font-bold text-xl mb-6">Upload Produk</h6>
          <div className="flex gap-3 items-center mb-12">
            {/* <h6 className="font-bold">Status</h6>
            <ButtonFilter buttonName="Semua Pesanan" />
            <ButtonFilter buttonName="Pesanan Baru" />
            <ButtonFilter buttonName="Siap Dikirim" />
            <ButtonFilter buttonName="Sedang Dikirim" />
            <ButtonFilter buttonName="Pesanan Selesai" />
            <ButtonFilter buttonName="Pesanan Dibatalkan" /> */}
          </div>
          <form onSubmit={submitNewProduct} className="flex flex-col gap-7">
            {/* input */}
            <div className="w-full flex gap-8">
              <div className="flex-[40%]">
                <h6>Foto Produk</h6>
                <p>Cantumkan minimal</p>
              </div>
              <div className="relative flex-[60%]">
                {!fileAttribute ? (
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          PNG, JPG or JPEG (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                ) : (
                  <FileUploadProgress
                    fileAttribute={fileAttribute}
                    progress={progress}
                    setFileAttribute={setFileAttribute}
                  />
                )}
              </div>
            </div>

            {/* input */}

            {/* input */}
            <div className="w-full flex gap-8">
              <div className="flex-[40%]">
                <h6>Nama Produk</h6>
                <p>Cantumkan minimal</p>
              </div>
              <div className="relative flex-[60%]">
                <input
                  onChange={handleInputProduct}
                  type="text"
                  id="name"
                  // value={addressFetchDetail?.addressData.province}
                  name="name"
                  // onChange={handleAuto}
                  className="peer block w-full rounded-md border border-gray-300 bg-transparent px-3 pt-7 pb-2 text-gray-900 focus:pt-7 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder=" "
                />
                <label
                  htmlFor="name"
                  className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-green-600"
                >
                  Nama Produk
                </label>
                <div className="text-sm flex justify-between text-nn600">
                  <p>Tips: Jenis Produk + Merek Produk + Keterangan Tambahan</p>
                  <p>0/70</p>
                </div>
              </div>
            </div>

            {/* input */}

            {/* input */}
            <div className="w-full flex gap-8">
              <div className="flex-[40%]">
                <h6>Pilih Kategori</h6>
                <p>Cantumkan minimal</p>
              </div>
              <div className="relative flex-[60%]">
                <input
                  type="text"
                  onKeyDown={handleKeyboardEnter}
                  id="category"
                  name="category"
                  value={item.category}
                  onChange={handleInputProduct}
                  className="peer block w-full rounded-md border border-gray-300 bg-transparent px-3 pt-7 pb-2 text-gray-900 focus:pt-7 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder=" "
                />
                <label
                  htmlFor="category"
                  className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-green-600"
                >
                  Pilih Kategori
                </label>
                {item.category?.length > 0 ? (
                  <ul
                    className={
                      category.length > 0
                        ? "absolute w-full border border-gray-300 rounded-md bg-white list-none p-0 m-0 z-10 max-h-[150px] overflow-y-auto"
                        : ""
                    }
                  >
                    {category.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => handleSelectCategory(item.name)}
                        className="p-2 cursor-pointer border-b border-gray-200 hover:bg-gray-100"
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div></div>
                )}
              </div>
            </div>

            {/* input */}

            {/* textarea */}
            <div className="w-full flex gap-8">
              <div className="flex-[40%]">
                <h6>Deskripsi Produk</h6>
                <p>Cantumkan minimal</p>
              </div>
              <div className="relative flex-[60%]">
                <textarea
                  onChange={handleInputProduct}
                  id="description"
                  name="description"
                  // value={addressFetchDetail?.addressData.province}
                  // onChange={handleAuto}
                  className="peer block w-full rounded-md border border-gray-300 bg-transparent px-3 pt-7 pb-2 text-gray-900 focus:pt-7 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 resize-none"
                  placeholder=" "
                  rows={3} // Adjust the number of rows as needed
                ></textarea>
                <label
                  htmlFor="description"
                  className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-green-600"
                >
                  Deskripsi Produk
                </label>
                <div className="text-sm flex justify-between text-nn600">
                  <p>Tips: Jenis Produk + Merek Produk + Keterangan Tambahan</p>
                  <p>0/70</p>
                </div>
              </div>
            </div>

            {/* textarea */}

            {/* input */}
            <div className="w-full flex gap-8">
              <div className="flex-[40%]">
                <h6>Stok Produk</h6>
                <p>Cantumkan minimal</p>
              </div>
              <div className="relative flex-[60%]">
                <input
                  onChange={handleInputProduct}
                  type="text"
                  id="stock"
                  // value={addressFetchDetail?.addressData.province}
                  name="stock"
                  // onChange={handleAuto}
                  className="peer block w-full rounded-md border border-gray-300 bg-transparent px-3 pt-7 pb-2 text-gray-900 focus:pt-7 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder=" "
                />
                <label
                  htmlFor="stock"
                  className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-green-600"
                >
                  Stok Produk
                </label>
                <div className="text-sm flex justify-between text-nn600">
                  <p>Tips: Jenis Produk + Merek Produk + Keterangan Tambahan</p>
                  <p>0/70</p>
                </div>
              </div>
            </div>

            {/* input */}

            {/* input */}
            <div className="w-full flex gap-8">
              <div className="flex-[40%]">
                <h6>Harga Produk</h6>
                <p>Cantumkan minimal</p>
              </div>
              <div className="relative flex-[60%]">
                <input
                  onChange={handleInputProduct}
                  type="text"
                  id="price"
                  // value={addressFetchDetail?.addressData.province}
                  name="price"
                  // onChange={handleAuto}
                  className="peer block w-full rounded-md border border-gray-300 bg-transparent px-3 pt-7 pb-2 text-gray-900 focus:pt-7 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder=" "
                />
                <label
                  htmlFor="price"
                  className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-green-600"
                >
                  Harga Produk
                </label>
                <div className="text-sm flex justify-between text-nn600">
                  <p>Tips: Jenis Produk + Merek Produk + Keterangan Tambahan</p>
                  <p>0/70</p>
                </div>
              </div>
            </div>
            {/* input */}

            {/* input */}
            <div className="w-full flex gap-8">
              <div className="flex-[40%]">
                {/* <h6>Harga Produk</h6>
                <p>Cantumkan minimal</p> */}
              </div>
              <div className="relative flex-[60%]">
                <button className="border-1">Click</button>
              </div>
            </div>
            {/* input */}
          </form>
        </div>
      </div>
    </div>
  );
};
