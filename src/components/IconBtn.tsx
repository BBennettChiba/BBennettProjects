import type { FC, ReactNode } from "react";

type Props = {
  Icon: FC;
  isActive?: boolean;
  color?: string;
  children?: ReactNode;
};

export default function IconBtn({ Icon, isActive, color, children }: Props) {
  return (
    <button
      className={`btn icon-btn ${isActive ? "icon-btn-active" : ""} ${color || ""}`}
    >
      <span className={`${children !== null ? "mr-1" : ""}`}>
        <Icon />
      </span>
      {children}
    </button>
  );
}
