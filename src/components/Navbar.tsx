import { useNavigate } from 'react-router-dom';
import logo from "../assets/candra/logo.svg";

export const Navbar = () => {
  const navigate = useNavigate();

  const navigatePage = (param: string) => {
    navigate(`../${param}`);
  };

  return (
    <div className="flex justify-between p-5 text-[#FFFFFF] bg-[#2D3E70] items-center">
      <div className="flex gap-4 items-center">
        <img src={logo} alt="Maison du Café Logo" />
        <h3>Maison du Café</h3>
      </div>
      <ul className="flex gap-9">
        <li onClick={() => navigatePage("home")} className="cursor-pointer">Home</li>
        <li onClick={() => navigatePage("menu")} className="cursor-pointer">Menus</li>
        <li onClick={() => navigatePage("about")} className="cursor-pointer">About</li>
      </ul>
    </div>
  );
};
