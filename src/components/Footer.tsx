import logo from "../assets/candra/logo.svg";
import tiktokLogo from "../assets/candra/tiktok-logo.svg";
import facebookLogo from "../assets/candra/facebook-logo.svg";
import instagramLogo from "../assets/candra/instagram-logo.svg";
import youtubeLogo from "../assets/candra/youtube-logo.svg";

export const Footer = () => {
  return (
    <footer className="min-h-screen bg-[#B5B5B5] font-poppins flex flex-col gap-9 justify-center items-center p-10">
      <div className="flex text-white content-center items-center gap-4">
        <img src={logo} alt="" className="w-[4rem] h-[4rem]" />
        <h6 className="text-lg">Maison du Café</h6>
      </div>
      <div className="flex gap-9 text-[#757575] p-9">
        <p>Contact</p>
        <p>About</p>
      </div>
      <div className="flex text-center gap-[2.5rem] text-md text-[#757575]">
        <div>
          <p>Open Daily</p>
          <p>Weekdays (Monday - Friday) 09:00 AM - 10 PM</p>
          <p>Weekend (Saturday - Sunday) 08:00 AM - 11 PM</p>
        </div>
        <div>
          <p>Umasari, Jalan Pulau Moyo Gang Telkom II No. 19 .</p>
          <p>Pedungan, Denpasar Selatan DENPASAR SELATAN,</p>
          <p>KOTA DENPASAR, BALI, ID 80222</p>
        </div>
        <div>
          <p>WA +62 819-0241-4670</p>
        </div>
      </div>

      <div className="flex gap-9 p-6">
        <img src={instagramLogo} alt="" />
        <img src={facebookLogo} alt="" />
        <img src={tiktokLogo} alt="" />
        <img src={youtubeLogo} alt="" />
      </div>

      <div className="flex gap-8 text-[#757575] text-sm">
        <p>Maison du Café 2022 - 2023. All rights Reserved.</p>
        <p>Terms | Privacy</p>
      </div>
    </footer>
  );
};
