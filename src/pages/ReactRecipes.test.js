import { render, screen } from "@testing-library/react";
import ReactRecipes from "./ReactRecipes";

test("renders learn react link", () => {
  render(<ReactRecipes />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
