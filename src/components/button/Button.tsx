import { FC, ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  loading?: boolean;
  children?: ReactNode;
  iconAfter?: ReactNode;
  iconBefore?: ReactNode;
  className?: string
}

export const Button: FC<ButtonProps> = ({
  text,
  loading = false,
  children,
  iconAfter,
  iconBefore,
  className,
  ...rest
}) => {
  return (
      <button {...rest} disabled={loading || rest.disabled} className={`flex items-center justify-center gap-x-3  ${className}`}>
        <span className={`${loading && "animate-pulse"}`}>{iconBefore ? iconBefore : <></>}</span>
        <span className={`${loading && "animate-pulse"}`}>{text || children}</span>
        <span className={`${loading && "animate-pulse"}`}>{iconAfter ? iconAfter : <></>}</span>
      </button>
  );
};
