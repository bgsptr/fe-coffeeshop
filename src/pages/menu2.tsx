import tiktokLogo from "../assets/candra/tiktok-logo.svg";
import rectangle37 from "../assets/candra/rectangle-37.png";

export const Menu = (): JSX.Element => {
  return (
    <div className="bg-white flex justify-center w-full">
      <div className="bg-white w-full max-w-screen-xl relative px-4 sm:px-6 lg:px-8">
        {/* Navbar */}
        <div className="w-full bg-[#2d3e70] opacity-90 text-white py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 border-2 border-white rounded-full"></div>
            <span className="text-lg font-medium">Maison du Café</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="text-lg font-medium">Home</a>
            <a href="#" className="text-lg font-medium">Menus</a>
            <a href="#" className="text-lg font-medium">About</a>
          </div>
        </div>

        {/* Menu Section */}
        <div className="mt-24 py-10">
          <h2 className="text-center text-2xl font-semibold">All Menu</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {Array(12).fill(0).map((_, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <img
                  className="w-full h-40 object-cover rounded-md"
                  alt="Menu Item"
                  src={rectangle37}
                />
                <h3 className="text-lg font-medium mt-2">Cajun Potato Wedges</h3>
                <p className="text-gray-500 text-sm mt-1">
                  Maison du Café is more than just a café—it’s a destination where every visit leaves you with lasting memories.
                </p>
                <div className="text-lg font-medium text-black mt-2">Rp. 110.000</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 py-10 bg-gray-100 text-gray-700 text-center">
          <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold">Contact</h3>
              <p>WA +62 819-0241-4670</p>
            </div>
            <div>
              <h3 className="font-semibold">Address</h3>
              <p>Umasari, Jalan Pulau Moyo, Denpasar, Bali, ID 80222</p>
            </div>
            <div>
              <h3 className="font-semibold">Opening Hours</h3>
              <p>Mon-Fri: 9 AM - 10 PM</p>
              <p>Sat-Sun: 8 AM - 11 PM</p>
            </div>
          </div>
          <div className="flex justify-center space-x-6 mt-6">
            <img className="w-8" src={tiktokLogo} alt="Tiktok" />
          </div>
          <p className="mt-6 text-sm">Maison du Café 2022 - 2023. All rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};