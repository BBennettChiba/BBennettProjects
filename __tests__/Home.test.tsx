import {
  render,
  // screen, within
} from "@testing-library/react";
import {
  // expect,
  test,
} from "vitest";
import Home from "../src/pages/index";

test("home", () => {
  render(<Home />);
});
