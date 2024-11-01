import { ReactNode, forwardRef } from "react";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  label?: string;
  prefix?: ReactNode | string;
  errorMessage?: string;
  labelClass?: string;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      label,
      prefix,
      errorMessage,
      type = "text",
      labelClass = "bg-[#ffffff]",
      ...rest
    },
    ref
  ) => {
    return (
      <div className="w-full relative">
        <label
          htmlFor={name}
          className={
            "absolute -top-3 left-5 pbody-12 text-eaa-gray-100 px-2 rounded-[2rem] py-1 " +
            labelClass
          }
        >
          {label}
        </label>
        <div
          className={`flex flex-row items-center border border-[#C0C0C080] rounded-2xl h-[4rem] px-3 gap-x-3 ${
            errorMessage?.length ? "border-1 border-red-600" : ""
          }`}
        >
          {prefix ? prefix : <></>}

          <input
            {...rest}
            name={name}
            ref={ref}
            type={type}
            className={`border-none focus:outline-none py-4 w-full placeholder:text-eaa-gray-300 text-eaa-gray-500 h-full bg-transparent focus:bg-transparent`}
          />
        </div>
        {errorMessage?.length ? (
          <p className="text-red-600 pbody-12 mt-2">{errorMessage}</p>
        ) : (
          <></>
        )}
      </div>
    );
  }
);
