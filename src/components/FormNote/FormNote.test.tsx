import { render, screen, fireEvent } from "@testing-library/react";
import FormNote from "./index";
import { INote } from "../../types/Note";

jest.mock("../../assets/imgs/favorite.svg", () => ({
  ReactComponent: () => <svg data-testid="favorite-icon" />,
}));
jest.mock("../../assets/imgs/activeFavorite.svg", () => ({
  ReactComponent: () => <svg data-testid="activefavorite-icon" />,
}));

jest.mock("react-quill", () => (props: any) => (
  <textarea
    data-testid="quill-editor"
    value={props.value}
    onChange={(e) => props.onChange(e.target.value)}
  />
));

describe("<FormNote />", () => {
  const mockNote: INote = {
    id: "1",
    title: "My Note",
    body: "Note content",
    color: "#ffffff",
    isFavorite: false,
  };

  const setNote = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders title input and editor", () => {
    render(<FormNote note={mockNote} setNote={setNote} />);

    expect(screen.getByPlaceholderText(/título/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue("My Note")).toBeInTheDocument();

    expect(screen.getByTestId("quill-editor")).toHaveValue("Note content");

    expect(screen.getByTestId("favorite-icon")).toBeInTheDocument();
  });

  test("calls setNote when changing title", () => {
    render(<FormNote note={mockNote} setNote={setNote} />);
    const input = screen.getByPlaceholderText(/título/i);

    fireEvent.change(input, { target: { value: "Updated Title" } });

    expect(setNote).toHaveBeenCalledWith({
      ...mockNote,
      title: "Updated Title",
    });
  });

  test("calls setNote when toggling favorite", () => {
    render(<FormNote note={mockNote} setNote={setNote} />);
    const favButton = screen.getByRole("button", { name: /favoritar/i });

    fireEvent.click(favButton);

    expect(setNote).toHaveBeenCalledTimes(1);
    expect(setNote).toHaveBeenCalledWith(expect.any(Function));

    const updater = setNote.mock.calls[0][0];
    const updated = updater(mockNote);
    expect(updated.isFavorite).toBe(true);
  });

  test("calls setNote when selecting a color", () => {
    render(<FormNote note={mockNote} setNote={setNote} />);
    const colorButtons = screen.getAllByRole("button");

    fireEvent.click(colorButtons[0]);

    expect(setNote).toHaveBeenCalledWith({
      ...mockNote,
      color: expect.any(String),
    });
  });

  test("calls setNote when changing editor content", () => {
    render(<FormNote note={mockNote} setNote={setNote} />);
    const editor = screen.getByTestId("quill-editor");

    fireEvent.change(editor, { target: { value: "Updated body" } });

    expect(setNote).toHaveBeenCalledWith({
      ...mockNote,
      body: "Updated body",
    });
  });
});
