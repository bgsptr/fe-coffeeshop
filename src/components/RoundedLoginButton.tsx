import { MouseEvent } from "react";
import googleIcon from "../assets/google-icon.svg"; // Make sure this path matches your actual file

export const RoundedLoginButton = (props: {
  name: string;
  event: (e: MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <button onClick={props.event} className="w-full rounded-full border border-gray-300 hover:bg-white hover:shadow-sm transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4">
      <div className="flex items-center justify-center gap-4 px-6 py-3">
        <img src={googleIcon} alt="Google" className="w-6 h-6" />
        <span className="text-gray-700 text-base font-medium">
          {props.name}
        </span>
      </div>
    </button>
  );
};
