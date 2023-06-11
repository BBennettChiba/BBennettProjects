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
      className={`p-1 flex items-center ${color || ""} my-auto`}
    >
      <span className={`${children !== null ? "mr-1" : ""}`}>
        <Icon />
      </span>
      {children}
    </button>
  );
}
