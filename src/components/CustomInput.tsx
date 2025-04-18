import { ChangeEvent } from "react";
import { CustomInputType } from "./types";

interface PropsCustomInput {
  value: string;
  handleValueChange: (e: ChangeEvent<HTMLInputElement>) => void;
  elementName: string;
  visibleName: string;
  type?: string;
}

const CustomInput = ({
  value,
  handleValueChange,
  elementName,
  visibleName,
  type
}: PropsCustomInput) => {
  return (
    <div className="relative my-[2rem]">
      <input
        type={!type ? CustomInputType.TEXT : type}
        id={elementName}
        value={value}
        name={elementName}
        onChange={handleValueChange}
        className="peer block w-full rounded-md border border-gray-300 bg-transparent px-3 pt-7 pb-2 text-gray-900 focus:pt-7 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
        placeholder=" "
      />
      <label
        htmlFor={elementName}
        className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-green-600"
      >
        {visibleName}
      </label>
    </div>
  );
};

export default CustomInput;
