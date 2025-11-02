import React from "react";
import { render, screen } from "@testing-library/react";
import TasksPage from "./index";

test("renders learn react link", () => {
  render(<TasksPage />);
  const searchElement = screen.getByPlaceholderText(/search/i);
  const buttonElement = screen.getByText(/add new task/i);
  expect(searchElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});
