import type { FC, ReactNode } from "react";

type Props = {
  Icon: FC;
  isActive?: boolean;
  color?: string;
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

export default function IconBtn({
  disabled = false,
  Icon,
  color,
  children,
  onClick,
}: Props) {
  return (
    <button
      disabled={disabled}
      className={`flex items-center p-1 text-${color || ""} my-auto`}
      onClick={onClick}
    >
      <span className={`${children !== null ? "mr-1" : ""}`}>
        <Icon />
      </span>
      {children}
    </button>
  );
}
