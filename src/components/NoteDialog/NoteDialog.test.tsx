import { fireEvent, render, screen } from "@testing-library/react";
import NotesMock from "../../mocks/NotesMock";
import NoteDialog from "./index";

describe("<NoteDialog />", () => {
  const mockNote = NotesMock[0];

  const setNote = jest.fn();
  const onSave = jest.fn();
  const onClose = jest.fn();

  const defaultProps = {
    open: true,
    title: "Dialog Title",
    note: mockNote,
    setNote,
    onSave,
    onClose,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("does not render when open is false", () => {
    render(<NoteDialog {...defaultProps} open={false} />);
    expect(screen.queryByText("Dialog Title")).not.toBeInTheDocument();
  });

  test("renders with title and buttons", () => {
    render(<NoteDialog {...defaultProps} />);

    expect(screen.getByText("Dialog Title")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /salvar/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /fechar/i })).toBeInTheDocument();

    const dialogContainer = screen.getByTestId("note-dialog-container");
    expect(dialogContainer).toHaveStyle(`background: ${mockNote.color}`);
  });

  test("calls onSave when 'Salvar' is clicked", () => {
    render(<NoteDialog {...defaultProps} />);
    const saveButton = screen.getByRole("button", { name: /salvar/i });
    fireEvent.click(saveButton);
    expect(onSave).toHaveBeenCalledTimes(1);
  });

  test("calls onClose when 'Fechar' is clicked", () => {
    render(<NoteDialog {...defaultProps} />);
    const closeButton = screen.getByRole("button", { name: /fechar/i });
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
