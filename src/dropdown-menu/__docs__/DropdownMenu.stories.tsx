import type { Meta, StoryObj } from "@storybook/react";
import Example from "./Example";
import MenuItem from "@mui/material/MenuItem";

const meta: Meta<typeof Example> = {
  title: "DropdownMenu",
  component: Example,
};

export default meta;
type Story = StoryObj<typeof Example>;

export const Primary: Story = {
  args: {
    children: (
      <>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
      </>
    ),
  },
};
export const Secondary: Story = {
  args: {
    children: (
      <>
        <MenuItem
          onClick={() => {
            console.log("Clicked item 1");
          }}
        >
          Item 1
        </MenuItem>
        <MenuItem
          onClick={() => {
            console.log("Clicked item 2");
          }}
        >
          Item 2
        </MenuItem>
      </>
    ),
  },
};
