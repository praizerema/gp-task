import { FC, ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  loading?: boolean;
  children?: ReactNode;
  className?: string
}

export const Button: FC<ButtonProps> = ({
  text,
  loading = false,
  children,
  className,
  ...rest
}) => {
  return (
      <button {...rest} disabled={loading || rest.disabled} className={`flex items-center justify-center gap-x-3 hover:opacity-75 transition-event border ${className}`}>
        <span className={`${loading && "animate-pulse"}`}>{text || children}</span>
      </button>
  );
};
