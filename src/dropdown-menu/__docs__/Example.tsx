import { FC } from "react";
import DropdownMenu, { DropdownMenuProps } from "../DropdownMenu";

const Example: FC<DropdownMenuProps> = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <DropdownMenu>{children}</DropdownMenu>
    </div>
  );
};

export default Example;
