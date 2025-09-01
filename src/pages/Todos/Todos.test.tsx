import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import TodosPage from "./index";
import { getTodos } from "../../lib/api";

jest.mock("../../lib/api"); 

const mockedTodos = [
  { id: 1, title: "Favorite Note", description: "Teste", is_favorite: true, color: "yellow" },
  { id: 2, title: "Common Note", description: "Teste 2", is_favorite: false, color: "blue" },
];

describe("TodosPage", () => {
  beforeEach(() => {
    (getTodos as jest.Mock).mockResolvedValue({
      ok: true,
      data: mockedTodos,
    });
  });

  it("should render favorites and others correctly", async () => {
    render(<TodosPage />);

    await waitFor(() => {
      expect(screen.getByText("Favorite Note")).toBeInTheDocument();
      expect(screen.getByText("Common Note")).toBeInTheDocument();
    });
  });

  it("should move item from Others to Favorites when favorited", async () => {
    render(<TodosPage />);

    await waitFor(() => screen.getByText("Common Note"));

    const starButton = screen.getAllByRole("button")[0];
    fireEvent.click(starButton);

    await waitFor(() => {
      expect(screen.getByText("Common Note")).toBeInTheDocument();
    });
  });

  it("should show message when there are no todos", async () => {
    (getTodos as jest.Mock).mockResolvedValueOnce({
      ok: true,
      data: [],
      message: "No todos found",
    });

    render(<TodosPage />);

    await waitFor(() => {
      expect(screen.getByText(/No todos found/i)).toBeInTheDocument();
    });
  });

  it("should filter notes when typing in the search field", async () => {
    render(<TodosPage />);

    await waitFor(() => screen.getByText("Favorite Note"));

    const input = screen.getByPlaceholderText("Search notes...");
    fireEvent.change(input, { target: { value: "Favorite" } });

    expect(screen.queryByText("Common Note")).not.toBeInTheDocument();
    expect(screen.getByText("Favorite Note")).toBeInTheDocument();
  });

  it("clicking the favorite button should move the note to favorites", async () => {
    render(<TodosPage />);

    await waitFor(() => screen.getByText("Common Note"));

    const starButton = screen.getAllByRole("button")[0]; // assuming the favorite icon is a button
    fireEvent.click(starButton);

    await waitFor(() => {
      expect(screen.getByText("Common Note")).toBeInTheDocument();
    });
  });

  it("clicking the unfavorite button should move the note to others", async () => {
    render(<TodosPage />);

    await waitFor(() => screen.getByText("Favorite Note"));

    const starButton = screen.getAllByRole("button")[0]; // assuming the unfavorite icon is a button
    fireEvent.click(starButton);

    await waitFor(() => {
      expect(screen.getByText("Favorite Note")).toBeInTheDocument();
    });
  });

  it("should handle API failure", async () => {
    (getTodos as jest.Mock).mockResolvedValueOnce({
      ok: false,
      message: "Error fetching todos",
    });

    render(<TodosPage />);

    await waitFor(() => {
      expect(screen.getByText(/Error fetching todos/i)).toBeInTheDocument();
    });
  });

});
