import { render, screen, fireEvent } from "@testing-library/react";
import Note from "./index";
import { INote } from "../../types/Note";

jest.mock("../../assets/imgs/pencil.svg", () => ({
  ReactComponent: () => <svg data-testid="pencil-icon" />,
}));
jest.mock("../../assets/imgs/colorBucket.svg", () => ({
  ReactComponent: () => <svg data-testid="colorbucket-icon" />,
}));
jest.mock("../../assets/imgs/remove.svg", () => ({
  ReactComponent: () => <svg data-testid="remove-icon" />,
}));
jest.mock("../../assets/imgs/favorite.svg", () => ({
  ReactComponent: () => <svg data-testid="favorite-icon" />,
}));
jest.mock("../../assets/imgs/activeFavorite.svg", () => ({
  ReactComponent: () => <svg data-testid="activefavorite-icon" />,
}));
jest.mock("../Divider", () => () => <hr data-testid="divider" />);

describe("<Note />", () => {
  const mockNote: INote = {
    id: "1",
    title: "My Note",
    body: "<p>Note content</p>",
    color: "#ffffff",
    isFavorite: false,
  };

  const onEdit = jest.fn();
  const onToggleFavorite = jest.fn();
  const onChangeColor = jest.fn();
  const onRemove = jest.fn();

  const defaultProps = {
    note: mockNote,
    onEdit,
    onToggleFavorite,
    onChangeColor,
    onRemove,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders note title and body", () => {
    render(<Note {...defaultProps} />);

    expect(screen.getByText("My Note")).toBeInTheDocument();
    expect(screen.getByText("Note content")).toBeInTheDocument();

    expect(screen.getByTestId("favorite-icon")).toBeInTheDocument();
  });

  test("renders favorite active icon when isFavorite=true", () => {
    render(<Note {...defaultProps} note={{ ...mockNote, isFavorite: true }} />);

    expect(screen.getByTestId("activefavorite-icon")).toBeInTheDocument();
  });

  test("calls onToggleFavorite when favorite button is clicked", () => {
    render(<Note {...defaultProps} />);

    const favButton = screen.getByRole("button", { name: /favoritar/i });
    fireEvent.click(favButton);
    expect(onToggleFavorite).toHaveBeenCalledTimes(1);
  });

  test("calls onEdit when edit button is clicked", () => {
    render(<Note {...defaultProps} />);

    const editButton = screen.getByRole("button", { name: /editar nota/i });
    fireEvent.click(editButton);
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  test("calls onRemove when remove button is clicked", () => {
    render(<Note {...defaultProps} />);

    const removeButton = screen.getByRole("button", { name: /remover nota/i });
    fireEvent.click(removeButton);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  test("opens color picker and calls onChangeColor", () => {
    render(<Note {...defaultProps} />);

    const colorButton = screen.getByRole("button", { name: /selecionar cor/i });
    fireEvent.click(colorButton!);

    const colorOptions = screen
      .getAllByRole("button")
      .filter((btn) => btn.className.includes("colorCircle"));

    expect(colorOptions.length).toBeGreaterThan(0);

    fireEvent.click(colorOptions[0]);
    expect(onChangeColor).toHaveBeenCalledTimes(1);
  });
});
