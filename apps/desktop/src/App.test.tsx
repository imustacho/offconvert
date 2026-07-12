import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { App } from "./App";
import "./lib/i18n";

describe("App", () => {
  it("renders the converter shell", () => {
    render(<App />);
    expect(screen.getByText("OffConvert")).toBeInTheDocument();
    expect(screen.getByText("Convert now")).toBeInTheDocument();
  });
});
